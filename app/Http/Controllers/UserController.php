<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\RequestContributorMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Models\RequestContributor as ModelsRequestContributor;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search') && request()->get("search") != "") {
            $users = $users->where('name', 'like', '%' . request()->get("search") . '%')
                ->orWhere('email', 'like', '%' . request()->get("search") . '%')
                ->orWhere('role', 'like', '%' . request()->get("search") . '%')
                ->orWhere('created_at', 'like', '%' . request()->get("search") . '%');
        }

        if (request("role") && request()->get("role") != "" && request()->get("role") != "all") {
            $users = $users->where('role', request()->get("role"));
        }

        $users = $users->paginate(25)->withQueryString();

        $data = [
            'title' => 'List User',
        ];

        return Inertia::render('Dashboard/User/Index', [
            'meta' => $data,
            'users' => $users,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'username' => [
                'required',
                'min:4',
                'max:25',
                'alpha_num',
                'regex:/^[\w]+$/', // ensures underscores are allowed
                'unique:users',
            ],
            'role' => 'required|in:admin,writer,user',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);
        $user = User::create($validated);
        $data = User::where('id', $user->id)->first();
        $data['created_at'] = $data->created_at->format('d M Y');

        return response()->json(['user' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    public function getUser(User $user)
    {
        return response()->json(['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'username' => [
                'required',
                'min:4',
                'max:25',
                'alpha_num',
                'regex:/^[\w]+$/',
                'unique:users,username,' . $user?->id,
            ],
            'role' => 'required|in:admin,writer,user',
            'email' => 'required|email|unique:users,email,' . $user?->id,
            'password' => 'nullable|min:6',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = bcrypt($validated['password']);
        }

        $user->update($validated);
        $user = User::where('id', $user->id)->first();

        return response()->json(['user' => $user, 'message' => 'User updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $articles = Article::where('user_id', $user->id)->get();

        $admin = User::where('username', 'admin')->first();
        $adminId = $admin->id;
        foreach ($articles as $article) {
            $article->user_id = $adminId;
            $article->save();
        }

        User::where('id', $user->id)->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Display a listing of the users who requested to join as a contributor.
     *
     * @return \Inertia\Response
     */
    public function requestContributor()
    {
        $data = [
            'title' => 'Requested Join Contributor',
        ];

        $query = ModelsRequestContributor::with('user')
            ->orderBy(request("sort_field", 'request_contributors.created_at'), request("sort_direction", "desc"));

        if (request('search')) {
            $query->where(function ($query) {
                $query->whereHas('user', function ($query) {
                    $query->where('username', 'like', '%' . request()->query('search') . '%')
                        ->orWhere('email', 'like', '%' . request()->query('search') . '%');
                })->orWhere('code', 'like', '%' . request()->query('search') . '%');
            });
        }

        $query = $query->paginate(25)->withQueryString()->onEachSide(1);

        return Inertia::render('Dashboard/Contributor/Index', [
            "meta" => $data,
            "users" => $query,
            'queryParams' => request()->query() ?: null
        ]);
    }



    /**
     * Delete a ModelsRequestContributor.
     *
     * @param ModelsRequestContributor $requestContributor
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroyRequestContributor(ModelsRequestContributor $requestContributor)
    {
        $requestContributor->delete();

        return redirect()->back()->with('success', 'Deleted successfully');
    }

    public function storeRequestContributor()
    {
        $user = Auth::user();
        $code = rand(1000, 9999);

        $requestContributor = ModelsRequestContributor::firstOrNew([
            'user_id' => $user->id,
        ])->fill([
            'code' => $code,
            'valid_code_until' => now()->addMinutes(10080)->format('Y-m-d H:i:s'),
            'is_confirmed' => 0
        ])->save();

        if ($requestContributor) {
            return response()->json(['message' => 'Request sent successfully'], 200);
        }

        return response()->json(['message' => 'Request failed'], 500);
    }


    public function sendRequestContributorCode(Request $request)
    {
        $user = $request->user;
        $email = $user['email'];
        $contentMail = [
            'username' => $user['username'],
            'body' => 'You have been requested as contributor',
            'code' => $request->code,
            'valid' => Carbon::parse($request->valid_code_until)->format('d M Y H:i'),
        ];

        Mail::to($email)->send(new RequestContributorMail($contentMail));

        ModelsRequestContributor::where('id', $request->id)->update(['is_sent' => 1]);
    }

    public function confirmCodeContributor(Request $request)
    {
        $code = $request->code;
        $saved = ModelsRequestContributor::where(['user_id' => Auth::user()->id, 'code' => $code])
            ->where('valid_code_until', '>', now()->format('Y-m-d H:i:s'))
            ->update(['is_confirmed' => 1]);

        if ($saved) {
            User::where('id', Auth::user()->id)->update(['role' => 'writer']);

            return response()->json(['message' => 'Code confirmed successfully. You can now start contributing and can write articles'], 200);
        }

        return response()->json(['message' => 'Code not match, please try again'], 500);
    }
}
