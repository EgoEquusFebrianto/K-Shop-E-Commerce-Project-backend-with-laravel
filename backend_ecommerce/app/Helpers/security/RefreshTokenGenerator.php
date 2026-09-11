<?php

namespace App\Helpers\security;

use RuntimeException;

class RefreshTokenGenerator
{
    public function generate(): array
    {
        try {
            $bytes = random_bytes(64);

        } catch (\Throwable $e) {
            throw new RuntimeException(
                "Failed to generate refresh token.",
                previous: $e
            );
        }

        $token = $this->base64UrlEncode($bytes);

        return [
            'token' => $token,
            'hash' => $this->hash($token),
        ];
    }

    public function hash(string $token): string
    {
        $hash = hash('sha256', $token, true);

        return $this->base64UrlEncode($hash);
    }

    private function base64UrlEncode(string $value): string
    {
        return rtrim(
            strtr(
                base64_encode($value),
                '+/',
                '-_'
            ),
            '='
        );
    }
}
