<?php

return [

	'client_id' => env('PROLOOK_SSO_CLIENT_ID', 3),

	'redirect_uri' => env('PROLOOK_SSO_REDIRECT', 'http://localhost/authentication/callback'),

	'secret' => env('PROLOOK_SSO_SECRET', null)

];