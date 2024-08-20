<?php

namespace App\Http\Controllers;

use App\Models\WebSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1048',
                'favicon' => [
                    'nullable',
                    'image',
                    'mimes:jpeg,png,jpg,gif,svg',
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

        if ($request->hasFile('favicon') && $request->file('favicon')) {
            if ($webSetting->favicon) {
                unlink(public_path($webSetting->favicon));
            }
            $file = $request->file('favicon');
            $filename = time() . '_favicon' . '.' . $file->getClientOriginalExtension();
            $file->move(public_path(), $filename);
            $data['favicon'] = $filename;
        } else {
            unset($data['favicon']);
        }

        if ($request->hasFile('logo') && $request->file('logo')) {
            if ($webSetting->logo) {
                unlink(public_path($webSetting->logo));
            }
            $file = $request->file('logo');
            $filename = time() . '_logo' . '.' . $file->getClientOriginalExtension();
            $file->move(public_path(), $filename);
            $data['logo'] = $filename;
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
