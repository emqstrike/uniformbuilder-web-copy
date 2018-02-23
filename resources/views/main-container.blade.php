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
		<!-- <link href='https://fonts.googleapis.com/css?family=Droid+Sans+Mono' rel='stylesheet' type='text/css'> -->

		<link href='https://fonts.googleapis.com/css?family=Roboto:500' rel='stylesheet' type='text/css'>
		
		<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap.min.css?v={{$asset_version}}">
		<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css?v={{$asset_version}}">
		<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css?v={{$asset_version}}">
		<link rel="stylesheet" href="{{$asset_storage}}/jquery-ui/jquery-ui.min.css?v={{$asset_version}}">
		<link rel="stylesheet" href="{{$asset_storage}}/dropzone/dropzone.css?v={{$asset_version}}">

		<link rel="stylesheet" href="{{$asset_storage}}/css/custom.css?v={{$asset_version}}">
	
	</head>

	<body>

		<!-- sidebar -->

		
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

		<!-- Material Preview / Editor-->
		@include('partials.material_editor')


		<!-- custom mods -->

		<style type="text/css">
		
			@yield('custom-styles')
		
		</style>

		<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js?v={{$asset_version}}"></script>
		<script src="{{$asset_storage}}/jquery-ui/jquery-ui.min.js?v={{$asset_version}}"></script>
		<script src="{{$asset_storage}}/bootstrap/js/bootstrap.min.js?v={{$asset_version}}"></script>
		<script src="{{$asset_storage}}/fabricjs/fabric.min.js?v={{$asset_version}}"></script>
		<script src="{{$asset_storage}}/dropzone/dropzone.js?v={{$asset_version}}"></script>

	
		@yield('additional-scripts')

		
		<script type="text/javascript">
			
			@yield('custom-scripts')

		</script>

	</body>

</html>

