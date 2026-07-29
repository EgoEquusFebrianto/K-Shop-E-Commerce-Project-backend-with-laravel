<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    )
    {}

    public function index(): JsonResponse
    {
        $orders = $this->orderService->getAll();

        return response()->json([
            'message' => 'Order List retrieved successfully.',
            'data' => OrderResource::collection($orders),
        ]);
    }

    public function checkout(): JsonResponse
    {
        $order = $this->orderService->checkout();

        return response()->json([
            'message' => 'Checkout complated successfully.',
            'data' => $order,
        ], 201);
    }

    public function destroy(Order $order): JsonResponse
    {
        $this->orderService->delete($order);

        return response()->json([
            'message'=> 'Data Successfully Delete.',
        ]);
    }
}