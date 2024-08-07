<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\TagRequest;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'List Tags',
        ];

        $query = Tag::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search')) {
            $query = Tag::where('tag_name', 'like', '%' . request('search') . '%')
                ->orWhere('slug', 'like', '%' . request('search') . '%');
        }

        $query = $query->paginate(10)->withQueryString()->onEachSide(1);

        return Inertia::render('Dashboard/Tag/Index', [
            "meta" => $data,
            "tags" => $query,
            "queryParams" => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            'title' => 'Add New Tag',
        ];

        return Inertia::render('Dashboard/Tag/FormData', [
            "meta" => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TagRequest $request)
    {
        $data = $request->validated();

        Tag::create($data);

        return redirect()->route('admin.tags.index')->with('success', 'Tag created successfully');
    }

    public function generateSlug(Request $request)
    {
        $slug = Str::slug($request->tag_name);

        return response()->json(['slug' => $slug]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tags)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        $data = [
            'title' => 'Edit Tag',
        ];

        return Inertia::render('Dashboard/Tag/FormData', [
            "meta" => $data,
            "tag" => $tag
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TagRequest $request, Tag $tag)
    {
        $data = $request->validated();

        Tag::where('slug', $tag->slug)->update($data);

        return redirect()->route('admin.tags.index')->with('success', 'Tag updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        Tag::where('slug', $tag->slug)->delete();

        return redirect()->back()->with('success', 'Tag deleted successfully');
    }
}
