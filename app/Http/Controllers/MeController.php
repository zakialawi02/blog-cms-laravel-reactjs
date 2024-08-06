<?php

namespace App\Http\Controllers;

use App\Models\Pesan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Home | zakialawi personal website',
        ];

        $notes = Pesan::latest()->get();

        return Inertia::render('ME/Home', [
            'meta' => $data,
            'notes' => $notes
        ]);

        return view('pages.front.me.index', compact('data', 'notes'));
    }

    public function sus()
    {
        $data = [
            'title' => 'system usability scale (sus) | zakialawi',
        ];

        return view('pages.front.me.SUS', compact('data',));
    }


    public function indexPesan()
    {
        $data = [
            'title' => 'Pesan | zakialawi',
        ];

        $notes = Pesan::latest()->get();

        return view('pages.back.me.pesan', compact('data', 'notes'));
    }

    public function showPesan(Request $request)
    {
        $notes = Pesan::latest()->get();

        return view('components.me.messages', compact('notes'));
    }

    public function storePesan(Request $request)
    {
        $request->validate([
            'pesan' => 'required|min:5',
            'pesan_dari' => 'nullable',
        ]);

        Pesan::create([
            'pesan' => $request->pesan,
            'pesan_dari' => $request->pesan_dari,
        ]);

        return response()->json(['message' => 'Message sent'], 201);
    }

    public function destroyPesan(Pesan $pesan)
    {
        Pesan::where('id', $pesan->id)->delete();

        return redirect()->route('admin.indexPesan')->with('success', 'Pesan deleted successfully.');
    }
}
