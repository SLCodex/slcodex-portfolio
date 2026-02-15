<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()
            ->where('is_published', true)
            ->with('skills:id,name,category')
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->latest()
            ->get();

        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    public function show(Project $project)
    {
        abort_unless($project->is_published, 404);

        $project->load('skills:id,name,category');

        // Media URLs (thumbnail + gallery)
        $thumbnail = $project->getFirstMediaUrl('thumbnail');
        $gallery = $project->getMedia('gallery')->map(fn ($m) => $m->getUrl());

        return Inertia::render('projects/show', [
            'project' => $project,
            'thumbnail' => $thumbnail,
            'gallery' => $gallery,
        ]);
    }
}
