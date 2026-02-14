<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Certification extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title','issuer','issue_date','credential_url','proof_url','is_featured','sort_order'
    ];

    protected $casts = [
        'issue_date' => 'date',
        'is_featured' => 'boolean',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('proof')->singleFile(); // PDF or image
    }
}
