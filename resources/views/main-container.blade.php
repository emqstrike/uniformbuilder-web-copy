<!DOCTYPE html>
<html>
	<head>
        <meta http-equiv="Access-Control-Allow-Origin" content="*"/>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $page_title }}</title>

        <meta name="description" content="QuickStrike Uniform Builder">
        <meta name="author" content="QuickStrike Engineering">

		<link rel="icon" type="image/png" href="/images/branding/fav-ico.png" />
		<!-- <link href='http://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'> -->
		<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

		<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap.min.css{{$asset_version}}">
		<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css{{$asset_version}}">
		<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css{{$asset_version}}">

		<link rel="stylesheet" href="{{$asset_storage}}/css/main.css{{$asset_version}}">
		
	</head>

	<body>

		<!-- sidebar -->

		@include('partials.sidebar')

		<div class="main-content">
		
			<!-- main area -->
			<div class="content-area">
				
				@yield('contentarea')
					
			</div>
			

			<!-- properties -->
			<div class="properties">
	
				@yield('properties')

			</div>

		</div>

		<!-- custom mods -->

		<style type="text/css">
		
			@yield('custom-styles')
		
		</style>

		<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js{{$asset_version}}"></script>
		<script src="{{$asset_storage}}/bootstrap/js/bootstrap.min.js{{$asset_version}}"></script>
		<script src="{{$asset_storage}}/fabricjs/fabric.min.js{{$asset_version}}"></script>
		
		@yield('additional-scripts')

		<script type="text/javascript">
			
			@yield('custom-scripts')

		</script>
	</body>

</html>

