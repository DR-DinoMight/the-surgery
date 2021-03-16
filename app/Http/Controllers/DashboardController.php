<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSetting;
use App\Models\TwitchSetting;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     *
     * @return View|Factory
     * @throws BindingResolutionException
     */
    public function index() {
        return view('dashboard');
    }

    /**
     *
     * @param StoreSetting $request
     * @return RedirectResponse
     * @throws BindingResolutionException
     */
    public function storeSettings(StoreSetting $request) : RedirectResponse {
        $validated = $request->validated();

        $requestAsJson = json_encode($validated);

        // dd($requestAsJson);

        TwitchSetting::where('active', true)->update(['active' => false]);

        $twitchSetting = new TwitchSetting([
            'settings' => $requestAsJson,
            'active' => true
        ]);
        // dd($twitchSetting);

        if (!$twitchSetting->save()) {
            return back()->withErrors(['Unable to save please try again.'])->withInput();
        }

        return back()->with(['success' => 'Stored Data']);


    }
}
