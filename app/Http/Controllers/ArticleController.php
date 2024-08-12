<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->query('search');
        $articles = $this->fetchArticles($search);

        $this->articlesMappingArray($articles);
        $featured = (!empty($articles) ?  $articles->shuffle()->take(5) : null);

        return Inertia::render('Front/Blog/Index', [
            'articles' => $articles,
            'featured' => $featured
        ]);
    }

    /**
     * Fetches articles based on search criteria like search keywords, categories, and tags.
     *
     * @param mixed|null $search The search keyword to filter articles.
     * @param mixed|null $categories The category to filter articles.
     * @param mixed|null $tag The tag to filter articles.
     * @return \Illuminate\Pagination\LengthAwarePaginator The paginated list of articles based on the search criteria.
     */
    private function fetchArticles($search = null, $categories = null, $tag = null, $user = null)
    {
        $query = Article::with('user', 'category', 'tags')
            ->where(['status' => 'published', ['published_at', '<', now()]])
            ->orderBy('published_at', 'desc');

        if ($categories) {
            $query = Category::where('slug', $categories)->firstOrFail();
            $query = $query->articles()
                ->with('user', 'category')
                ->where(['status' => 'published', ['published_at', '<', now()]])
                ->orderBy('published_at', 'desc');
            if ($categories == 'uncategorized') {
                $query->whereNull('category_id')
                    ->orderBy('published_at', 'desc');
            }
        }

        if ($tag) {
            $query->whereHas('tags', function ($query) use ($tag) {
                $query->where('slug', $tag);
            });
        }

        if ($user) {
            $query->whereHas('user', function ($query) use ($user) {
                $query->where('username', $user);
            });
        }

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('content', 'like', '%' . $search . '%')
                    ->orWhere('excerpt', 'like', '%' . $search . '%')
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%')
                            ->orWhere('username', 'like', '%' . $search . '%');
                    });
            });
        }

        return $query->paginate(9)->withQueryString();
    }


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
        //
    }

    /**
     * Show a specific article based on the year and slug.
     *
     * @param Request $request The HTTP request object.
     * @param int $year The year of the article.
     * @param string $slug The slug of the article.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the article is not found.
     * @return \Illuminate\Contracts\View\View The view for displaying a single post.
     */
    public function show(Request $request, $year, $slug)
    {
        $article = Article::with('user', 'category', 'tags')
            ->where('slug', $slug)
            ->whereYear('published_at', $year)
            ->where('published_at', '<=', Carbon::now())
            ->firstOrFail();
        $article['cover'] = (!empty($article->cover) ? $article->cover = asset("storage/drive/" . $article->user->username . "/img/" . $article->cover) : $article->cover = asset("assets/img/image-placeholder.png"));
        $article['excerpt'] = !empty($article->excerpt) ? $article->excerpt : Str::limit(strip_tags($article->content), 200);

        $ipAddress = $request->header('CF-Connecting-IP') ?? $request->header('X-Forwarded-For');

        // $this->saveVisitor($article->id, $ipAddress);

        return Inertia::render('Front/Blog/SinglePost', [
            'article' => $article,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
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
