@extends("richardson.layout.master-plain")
@section("body")
<!-- Preview Panel -->
@include('partials.panels.debug-panel')
<!-- End Preview Panel -->
<div id="richardson-main-container">
    <div class="richardson-initial-picker">
        
    </div>
</div>
@include("richardson.includes.richardson-init-code")
<script type="text/javascript" src="/richardson/js/uniform-builder-richardson-data.js"></script>
<script type="text/javascript" src="/richardson/js/RichardsonPicker.js"></script>
@include("richardson.includes.m-picker")
@endsection