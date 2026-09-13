<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class ProductService
{
    public function getAll(array $filter): LengthAwarePaginator
    {
        $query = Product::query()
            ->with('category')
            ->search($filter['search'] ?? null)
            ->category($filter['category'] ?? null)
            ->sortBy($filter['sort'] ?? null);
        
        return $query
            ->paginate(config('pagination.products_per_page'));
    }

    public function getLatestProducts(int $page = 1)
    {
        /**
         * @var Collection<int, Product> $products
         */
        $products = Cache::store('product')->remember(
            'products:latest',
            now()->addDay(), 
            function () {
                return Product::query()
                    ->with('category')
                    ->orderByDesc('created_at')
                    ->orderByDesc('id')
                    ->limit(config('pagination.latest_products_limit'))
                    ->get();
            }
        );

        $perpage = config('pagination.products_per_page');

        return new LengthAwarePaginator(
            $products->forPage($page, $perpage)->values(),
            $products->count(),
            $perpage,
            $page,
            [
                'path' => request()->url(),
                'query' => request()->query(),
            ]
        );
    }


    // public function getAll()
    // {
    //     $query->when(
    //         $filter['search'] ?? null,
    //         function ($query, $search) use ($filter) {
    //             $query->where('name', 'like', "%{$filter['search']}%");
    //         }
    //     );
            
    //     if (!empty($filter['search'])) {
    //         $query->where('name', 'ILIKE', "%{$filter['search']}%");
    //     }

    //     return $query
    //         ->paginate(config('pagination.products_per_page'));
    
    //     return Product::query()
    //         ->with('category')
    //         ->orderBy('name')
    //         ->get();
    // }
    
    // public function getById(int $id): Product
    // {
    //     return Product::query()
    //         ->with('category')
    //         ->findOrFail($id);
    // }
}