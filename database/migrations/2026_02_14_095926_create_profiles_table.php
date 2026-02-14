<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
$table->string('headline')->nullable();
$table->string('location')->nullable();
$table->string('email')->nullable();
$table->string('avatar_url')->nullable(); // or use media library later
$table->string('resume_url')->nullable(); // or media library
$table->text('summary')->nullable();
$table->json('socials')->nullable(); // { github, linkedin, facebook, portfolio, ... }

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
