<?php

namespace App\Services;

use App\Enums\UserStatus;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Services\Contracts\AuthServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService implements AuthServiceInterface
{
    public function __construct(
        private readonly RefreshTokenService $refreshTokenService
    ) {}

    public function register(array $data): JsonResponse
    {
        return DB::transaction(function () use ($data) {
            $customerRole = Role::where('role_name', 'CUSTOMER')->first();

            if (!$customerRole) {
                return response()->json([
                    'message' => 'Customer role not found.'
                ], 500);
            }

            $user = User::create([
                'role_id' => $customerRole->id,
                'fullname' => $data['fullname'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => $data['phone'],
                'status' => UserStatus::ACTIVE,
                'avatar' => 'profile/default/customer1.jpg',
            ]);

            $accessToken = $this->createAccessToken($user);
            $refreshToken = $this->createRefreshToken($user);

            return $this->authResponse(
                $user, 
                'Register success.',
                $accessToken,
                $refreshToken
            );
        });
    }

    public function login(array $data): JsonResponse
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid Email or Password.'
            ], 401);
        }

        $accessToken = $this->createAccessToken($user);
        $refreshToken = $this->createRefreshToken($user);

        return $this->authResponse(
            $user, 
            'Login success.',
            $accessToken,
            $refreshToken
        );
    }

    public function refresh(Request $request): JsonResponse
    {
        $refreshToken = $request->cookie(
            config('auth.refresh_token.cookie_name')
        );

        if (!$refreshToken) {
            return response()->json([
                'message' => 'Refresh token is missing.',
                'code' => 'REFRESH_TOKEN_MISSING',
            ], 401);
        }

        $userId = $this->refreshTokenService->getUserId($refreshToken);
        if (!$userId) {
            return response()->json([
                'message' => 'Invalid or expired refresh token.',
                'code' => 'REFRESH_TOKEN_EXPIRED',
            ], 401);
        }

        $user = User::find($userId);
        if (!$user) {
            $this->refreshTokenService->revoke($refreshToken);

            return response()->json([
                'message' => 'User not found.',
                'code' => 'USER_NOT_FOUND',
            ], 401);
        }

        $accessToken = $this->createAccessToken($user);

        return response()->json([
            'message' => 'Token refreshed successfully',
            'access_token' => $accessToken,
            'user' => new UserResource($user),
        ], 201);
                
        // $newRefreshToken = $this->refreshTokenService->rotate(
        //     $refreshToken, 
        //     $user->id
        // );
    }

    public function logout(Request $request): JsonResponse
    {  
        $request->user()->currentAccessToken()->delete();

        $refreshToken = $request->cookie(
            config('auth.refresh_token.cookie_name')
        );

        if ($refreshToken) {
            $this->refreshTokenService->revoke($refreshToken);
        }

        return response()
            ->json([
                'message' => 'Logout success.'
            ], 200)
            ->withoutCookie(
                config('auth.refresh_token.cookie_name'),
                config('auth.refresh_token.cookie_path')
            );
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Getting current user.',
            'user' => new UserResource($request->user())
        ], 200);
    }
    
    private function createAccessToken(User $user): string
    {
        return $user->createToken(
            'access_token',
            ['*'],
            now()->addMinutes(
                config('auth.access_token.ttl_minutes')
            )
        )->plainTextToken;
    }

    private function createRefreshToken(User $user): array
    {
        return $this->refreshTokenService->issue($user->id);
    }

    private function authResponse(
        User $user,
        string $message,
        string $accessToken,
        array $refreshToken
    ): JsonResponse
    {
        return response()
            ->json([
                'message' => $message,
                'access_token' => $accessToken,
                'user' => new UserResource($user),
            ], 201)
            ->cookie(
                config('auth.refresh_token.cookie_name'),
                $refreshToken['token'],
                config('auth.refresh_token.ttl_days') * 24 * 60,
                config('auth.refresh_token.cookie_path'),
                null,
                config('auth.refresh_token.cookie_secure'),
                config('auth.refresh_token.cookie_http_only'),
                false,
                config('auth.refresh_token.cookie_same_site'),
            );
    }

    // public function login(array $data): JsonResponse
    // {
    //     if(!Auth::attempt([
    //         'email' => $data['email'],
    //         'password' => $data['password'],
    //     ])) {
    //         return response()->json([
    //             'message' => 'Invalid email or password.',
    //         ], 401);
    //     }

    //     /**
    //      * @var \App\Models\User $user
    //      */
    //     $user = Auth::user();
    //     $token = $user->createToken('auth_token')->plainTextToken;

    //     return response()
    //         ->json([
    //             'message' => 'Login Success',
    //             'access_token' => $token,
    //             'user'=> new UserResource($user),
    //         ], 200)
    // }
}