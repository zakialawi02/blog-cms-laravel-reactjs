<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use App\Models\Comment;
use App\Models\ArticleView;
use App\Models\requestContributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if (Auth::user()->role == 'admin') {
            return Inertia::render('Dashboard/Dashboard', []);
        } elseif (Auth::user()->role == 'writer') {
            return Inertia::render('Dashboard/Dashboard', []);
        } else {
            return Inertia::render('Dashboard/Dashboard', []);
        }
    }

    public function getInfo()
    {
        if (Auth::user()->role == 'admin') {
            $allPosts = Article::all();
            $allPostsCount = $allPosts->count();
            $allPostsPublished = Article::where(['status' => 'published', ['published_at', '<', now()]])->count();
            $allComments = Comment::all();
            $allCommentsCount = $allComments->count();
            $totalUsers = User::count();
            $articleIds = $allPosts->where('user_id', auth()->id())->pluck('id');
            $posts = Article::where('user_id', Auth::id());
            $myPosts = $posts->count();
            $myPostsPublished = $posts->where(['status' => 'published', ['published_at', '<', now()]])->count();
            $myComments = $allComments->where('user_id', Auth::id())->count();
            $visitors = ArticleView::all()->count();
            return response()->json(compact('myPosts', 'myPostsPublished', 'myComments', 'visitors', 'allPostsCount', 'allPostsPublished', 'allCommentsCount', 'totalUsers'));
        } elseif (Auth::user()->role == 'writer') {
            $articleIds = Article::where('user_id', auth()->id())->pluck('id');
            $posts = Article::where('user_id', Auth::id());
            $myPosts = $posts->count();
            $myPostsPublished = $posts->where(['status' => 'published', ['published_at', '<', now()]])->count();
            $myComments = Comment::where('user_id', Auth::id())->count();
            $visitors = ArticleView::whereIn('article_id', $articleIds)->count();
            return response()->json(compact('myPosts', 'myPostsPublished', 'myComments', 'visitors'));
        } else {
            $join = requestContributor::where('user_id', Auth::id())->latest('created_at')->first();
            $myComments = Comment::where('user_id', Auth::id())->count();
            return response()->json(compact('join', 'myComments'));
        }
    }
}
