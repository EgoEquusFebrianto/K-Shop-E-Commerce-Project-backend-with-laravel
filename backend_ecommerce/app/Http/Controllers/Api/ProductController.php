<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService
    ) {

    }

    public function index(Request $request): JsonResponse
    {
        // $search = $request->query('search');
        // $perPage = (int) $request->query('per_page', 10);
        $products = $this->productService->getAll([
            'search' => $request->query('search'),
            'category' => $request->query('category'),
            'sort' => $request->query('sort'),
        ]);

        return response()->json([
            'message' => 'Product retrieved successfully.',    
            'data' => ProductResource::collection($products),
            'pagination' => [
                'page' => $products->currentPage(),
                'totalPage' => $products->lastPage(),
                'first' => $products->onFirstPage(),
                'last' => $products->currentPage() === $products->lastPage(),
            ],
        ]);
    }

    // Route Model Binding
    public function show(Product $product): JsonResponse
    {
        $product->load('category');
        
        return response()->json([
            'message' => 'Product retrieved successfully.',
            'data' => new ProductResource($product),
        ]);
    }

    // public function index(): JsonResponse
    // {
    //     $products = $this->productService->getAll();

    //     return response()->json([
    //         'message' => 'Product retrieved successfully.',    
    //         'data' => ProductResource::collection($products),
    //     ]);
    // }

    // Regular way
    // public function show(int $id): JsonResponse 
    // {
    //     $product = $this->productService->getById($id);

    //     return response()->json([
    //         'message' => 'Product retrieved successfully.',
    //         'data' => new ProductResource($product),
    //     ]);
    // }
}