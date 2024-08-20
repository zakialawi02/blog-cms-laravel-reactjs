<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    protected $menuItems;

    public function __construct()
    {
        $this->menuItems = new MenuItem();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Nav Menu Settings',
        ];

        $menuItems = $this->menuItems->getMenuItems('header');
        $menuItems2 = MenuItem::where('class', 'footer-a')->orderBy('order')->get();
        $menuItems3 = MenuItem::where('class', 'footer-b')->orderBy('order')->get();
        $menuLinks = [
            'header' => $menuItems,
            'footer_a' => $menuItems2,
            'footer_b' => $menuItems3,
        ];

        return Inertia::render('Dashboard/NavMenu/Index', [
            'meta' => $data,
            'menuLinks' => $menuLinks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'class' => 'required|in:header,footer-a,footer-b',
            'order' => 'required|integer',
            'parent_id' => 'nullable|exists:menu_items,id',
        ]);

        MenuItem::create($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        MenuItem::where('id', $id)->delete();
    }

    public function getMenuFooter()
    {
        $menuItems2 = MenuItem::where('class', 'footer-a')->orderBy('order')->get();
        $menuItems3 = MenuItem::where('class', 'footer-b')->orderBy('order')->get();
        $menuLinks = [
            'footer_a' => $menuItems2,
            'footer_b' => $menuItems3,
        ];

        return response()->json($menuLinks);
    }

    public function getMenuHeader()
    {
        $menuItems = $this->menuItems->getMenuItems('header');

        return response()->json($menuItems);
    }
}
