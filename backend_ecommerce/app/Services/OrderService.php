<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function getAll()
    {
        $user = Auth::user();
        $orders = Order::where("user_id", $user->id)
            ->with('orderItems.product')
            ->get();
        
        return $orders;
    }

    public function checkout()
    {
        /**
         * @var User $user
         */
        $user = Auth::user();

        /**
         * @var Collection<int, Cart> $carts
         */
        $carts = $user->carts()
            ->with("product")
            ->get();

        // Validation
        if ($carts->isEmpty()) {
            throw ValidationException::withMessages([
                'cart' => 'Shopping cart is empty.',
            ]);
        }

        foreach($carts as $cart) {
            if ($cart->quantity > $cart->product->stock) {
                throw ValidationException::withMessages([
                    'stock' => "{$cart->product->name} is run out stock."
                ]);
            }
        }

        $totalAmount = $carts->sum(function ($cart) {
            return $cart->quantity * $cart->product->price;
        });


        return DB::transaction(function() use ($user, $carts, $totalAmount) {
            /**
             * @var Order $order
             */
            $order = $user->orders()->create([
                'order_number' => $this->generateOrderNumber(),
                'total_amount' => $totalAmount,
                'status' => OrderStatus::PENDING,

            ]);

            foreach($carts as $cart ) {
                /**
                 * @var Product $product
                 */
                $product = $cart->product;

                $order->orderItems()->create([
                    "product_id" => $product->id,
                    'product_name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $cart->quantity,
                    'subtotal' => $product->price * $cart->quantity,
                ]);

                $product->decrement('stock', $cart->quantity);
            }

            // clear cart
            $user->carts()->delete();

            // return complate order
            return $order->load('orderItems');
        });
    }

    public function generateOrderNumber(): String 
    {
        return 'ORD-' 
            . now()->format('ymdHis') 
            . '-' 
            . strtoupper(substr(uniqid(), -5));  
    }
}