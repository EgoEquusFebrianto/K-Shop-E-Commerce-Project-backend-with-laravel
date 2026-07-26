<?php

namespace App\Services\Contracts;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface AuthServiceInterface
{
    public function register(array $request): JsonResponse;
    public function login(array $request): JsonResponse;
    public function logout(Request $request): JsonResponse;
    public function me(Request $request): JsonResponse;
}