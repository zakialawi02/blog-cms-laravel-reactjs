<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = [
            'title' => 'All Posts',
        ];

        $query = Article::select('id', 'title', 'slug', 'excerpt', 'cover', 'category_id', 'published_at', 'status', 'created_at', 'updated_at', 'user_id')
            ->with(['user', 'category', 'tags'])
            ->withCount('articleViews as total_views');

        if (auth()->user()->role !== 'admin') {
            $query->where('user_id', auth()->id());
        }

        if (request('search') && request()->get("search") != "") {
            $query = $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . request()->get("search") . '%')
                    ->orWhere('content', 'like', '%' . request()->get("search") . '%')
                    ->orWhere('excerpt', 'like', '%' . request()->get("search") . '%')
                    ->orWhereHas('tags', function ($q) use ($request) {
                        $q->where('tag_name', 'like', '%' . request()->get("search") . '%');
                    });
            });
        }

        if (request("status") && request()->get("status") != "" && request()->get("status") != "all") {
            $query = $query->where('status', request()->get("status"));
        }

        if (request("category") && request()->get("category") != "" && request()->get("category") == "uncategorized") {
            $query = $query->whereNull('category_id');
        } elseif (request("category") && request()->get("category") != "" && request()->get("category") != "all") {
            $query = $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', request()->get("category"));
            });
        }

        if (request("user") && request()->get("user") != "" && request()->get("user") != "all") {
            $query = $query->whereHas('user', function ($q) use ($request) {
                $q->where('username', request()->get("user"));
            });
        }

        $posts = $query->orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"))->paginate(10)->withQueryString()->onEachSide(1);

        $users = User::orderBy('username', 'asc')->get();
        $categories = Category::orderBy('category', 'asc')->get();

        return Inertia::render('Dashboard/Post/Index', [
            "meta" => $data,
            "posts" => $posts,
            "categories" => $categories,
            "users" => $users,
            "queryParams" => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            'title' => 'Create Post',
        ];
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('Dashboard/Post/FormData', [
            "meta" => $data,
            "categories" => $categories,
            "tags" => $tags
        ]);
    }

    /**
     * Generate a slug from the given data in the request.
     *
     * @param Request $request The HTTP request object containing the data.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the generated slug.
     */
    public function generateSlug(Request $request)
    {
        $slug = Str::slug($request->data);

        return response()->json(['slug' => $slug]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $post)
    {
        if (auth()->user()->role !== 'admin' && auth()->id() !== $post->user_id) {
            abort(403);
        }

        $data = [
            'title' => 'Edit Post',
        ];
        $categories = Category::all();
        $articleTags = $post->tags->pluck('tag_name')->toArray();
        $tags = Tag::all();

        return Inertia::render('Dashboard/Post/FormData', [
            "meta" => $data,
            "postData" => $post,
            "categories" => $categories,
            "tags" => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
