<?php

namespace Database\Seeders;

use App\Models\WebSetting;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WebSettings extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WebSetting::create([
            'web_name' => "My Blog",
            'tagline' => "My Blog Tagline",
            'title' => "My Blog",
            'description' => "My Blog",
            'keywords' => "My Blog, Laravel",
            'logo' => "logo_web.webp",
            'favicon' => "favicon.png",
            'email' => "",
            'link_fb' => "",
            'link_ig' => "",
            'link_twitter' => "",
            'link_youtube' => "",
            'link_linkedin' => "",
            'link_github' => "",
        ]);
    }
}
