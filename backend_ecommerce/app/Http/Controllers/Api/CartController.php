<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Resources\CartResource;
use App\Services\cartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(
        private readonly cartService $cartService
    ) {}

    public function index(): JsonResponse
    {
        $carts = $this->cartService->getAll();

        return response()->json([
            'message' => 'Cart retrieved successfully',
            'data' => CartResource::collection($carts),
        ]);
    }

    public function store(StoreCartRequest $request): JsonResponse
    {
        $cart = $this->cartService->store($request->validated());

        return response()->json([
            'message' => 'Product added to cart successfully',
            'data' => new CartResource($cart),
        ]);
    }
}