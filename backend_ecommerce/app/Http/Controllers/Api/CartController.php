<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(
        private readonly CartService $cartService
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

    public function update(UpdateCartRequest $request, Cart $cart): JsonResponse
    { 
        $cart = $this->cartService->update($cart, $request->validated());

        return response()->json([
            'message' => 'Cart updatedd successfully.',
            'data' => new CartResource($cart),
        ]);
    }

    public function destroy(Cart $cart): JsonResponse
    {
        $this->cartService->delete($cart);

        return response()->json([
            'message' => 'Cart deleted successfully.'
        ]);
    }
}