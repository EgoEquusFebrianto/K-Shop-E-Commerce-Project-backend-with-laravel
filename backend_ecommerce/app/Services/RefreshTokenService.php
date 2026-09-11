<?php

namespace App\Services;

use App\Helpers\security\RefreshTokenGenerator;
use Illuminate\Support\Facades\Cache;

class RefreshTokenService
{
    public function __construct(
        private readonly RefreshTokenGenerator $generator
    ){}

    public function issue(int $userId): array
    {
        $generated = $this->generator->generate();
        
        $key = $this->getKey($generated['hash']);
        $ttlDays = config('auth.refresh_token.ttl_days');

        Cache::store('redis')->put(
            $key,
            [
                'user_id' => $userId,
            ],
            now()->addDays($ttlDays)
        );

        return [
            'token' => $generated['token'],
            'hash' => $generated['hash'],
        ];
    }

    public function getUserId(string $token): ?int
    {
        $hash = $this->generator->hash($token);
        $data = Cache::store('redis')->get(
            $this->getKey($hash)
        );

        if (!$data) {
            return null;
        }

        return (int) $data['user_id'];
    }

    public function revoke(string $token): void
    {
        $hash = $this->generator->hash($token);

        Cache::store('redis')->forget(
            $this->getKey($hash)
        );
    }

    public function rotate(string $token, int $userId): array
    {
        $this->revoke($token);

        return $this->issue($userId);
    }

    private function getKey(string $hash): string
    {
        return "auth:refresh_token:{$hash}";
    }
}
