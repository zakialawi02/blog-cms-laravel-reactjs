<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'List Category',
        ];

        $query = Category::orderBy(request("sort_field", 'created_at'), request("sort_direction", "desc"));

        if (request('search')) {
            $query = Category::where('category', 'like', '%' . request('search') . '%')
                ->orWhere('slug', 'like', '%' . request('search') . '%');
        }

        $query = $query->paginate(10)->onEachSide(1);

        return Inertia::render('Category/Index', [
            "meta" => $data,
            "categories" => $query,
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [
            'title' => 'Create Category',
        ];

        return Inertia::render('Category/Create', [
            "meta" => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $data = $request->validated();
        Category::create($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully');
    }

    public function generateSlug(Request $request)
    {
        $slug = Str::slug($request->category);

        return response()->json(['slug' => $slug]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $data = [
            'title' => 'Edit Category',
        ];

        return Inertia::render('Category/Edit', [
            "meta" => $data,
            "category" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        Category::where('slug', $category->slug)->update($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Category::where('slug', $category->slug)->delete();

        return redirect()->back()->with('success', 'Category deleted successfully');
    }
}
