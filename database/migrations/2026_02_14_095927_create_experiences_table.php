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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
$table->string('role');
$table->string('employment_type')->nullable(); // Full-time, Freelance, Contract
$table->string('location')->nullable();
$table->boolean('is_remote')->default(true);

$table->date('start_date')->nullable();
$table->date('end_date')->nullable();
$table->boolean('is_current')->default(false);

$table->text('description')->nullable();
$table->json('achievements')->nullable(); // ["Built X", "Improved Y"]
$table->json('tech_used')->nullable(); // ["Laravel", "React"]
$table->unsignedSmallInteger('sort_order')->default(0);
$table->boolean('is_visible')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
