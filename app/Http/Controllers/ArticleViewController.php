<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;
use App\Models\ArticleView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleViewController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Post Statistics'
        ];

        return Inertia::render('Dashboard/Post/StatView', [
            'meta' => $data
        ]);
    }

    public function index2()
    {
        $data = [
            'title' => 'Post Statistics By Country'
        ];

        return Inertia::render('Dashboard/Post/StatByCountry', [
            'meta' => $data
        ]);
    }

    /**
     * Retrieves the recent article view statistics.
     *
     * This function fetches the recent article view statistics,
     * filtered by the user's role and limited to 100 records.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatsRecent()
    {
        $articles = ArticleView::with('article')
            ->orderBy('viewed_at', 'desc');

        if (auth()->user()->role !== 'admin') {
            $articles->whereHas('article', function ($q) {
                $q->where('user_id', auth()->id());
            });
        }
        $articles = $articles->take(100)->get();

        return response()->json($articles);
    }

    /**
     * Retrieves the most popular article view statistics.
     *
     * This function fetches the most popular article view statistics,
     * filtered by the user's role and limited to 25 records.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatsPopular()
    {
        $articles = Article::has('articleViews')->withCount(['articleViews as total_views']);

        if (auth()->user()->role !== 'admin') {
            $articles->where('user_id', auth()->id());
        }

        $articles = $articles->orderBy('total_views', 'desc')->take(25)->get();

        return response()->json($articles);
    }

    /**
     * Retrieves the view statistics for the last 6 months.
     *
     * This function fetches the view statistics for the last 6 months, filtered by the user's role.
     * The statistics are grouped by the 12-hour period and ordered by the period in ascending order.
     * If the user is not an admin, only the views from articles owned by the user are included.
     * The result includes the period, timestamp, and view count for each 12-hour period.
     * If there are no views for a particular period, the view count is set to 0.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException If the user is not authorized to access the view statistics.
     * @return \Illuminate\Http\JsonResponse The view statistics for the last 6 months.
     */
    public function getViewsLast6Months()
    {
        // Tentukan tanggal mulai 6 bulan yang lalu dari hari ini, dimulai dari hari pertama bulan tersebut
        $sixMonthsAgo = now()->subMonths(6)->startOfMonth();

        // Siapkan query dasar untuk mengambil data view
        $query = ArticleView::selectRaw('
        CONCAT(DATE(viewed_at), " ", IF(HOUR(viewed_at) < 12, "00:00", "12:00")) AS period,
        COUNT(*) AS view_count')
            ->where('viewed_at', '>=', $sixMonthsAgo);

        // Cek jika pengguna yang login bukan admin
        if (auth()->user()->role !== 'admin') {
            // Hanya mengambil view dari artikel yang dimiliki oleh pengguna
            $query->whereHas('article', function ($q) {
                $q->where('user_id', auth()->id());
            });
        }

        // Lanjutkan dengan grouping dan ordering
        $views = $query->groupBy('period')->orderBy('period', 'asc')->get();

        // Pastikan semua periode 12 jam terakhir 6 bulan termasuk hari ini terwakili dalam hasil
        $dateRange = new \DatePeriod(
            $sixMonthsAgo,
            new \DateInterval('PT12H'),
            now()
        );

        $viewsByPeriod = $views->mapWithKeys(function ($item) {
            return [$item->period => $item->view_count];
        });

        $result = [];
        foreach ($dateRange as $dateTime) {
            $periodFormatted = $dateTime->format('Y-m-d') . ' ' . ($dateTime->format('H') < 12 ? '00:00' : '12:00');
            $result[] = [
                'period' => $periodFormatted,
                'timestamp' => $dateTime->getTimestamp(), // Sertakan timestamp untuk setiap periode 12 jam
                'view_count' => $viewsByPeriod[$periodFormatted] ?? 0
            ];
        }

        return response()->json($result);
    }

    /**
     * Retrieves the statistics of an article based on the provided slug.
     *
     * @param string $slug The slug of the article to retrieve statistics for.
     * @throws ModelNotFoundException if the article with the provided slug is not found.
     * @return \Illuminate\View\View The view displaying the detailed statistics of the article.
     */
    public function statsPerArticle($slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        if (auth()->user()->role !== 'admin' && auth()->id() !== $article->user_id) {
            abort(403);
        }

        $views = ArticleView::where('article_id', $article->id)
            ->selectRaw('COUNT(*) as views, location, code')
            ->groupBy(['location', 'code'])
            ->get();
        $views = $views->map(function ($item) {
            $item->location = $item->location ? $item->location : 'Unknown';
            $item->code = $item->code ? $item->code : 'Unknown';
            return $item;
        });
        $total_views = $views->sum('views');
        $article['total_views'] = $total_views;

        $data = [
            'title' => 'Post Statistics Detail',
        ];

        return Inertia::render('Dashboard/Post/StatPerArticle', [
            'meta' => $data,
            'article' => $article,
            'views' => $views,
            'total_views' => $total_views
        ]);
    }

    /**
     * Retrieves the statistics of articles by location.
     *
     * @return Some_Return_Value
     */
    public function statsByLocation()
    {
        if (auth()->user()->role !== 'admin') {
            $articleIds = Article::where('user_id', auth()->id())->pluck('id');
            $views = ArticleView::whereIn('article_id', $articleIds)
                ->select('code', 'location', DB::raw('count(*) as total_views'))
                ->groupBy('code', 'location')
                ->orderBy('total_views', 'desc')
                ->get();
        } else {
            $views = ArticleView::select('code', 'location', DB::raw('count(*) as total_views'))
                ->groupBy('code', 'location')
                ->orderBy('total_views', 'desc')
                ->get();
        }
        $views = $views->map(function ($item) {
            $item->location = $item->location ? $item->location : 'Unknown';
            $item->code = $item->code ? $item->code : 'Unknown';
            return $item;
        });

        // Get total views
        $totalViews = $views->sum('total_views');

        return response()->json([
            'views' => $views,
            'total_views' => $totalViews
        ]);
    }
}
