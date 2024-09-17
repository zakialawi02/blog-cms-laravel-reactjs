<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use ipinfo\ipinfo\IPinfo;
use App\Models\ArticleView;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

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
                ->where(['status' => 'published', ['published_at', '<', now()]])
                ->orderBy('total_views', 'desc')->take(request("max"))->with('user', 'category')->get();
        } else {
            $popularPosts = Article::has('articleViews')->withCount(['articleViews as total_views'])
                ->where(['status' => 'published', ['published_at', '<', now()]])
                ->orderBy('total_views', 'desc')->with('user', 'category')->get();
        }
        $this->articlesMappingArray($popularPosts);

        return response()->json($popularPosts);
    }

    public function randomPosts()
    {
        if (request("max")) {
            $randomPosts = Article::inRandomOrder()->with('user', 'category')->take(request("max"))->get();
        } else {
            $randomPosts = Article::inRandomOrder()->with('user', 'category')->get();
        }
        $this->articlesMappingArray($randomPosts);

        return response()->json($randomPosts);
    }


    public function relatedPosts()
    {
       // Ambil artikel berdasarkan slug dari request
        $article = Article::with(['category', 'tags'])->where('slug', request('slug'))->first();

        // Jika artikel tidak ditemukan, return error
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        // Ambil related posts berdasarkan kategori dan tags
        $relatedPosts = Article::with(['category', 'tags']) // Load category and tags for related posts
        ->where('id', '!=', $article->id) // Tidak termasuk artikel yang sedang diakses
        ->where(function ($query) use ($article) {
            // Filter by category
            $query->where('category_id', $article->category_id);

            // Filter by tags
            $query->orWhereHas('tags', function ($q) use ($article) {
                $q->whereIn('tag_id', $article->tags->pluck('id')); // Match any tag in the article
            });
        })
        ->limit(3) // Limit to 3 related posts
        ->get();

        return response()->json($relatedPosts);
    }


    /**
     * Get the IP visitor details using IPinfo API.
     *
     * @param datatype $ip The IP address of the visitor
     * @return mixed The details of the visitor based on the IP address
     */
    protected function getIpVisitor($ip)
    {
        $access_token = env('IPINFO_ACCESS_TOKEN');
        $client = new IPinfo($access_token);
        $ip_address = $ip;
        $details = $client->getDetails($ip_address);
        $dataV = $details->all;
        return $dataV;
    }


    /**
     * Store visitor data and save visitor information if not already cached.
     *
     * @param Request $request The request containing the article slug and IP address
     * @throws \Throwable If an error occurs while saving the visitor data
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the success or failure of the operation
     */
    protected function saveVisitor(Request $request)
    {
        $slug = $request->input('slug');
        $article_id = Article::where('slug', $slug)->first()->id;
        $ip = $request->input('ip');
        $cacheKey = 'article-view:' . $article_id . ':' . $ip;
        $cacheDuration = 60 * 1; // Cache for 1 minutes
        if (!Cache::has($cacheKey)) {
            $dataIpVisitor = $this->getIpVisitor($ip);
            try {
                ArticleView::create([
                    'article_id' => $article_id,
                    'ip_address' => $ip,
                    'code' => array_key_exists('country', $dataIpVisitor) ? $dataIpVisitor['country'] : NULL,
                    'location' => array_key_exists('country_name', $dataIpVisitor) ? $dataIpVisitor['country_name'] : NULL,
                    'viewed_at' => Carbon::now(),
                ]);

                Cache::put($cacheKey, true, $cacheDuration);

                return response()->json([
                    'success' => true,
                    'message' => 'Data visitor berhasil disimpan',
                    'your_ip' => $ip
                ], 200);
            } catch (\Throwable $th) {
                return response()->json(['success' => false, 'message' => 'Data visitor gagal disimpan, ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['success' => false, 'message' => 'Data visitor sudah pernah disimpan'], 400);
        }
    }
}
