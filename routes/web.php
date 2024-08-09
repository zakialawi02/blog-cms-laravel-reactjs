<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TagController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ArticleViewController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::prefix('dashboard')->as('admin.')->group(function () {
    Route::middleware(['auth', 'verified', 'role:admin,writer'])->group(function () {
        Route::post('/posts/generateSlug', [PostController::class, 'generateSlug'])->name('posts.generateSlug');
        Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
        Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
        Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
        Route::get('/posts/{post:slug}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::put('/posts/{post:slug}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('/posts/{post:slug}', [PostController::class, 'destroy'])->name('posts.destroy');

        Route::post('/categories/generateSlug', [CategoryController::class, 'generateSlug'])->name('categories.generateSlug');
        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::get('/categories/{category:slug}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
        Route::put('/categories/{category:slug}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category:slug}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        Route::resource('tags', TagController::class)->parameters(['tags' => 'tag:slug']);
        Route::post('/tags/generateSlug', [TagController::class, 'generateSlug'])->name('tags.generateSlug');

        Route::get('/posts/stats', [ArticleViewController::class, 'index'])->name('posts.stats');
        Route::get('/posts/stats/location', [ArticleViewController::class, 'index2'])->name('posts.statsByLocation');
        Route::get('/posts/statspopular', [ArticleViewController::class, 'getStatsPopular'])->name('posts.statspopular');
        Route::get('/posts/statsrecent', [ArticleViewController::class, 'getStatsRecent'])->name('posts.statsrecent');
        Route::get('/posts/stats/6months', [ArticleViewController::class, 'getViewsLast6Months'])->name('posts.statslast6months');
        Route::get('/stats/posts/{slug}', [ArticleViewController::class, 'statsPerArticle'])->name('posts.statsdetail');
        Route::get('/stats/locations', [ArticleViewController::class, 'statsByLocation'])->name('posts.statslocation');
    });

    Route::middleware(['auth', 'verified', 'role:admin,writer,user'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/i/getInfo', [DashboardController::class, 'getInfo'])->name('dashboard.getInfo');

        Route::get('/empty', function () {
            return Inertia::render('EmptyPage');
        })->name('empty');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});


require __DIR__ . '/auth.php';
