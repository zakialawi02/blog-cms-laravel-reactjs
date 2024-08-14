<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Category;
use App\Models\ArticlesTag;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use Illuminate\Support\Facades\Storage;

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
            "tagsList" => $tags,
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
    public function store(ArticleRequest $request)
    {
        $data = $request->validated();

        if ($request->query('status') == "published") {
            $data['status'] = 'published';
            if (empty($request->published_at)) {
                $data['published_at'] = now();
            }
        } elseif ($request->query('status') == "unpublished") {
            $data['status'] = 'draft';
            $data['published_at'] = null;
        }

        if ($request->hasFile('cover')) {
            $user = auth()->user()->username ?? "shared";
            $file = $request->file('cover');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/drive/' . $user . '/img', $filename);
            $path = asset('storage/drive/' . $user . '/img/' . $filename);
            $data['cover'] = $filename;
        }

        $article = Article::create($data);

        if (request()->has('tags')) {
            $tags = [];
            foreach ($data['tags'] as $tagName) {
                $tag = Tag::where('tag_name', $tagName)->first();
                if (!$tag) {
                    echo "Tag not found";
                    $createTag = Tag::create([
                        'tag_name' => ucwords($tagName),
                        'slug' => Str::slug($tagName),
                    ]);
                    $tags[] = $createTag->id;
                } else {
                    $tags[] = $tag->id;
                }
            }
            $data['tags'] = $tags;

            foreach ($data['tags'] as $key => $tagId) {
                ArticlesTag::create([
                    'article_id' => $article->id,
                    'tag_id' => $tagId
                ]);
            }
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully');
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
        $articleTags = $post->tags->map(function ($tag) {
            return [
                'id' => $tag->id,
                'tag' => $tag->tag_name,
            ];
        })->toArray();
        $tags = Tag::all();


        return Inertia::render('Dashboard/Post/FormData', [
            "meta" => $data,
            "postData" => $post,
            "categories" => $categories,
            "tagsList" => $tags,
            "articleTags" => $articleTags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $post)
    {
        if (auth()->user()->role !== 'admin' && auth()->id() !== $post->user_id) {
            abort(403);
        }

        $data = $request->validated();

        if ($request->query('status') == "published") {

            $data['status'] = 'published';
            if (empty($request->published_at)) {
                $data['published_at'] = now();
            }
        } elseif ($request->query('status') == "unpublished") {
            $data['status'] = 'draft';
            $data['published_at'] = null;
        }

        if ($request->hasFile('cover')) {
            $user = $post->user->username ?? "shared";
            if ($post->cover) {
                Storage::delete('public/drive/' . $user . '/img/' . $post->cover);
            }
            $file = $request->file('cover');
            $filename = time() . '_' . Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/drive/' . $user . '/img', $filename);
            $path = asset('storage/drive/' . $user . '/img/' . $filename);
            $data['cover'] = $filename;
        } else {
            $data['cover'] = $post->cover;
        }

        $post->update($data);

        ArticlesTag::where('article_id', $post->id)->delete();
        if (request()->has('tags')) {
            $tags = [];
            foreach ($data['tags'] as $tagName) {
                $tag = Tag::where('tag_name', $tagName)->first();
                if (!$tag) {
                    echo "Tag not found";
                    $createTag = Tag::create([
                        'tag_name' => ucwords($tagName),
                        'slug' => Str::slug($tagName),
                    ]);
                    $tags[] = $createTag->id;
                } else {
                    $tags[] = $tag->id;
                }
            }
            $data['tags'] = $tags;

            foreach ($data['tags'] as $key => $tagId) {
                ArticlesTag::create([
                    'article_id' => $post->id,
                    'tag_id' => $tagId
                ]);
            }
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully');
    }


    public function destroy(Article $post)
    {
        if (auth()->user()->role !== 'admin' && auth()->id() !== $post->user_id) {
            abort(403);
        }

        $user = $post->user->username ?? "shared";
        if ($post->cover) {
            Storage::delete('public/drive/' . $user . '/img/' . $post->cover);
        }
        Article::where('slug', $post->slug)->delete();

        return redirect()->back()->with('success', 'Post deleted successfully');
    }
}
