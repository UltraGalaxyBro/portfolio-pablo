<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DefaultAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'pablonogueira1996@gmail.com'],
            [
                'name' => 'Pablo Nogueira',
                'email' => 'pablonogueira1996@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Pableira21*'),
            ]
        );
    }
}
