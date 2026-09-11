<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

it('can connect to PostgreSQL', function () {
    $result= DB::connection('pgsql')->select('SELECT 1');

    expect($result)->not()->toBeEmpty();
});

it('can connect to Redis', function () {
    Redis::set('test:connection', 'ok');

    expect(Redis::get('test:connection'))->toBe('ok');

    Redis::del('test:connection');
});