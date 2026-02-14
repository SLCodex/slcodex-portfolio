<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $profile = Profile::query()->first();

        $featuredProjects = Project::query()
            ->where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->latest()
            ->with('skills:id,name,category')
            ->get();

        $featuredSkills = Skill::query()
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->get(['id','name','category','level']);

        return Inertia::render('Home', [
            'profile' => $profile,
            'featuredProjects' => $featuredProjects,
            'featuredSkills' => $featuredSkills,
        ]);
    }
}
