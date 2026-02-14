<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company','role','employment_type','location','is_remote',
        'start_date','end_date','is_current',
        'description','achievements','tech_used',
        'sort_order','is_visible'
    ];

    protected $casts = [
        'is_remote' => 'boolean',
        'is_current' => 'boolean',
        'is_visible' => 'boolean',
        'achievements' => 'array',
        'tech_used' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}
