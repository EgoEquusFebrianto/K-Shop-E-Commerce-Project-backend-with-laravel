<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();
        Category::insert([
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Fashion',
                'slug' => 'fashion',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
