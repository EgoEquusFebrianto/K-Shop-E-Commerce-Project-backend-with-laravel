<?php

use App\Helpers\security\RefreshTokenGenerator;
use Tests\TestCase;

class RefreshTokenGeneratorTest extends TestCase
{
    private RefreshTokenGenerator $generator;
    
    protected function setUp(): void
    {
        parent::setUp();
        $this->generator = new RefreshTokenGenerator();
    }

    public function test_generate_returns_token_and_hash(): void
    {
        $result = $this->generator->generate();

        $this->assertArrayHasKey('token', $result);
        $this->assertArrayHasKey('hash', $result);

        $this->assertNotEmpty($result['token']);
        $this->assertNotEmpty($result['hash']);
    }

    public function test_generated_token_hash_expected_length(): void
    {
        $result = $this->generator->generate();
        
        var_dump($result);

        $this->assertSame(86, strlen($result['token']));
    }

    public function test_hash_is_consistent(): void
    {
        $token = 'example-refresh-token';

        $hash1 = $this->generator->hash($token);
        $hash2 = $this->generator->hash($token);

        $this->assertSame($hash1, $hash2);
    }

    public function test_generated_hash_matches_token(): void
    {
        $result = $this->generator->generate();

        $expectedHash = $this->generator->hash($result['token']);

        $this->assertSame($expectedHash, $result['hash']);
    }
}