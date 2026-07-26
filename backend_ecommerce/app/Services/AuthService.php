<?php

namespace App\Services;

use App\Enums\UserStatus;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Services\Contracts\AuthServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Pest\ArchPresets\Laravel;

class AuthService implements AuthServiceInterface
{

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

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Register success',
                'token' => $token,
                'user' => new UserResource($user),
            ], 201);
        });
    }

    public function login(array $data): JsonResponse
    {
        // if(!Auth::attempt([
        //     'email' => $data['email'],
        //     'password' => $data['password'],
        // ])) {
        //     return response()->json([
        //         'message' => 'Invalid email or password.',
        //     ], 401);
        // }

        // /**
        //  * @var \App\Models\User $user
        //  */
        // $user = Auth::user();
        // $token = $user->createToken('auth_token')->plainTextToken;

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid Email or Password.'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Success',
            'token' => $token,
            'user'=> new UserResource($user),
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {  
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout success.'
        ], 200);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'message' => new UserResource($request->user())
        ], 200);
    }
}