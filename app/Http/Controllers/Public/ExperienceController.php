<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::query()
            ->where('is_visible', true)
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('experience/index', [
            'experiences' => $experiences,
        ]);
    }
}
