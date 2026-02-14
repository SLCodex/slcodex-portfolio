<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Profile extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name','headline','location','email','avatar_url','resume_url','summary','socials'
    ];

    protected $casts = [
        'socials' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')->singleFile();
        $this->addMediaCollection('resume')->singleFile(); // PDF
    }
}
