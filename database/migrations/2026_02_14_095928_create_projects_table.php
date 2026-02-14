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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
$table->string('slug')->unique();
$table->string('tagline')->nullable();

$table->text('description')->nullable();
$table->longText('case_study')->nullable(); // problem/solution/results (markdown or html)
$table->json('responsibilities')->nullable();
$table->json('highlights')->nullable(); // key wins/metrics

$table->string('github_url')->nullable();
$table->string('live_url')->nullable();

$table->boolean('is_featured')->default(false);
$table->boolean('is_published')->default(true);
$table->unsignedSmallInteger('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
