<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService
    )
    {}

    public function index(): JsonResponse
    {
        $categories = $this->categoryService->getAll();

        return response()->json([
            'message' => 'Categories retrieved successfully',
            'data' => CategoryResource::collection($categories),
        ]);
    }
}