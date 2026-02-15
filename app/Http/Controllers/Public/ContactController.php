<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contact/index');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:80'],
            'email' => ['required','email','max:120'],
            'message' => ['required','string','max:2000'],
        ]);

        ContactMessage::create($data);

        return back()->with('success', 'Thanks! Your message has been sent.');
    }
}
