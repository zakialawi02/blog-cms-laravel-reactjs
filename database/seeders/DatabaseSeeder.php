<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\ArticleView;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // $this->call(MenuItems::class);
        $this->call(MenuItems::class);
        $this->call(Users::class);
        // User::factory(200)->create();
        $this->call(Categories::class);
        $this->call(Tags::class);
        // $this->call(Articles::class);
        // ArticleView::factory(500)->create();
        $this->call(WebSettings::class);
    }
}
