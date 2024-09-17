<?php

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->as('api.')->group(function () {
    Route::get('/articles/popular', [ArticleController::class, 'popularPosts'])->name('article.popular');
    Route::get('/articles/random-posts', [ArticleController::class, 'randomPosts'])->name('article.random');
    Route::get('/articles/related-posts', [ArticleController::class, 'relatedPosts'])->name('article.related');

    Route::post('/stats/article/hit', [ArticleController::class, 'saveVisitor'])->name('hitVisitor');


    Route::get('/list/categories', [CategoryController::class, 'categoryLists'])->name('categories');
    Route::get('/list/tags', [TagController::class, 'tagLists'])->name('tags');
});
