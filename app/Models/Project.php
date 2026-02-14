<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Project extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title', 'slug', 'tagline',
        'description', 'case_study',
        'responsibilities', 'highlights',
        'github_url', 'live_url',
        'is_featured', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'responsibilities' => 'array',
        'highlights' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
    ];

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class)->withTimestamps();
    }

    // Media Collections
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('gallery');
    }
}
