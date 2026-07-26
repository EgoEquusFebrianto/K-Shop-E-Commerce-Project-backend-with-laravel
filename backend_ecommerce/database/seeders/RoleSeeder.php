<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();
        Role::insert([
            [
                'role_name' => 'CUSTOMER',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'role_name' => 'ADMIN',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}