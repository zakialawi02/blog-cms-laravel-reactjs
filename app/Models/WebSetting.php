<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebSetting extends Model
{
    use HasFactory;

    protected $table = 'web_setting';
    protected $guarded = ['id'];

    protected $fillable = [
        'web_name',
        'description',
        'keywords',
        'logo',
        'favicon',
        'email',
        'link_fb',
        'link_ig',
        'link_youtube',
        'link_twitter',
        'link_linkedin',
        'link_github',
    ];
}
