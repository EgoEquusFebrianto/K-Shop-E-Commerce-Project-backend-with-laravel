<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Contracts\AuthServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthServiceInterface $authService
    ) {

    }

    public function register(RegisterRequest $request): JsonResponse
    {
        return $this->authService->register(
            $request->validated()
        );
    }

    public function login(LoginRequest $request): JsonResponse    
    {
        return $this->authService->login(
            $request->validated()
        );
    }

    public function logout(Request $request): JsonResponse
    {
        return $this->authService->logout($request);
    }

    public function me(Request $request): JsonResponse
    {
        return $this->authService->me($request);
    }
}