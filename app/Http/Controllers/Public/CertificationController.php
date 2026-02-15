<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Inertia\Inertia;

class CertificationController extends Controller
{
    public function index()
    {
        $certs = Certification::query()
            ->orderByDesc('is_featured')
            ->orderByDesc('issue_date')
            ->orderBy('sort_order')
            ->get();

        // include proof media url
        $certs->transform(function ($c) {
            $c->proof_media_url = $c->getFirstMediaUrl('proof');
            return $c;
        });

        return Inertia::render('certifications/index', [
            'certifications' => $certs,
        ]);
    }
}
