<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
    /**
     * Maps and modifies the provided articles array by updating excerpt, cover image paths, and category ID if necessary.
     *
     * @param datatype $articles The array of articles to be mapped and modified.
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    protected function articlesMappingArray($articles)
    {
        $articles = $articles->map(function ($article) {
            if (empty($article->excerpt)) {
                $article->excerpt = strip_tags($article->content);
            }
            if (!empty($article->cover)) {
                $article->cover = asset("storage/drive/" . $article->user->username . "/img/" . $article->cover);
            }
            if (empty($article->cover)) {
                $article->cover = asset("assets/img/image-placeholder.png");
            }
            if (empty($article->category_id)) {
                $article->category_id = "Uncategorized";
            }
            return $article;
        });
        $articles->map(function ($article) {
            $article->excerpt = Str::limit($article->excerpt, 200);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    public function popularPosts()
    {
        if (request("max")) {
            $popularPosts = Article::has('articleViews')->withCount(['articleViews as total_views'])
                ->orderBy('total_views', 'desc')->take(request("max"))->with('user', 'category')->get();
        } else {
            $popularPosts = Article::has('articleViews')->withCount(['articleViews as total_views'])
                ->orderBy('total_views', 'desc')->with('user', 'category')->get();
        }
        $this->articlesMappingArray($popularPosts);

        return response()->json($popularPosts);
    }
}
