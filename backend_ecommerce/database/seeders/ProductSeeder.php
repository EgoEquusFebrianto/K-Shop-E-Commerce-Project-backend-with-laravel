<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technology = Category::where('slug', 'technology')->first();
        $fashion = Category::where('slug', 'fashion')->first();
        $now = now();
        
        $baseProducts = [
            [
                'category_id' => $technology->id,
                'name' => 'iPhone',
                'slug' => 'iphone',
                'description' => 'Apple iPhone smartphone.',
                'price' => 999.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/iphone.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $technology->id,
                'name' => 'MacBook Pro 2022 (M1)',
                'slug' => 'macbook-pro-2022-m1',
                'description' => 'Apple MacBook Pro M1.',
                'price' => 1999.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/macbook-pro-2022-m1.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $technology->id,
                'name' => 'Canon M50 Camera',
                'slug' => 'canon-m50-camera',
                'description' => 'Canon mirrorless camera.',
                'price' => 699.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/canon-m50-camera.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $technology->id,
                'name' => 'LED Light Strips',
                'slug' => 'led-light-strips',
                'description' => 'RGB LED strip lights.',
                'price' => 19.99,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/led-light-strips.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $fashion->id,
                'name' => 'WLS Van Gogh Denim Jacket',
                'slug' => 'wls-van-gogh-denim-jacket',
                'description' => 'Denim jacket inspired by Van Gogh.',
                'price' => 228.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/wls-van-gogh-denim-jacket.png',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $fashion->id,
                'name' => 'SPECTRUM LS TEE',
                'slug' => 'spectrum-ls-tee',
                'description' => 'Long sleeve t-shirt.',
                'price' => 68.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/spectrum-ls-tee.webp',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $fashion->id,
                'name' => 'AUTO SERVICE SHIRT by GOLF WANG',
                'slug' => 'auto-service-shirt-golf-wang',
                'description' => 'Golf Wang work shirt.',
                'price' => 120.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/auto-service-shirt-golf-wang.webp',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'category_id' => $fashion->id,
                'name' => 'DON\'T TRIP UNSTRUCTURED HAT',
                'slug' => 'dont-trip-unstructured-hat',
                'description' => 'Casual cap.',
                'price' => 40.00,
                'stock' => 100,
                'status' => 'AVAILABLE',
                'storage_path' => 'products/default/dont-trip-unstructured-hat.webp',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Product::insert($baseProducts);

        $allProducts = [];
        for ($i = 0; $i < 7; $i++) {
            foreach ($baseProducts as $product) {
                $duplicate = $product;
                $duplicate['name'] = $product['name'] . ' (Copy ' . ($i + 1) . ')';
                $duplicate['slug'] = $product['slug'] . '-copy-' . ($i + 1);
                $allProducts[] = $duplicate;
            }
        }

        Product::insert($allProducts);
    }
}
