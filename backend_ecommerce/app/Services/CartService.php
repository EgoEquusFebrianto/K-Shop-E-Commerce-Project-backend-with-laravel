<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class cartService
{
    public function getAll()
    {
        return Auth::user()
            ->carts()
            ->with('product.category')
            ->get();
    }

    public function store(array $data): Cart
    {
        $product = Product::findOrFail($data['product_id']);

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $product->id)
            ->first();
        
        if($cart) {
            $newQuantity = $cart->quantity + $data['quantity'];

            if ($newQuantity > $product->stock) {
                throw ValidationException::withMessages([
                    'quantity' => 'Quantity exceeds available stock.',
                ]);
            } 

            $cart->update([
                'quantity'=> $newQuantity,
            ]);

        } else {
            if ($data['quantity'] > $product->stock) {
                throw ValidationException::withMessages([
                    'quantity' => 'Quantity exceeds available stock.'
                ]);
            }

            $cart = Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $product->id,
                'quantity' => $data['quantity'],
            ]);
        }
        
        return $cart->load('product.category');
    }
}