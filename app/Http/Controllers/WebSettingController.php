<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\WebSetting;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class WebSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = [
            'title' => 'Web Setting',
        ];

        $webSetting = WebSetting::first();

        return Inertia::render('Dashboard/Setting/Index', [
            'meta' => $data,
            'webSetting' => $webSetting
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WebSetting $webSetting)
    {
        $request->validate(
            [
                'web_name' => 'nullable|string|max:100',
                'description' => 'nullable|string|max:300',
                'keywords' => 'nullable|string|max:255',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:1048',
                'favicon' => [
                    'nullable',
                    'image',
                    'mimes:png',
                    'max:548',
                    'dimensions:max_width=1000,max_height=1000',
                ],
                'link_fb' => 'nullable|url|max:255',
                'link_ig' => 'nullable|url|max:255',
                'link_twitter' => 'nullable|url|max:255',
                'link_youtube' => 'nullable|url|max:255',
                'link_linkedin' => 'nullable|url|max:255',
                'link_github' => 'nullable|url|max:255',
            ],
            [
                'favicon.dimensions' => 'The favicon should be 1000x1000 pixels or less.',
            ]
        );
        $data =  $data = $request->except('_method', '_token');

        $webSetting = WebSetting::where('id', $request->id)->first();

        // create image manager with desired driver
        $manager = new ImageManager(new Driver());

        if ($request->hasFile('favicon') && $request->file('favicon')) {
            if ($webSetting->favicon) {
                unlink(public_path($webSetting->favicon));
            }
            $file = $request->file('favicon');
            $filename = 'favicon' . '.' . $file->getClientOriginalExtension();
            $file->move(public_path(), $filename);
            $data['favicon'] = $filename;
        } else {
            unset($data['favicon']);
        }

        if ($request->hasFile('logo') && $request->file('logo')) {
            // hapus folder 'logo' di public_path
            if (file_exists(public_path('logo'))) {
                File::deleteDirectory(public_path('logo'));
            }

            // simpan logo baru di public_path folder 'logo'
            $file = $request->file('logo');
            $filename = 'logo' . '.' . $file->getClientOriginalExtension();
            $image = $manager->read($file->getRealPath());
            File::ensureDirectoryExists(public_path('logo'));
            $image->toWebp()->save(public_path('logo/logo.webp'));
            $file->move(public_path('logo'), $filename);
            $data['logo'] = 'logo.webp';
        } else {
            unset($data['logo']);
        }

        WebSetting::where('id', $request->id)->update($data);

        return redirect()->route('admin.websettings.index');
    }

    public function getData()
    {
        $webSetting = WebSetting::first();
        return response()->json($webSetting);
    }
}
