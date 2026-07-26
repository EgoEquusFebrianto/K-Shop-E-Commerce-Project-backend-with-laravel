<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    public function getAll(array $filter): LengthAwarePaginator
    {
        $query = Product::query()
            ->with('category')
            ->search($filter['search'] ?? null)
            ->category($filter['category'] ?? null)
            ->sortBy($filter['sort'] ?? null);
        
        // $query->when(
        //     $filter['search'] ?? null,
        //     function ($query, $search) use ($filter) {
        //         $query->where('name', 'like', "%{$filter['search']}%");
        //     }
        // );
            
        // if (!empty($filter['search'])) {
        //     $query->where('name', 'ILIKE', "%{$filter['search']}%");
        // }

        return $query
            ->paginate(config('pagination.products_per_page'));
    }



    // public function getAll()
    // {
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