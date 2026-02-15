<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Inertia\Inertia;

class TechStackController extends Controller
{
    public function index()
    {
        $skills = Skill::query()
            ->orderBy('category')
            ->orderByDesc('name')
            ->orderBy('sort_order')
            ->get(['id','name','category']);

        $grouped = $skills->groupBy('category');

        return Inertia::render('tech-stack/index', [
            'skillsByCategory' => $grouped,
        ]);
    }
}
