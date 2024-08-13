<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use App\Models\MentionNotification;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    /**
     * Display my comments listing of the resource.
     *
     * @throws \Exception If there is an issue retrieving the comments
     * @return \Illuminate\View\View Returns the view with the comments
     */
    public function myindex()
    {
        $myComments = Comment::with('article', 'user')
            ->where('user_id', auth()->user()->id)
            ->get();

        $data = [
            'title' => 'My Comments',
        ];

        return view('pages.back.comments.myComments', compact('data', 'myComments'));
    }

    /**
     * Display all listing of the resource.
     */
    public function index()
    {
        $comments = Comment::with('article', 'user')
            ->whereHas('article', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        $data = [
            'title' => 'Comments',
        ];

        return view('pages.back.comments.comments', compact('data', 'comments'));
    }


    /**
     * Store a newly on writed commented article created resource in storage.
     * Ajax call/request
     *
     * @param Article $post The article being commented on
     * @throws \Exception If there is an issue creating the comment
     * @return \Illuminate\Http\JsonResponse Returns a JSON response indicating success
     */
    public function store(Article $post)
    {
        $this->validate(request(), [
            'comment' => 'required',
        ]);

        $article_id = $post->id;
        $author_id = $post->user_id;
        $parent_id = request('parent_id');
        $parent_id = $parent_id === null ? null : explode('comment_0212', $parent_id)[1];
        $user_id = auth()->user()->id;

        $comment = Comment::create([
            'article_id' => $article_id,
            'parent_id' => $parent_id,
            'user_id' => $user_id,
            'content' => request('comment'),
        ]);

        if ($comment) {
            // kirim notifikasi ke pemilik/author penulis artikel yang dituliskan
            if (!$parent_id) {
                MentionNotification::create([
                    'user_id' => $author_id,
                    'type' => 'comment', // "like", "comment", "follow", dll
                    'data' => json_encode([
                        'comment' => substr(request('comment'), 0, 25),
                        'user_id' => $user_id,
                        'article_id' => $article_id
                    ]),
                ]);
            }
            return response()->json([
                'success' => true,
                'message' => 'Comment created successfully',
                'commentId' => "comment_0212" . $comment->id
            ], 201);
        }

        return response()->json(['error' => 'Something went wrong'], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param Comment $comment The comment to be deleted
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse Response indicating success or redirect
     */
    public function destroy(Comment $comment)
    {
        if (request()->ajax()) {
            Comment::where('id', $comment->id)->delete();

            return response()->json(['success' => 'Comment deleted successfully']);
        }

        Comment::where('id', $comment->id)->delete();

        return redirect()->route('admin.mycomments.index')->with('success', 'Comment deleted successfully');
    }


    /**
     * Retrieves comments for a specific article.
     *
     * @param Article $post The article for which to retrieve comments
     * @return \Illuminate\Http\JsonResponse A JSON response containing the comments
     */
    public function getComment(Article $post)
    {
        $comments = Comment::where('article_id', $post->id)
            ->whereNull('parent_id')
            ->with(['replies' => function ($query) {
                $query->with(['replies' => function ($query) {
                    $query->with(['replies.user', 'user']);
                }, 'user']);
            }, 'user'])
            ->get()
            ->map(function ($comment) use ($post) {
                return $this->addCommentLevelAndAuthorFlag($comment, $post->user_id);
            });

        return response()->json($comments);
    }

    private function addCommentLevelAndAuthorFlag($comment, $authorUserId, $level = 1)
    {
        $comment->level = $level;
        $comment->is_author = $comment->user_id === $authorUserId;

        if ($comment->replies->isNotEmpty()) {
            $comment->replies->transform(function ($reply) use ($authorUserId, $level) {
                return $this->addCommentLevelAndAuthorFlag($reply, $authorUserId, $level + 1);
            });
        }
        return $comment;
    }
}
