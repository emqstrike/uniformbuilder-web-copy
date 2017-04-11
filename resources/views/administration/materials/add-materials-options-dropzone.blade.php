@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<link rel="stylesheet" type="text/css" href="/dropzone/dropzone.css">
<style>
	#my-awesome-dropzone {
        border: dashed 1px black;
    }
    .dz-image {
    	background-color: gray;
    }
</style>
@endsection

@section('content')
<div class="col-md-12" style="margin-top: -40px;">
@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif
<div style="margin-top: 100px;" class="container">
    <form action="/administration/material/insert_dz_image" class="dropzone" id="my-awesome-dropzone">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
    </form>
    <table class="table table-bordered">
    	<thead>
    		<tr>
    			<td>Name</td>
    			<td>Layer Number</td>
    			<td>Setting Type</td>
    			<td>Default Color</td>
    			<td>Allow Pattern</td>
    			<td>Allow Color</td>
    			<td>Team Color ID</td>
    			<td>Group ID</td>
    			<td>Preview</td>
    		</tr>
    	</thead>
    	<tbody class="material-option-row">
    	</tbody>
    </table>
</div>

@endsection
@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script>
$(document).ready(function() {

// var myDropzone     = new Dropzone("div#attachment", { 
//     url: uploadFilePath,
//     paramName: 'someParameter[image]'
// });
var files = [];
this.addRemoveLinks = true;
// myDropzone.on('sending', function(file, xhr, formData){
//     formData.append('someParameter[image]', file);
//     formData.append('someParameter[userName]', 'bob');
// });

Dropzone.options.myAwesomeDropzone = {
	addRemoveLinks: true,
    success: function(file, response){
        //alert(response);
        console.log(file);
        console.log(response);
    },
    complete: function(file){
        console.log('completed');
        files.push(file.name);
    	console.log(files);
    	console.log(file);
    }
};

});
</script>
@endsection