<?php

Route::get('remote-login/{token?}', 'AuthenticationController@remoteLogin');

Route::group(['prefix' => 'richardson'], function () {
    Route::get('/index', function ()    {
        return view("richardson.index");
    });

    Route::get("/customize/{uniform_id}", function($uniform_id) {
        // return $uniform_id;
        return view("richardson.customize", compact('uniform_id'));
    });

    Route::get("/my-saved-designs", function() {
        return view("richardson.my-saved-design");
    });

    Route::get("/block-patterns/{pattern}/types/{uniform_type}", function($pattern, $uniform_type) {
        if ($uniform_type === "color-infused") {
            $uniform_type = "sublimated";
        } else if ($uniform_type === "color-dyed") {
            $uniform_type = "tackle_twill";
        } else {
            abort(404);
        }
        
        $styles = [
            "page" => "picker",
            "block_pattern" => $pattern,
            "uniform_type" => $uniform_type
        ];
        $asset_storage = env('ASSET_STORAGE');

        return view("richardson.picker", compact('styles', 'asset_storage'));
    });
});