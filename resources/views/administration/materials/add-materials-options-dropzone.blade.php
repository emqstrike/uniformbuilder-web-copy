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
<div class="container-fluid main-content" style="margin-top: 100px;">
    <form action="/administration/material/insert_dz_image" class="dropzone" id="my-awesome-dropzone">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
    </form>
    <input type="hidden" name="material_id" id="material_id" value="{{ $material->id }}">
    <input type="hidden" name="application_type" id="application_type" value="{{ $material->uniform_application_type }}">
    <input type="hidden" class="data-string">
    <div class="form-group">
    	<div class="col-md-3">
    		ORIGIN <select class="form-control origin">
		    	<option value="web">Web</option>
		    	<option value="ipad">iPad</option>
                <option value="team_stores">Team Stores</option>
		    </select>
    	</div>
    	<div class="col-md-3">
    		PERSPECTIVE <select class="form-control perspective">
		    	<option value="front">Front</option>
		    	<option value="back">Back</option>
		    	<option value="left">Left</option>
		    	<option value="right">Right</option>
		    </select>
    	</div>
    </div>
    <table class="table table-bordered col-md-12" id="image_table">
    	<thead>
    		<tr>
    			<td>Name</td>
    			<td>Layer Number</td>
    			<td>Setting Type</td>
    			<td>Default Color</td>
    			<td>Allow Pattern <input class="mo-allow-all-pattern" type="checkbox" value="1"></td>
    			<td>Allow Color <input class="mo-allow-all-color" type="checkbox" value="1"></td>
    			<td>Team Color ID</td>
    			<td>Group ID</td>
    			<td>Preview</td>
    		</tr>
    	</thead>
    	<tbody class="material-options-rows">
    	</tbody>
    </table>
    <a href="#" class="btn btn-primary submit-data">Submit</a>
</div>
</div>
</div>
</div>

<div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="progress-modal-message"></h1>
      </div>
    </div>
  </div>
</div>

@endsection
@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/dropzone/dropzone.js"></script>
<script>
$(document).ready(function() {
var files = [];
var filesData = [];
this.addRemoveLinks = true;

function getColors(callback){
    var colors;
    var url = "//" +api_host+ "/api/colors";
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            colors = data['colors'];
            if(typeof callback === "function") callback(colors);
        }
    });
}

function buildSettingTypeDD(name){
	var setting_types = ['shape', 'part', 'piping', 'panel', 'static_layer','highlights', 'shadows', 'body_inside', 'mesh_shadows', 'mesh_highlights'];
	var elem = '<select class="mo-setting-type">';
	setting_types.forEach(function(entry) {
		if(entry == name.toLowerCase()){
            if( name.toLowerCase() == "piping" || name.toLowerCase() == "body_inside" || name.toLowerCase() == "panel" ){
                elem += '<option value="shape" selected>shape</option>';
            } else {
                elem += '<option value="'+entry+'" selected>'+entry+'</option>';
            }
		} else {
            elem += '<option value="'+entry+'">'+entry+'</option>';
		}
	});
	elem += '</select>';
	return elem;
}

function generateColorsDropdown(color_code){
    var colors_dropdown = '';
    $.each(window.colors, function( key, value ) {
        if( color_code == value.color_code){
            colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '" selected>' + value.name + '</option>';
        } else {
            colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '">' + value.name + '</option>';
        }
    });
    return colors_dropdown;
}
function refreshFields(){
    $('.mo-name').keyup(function(){
        refreshJSON();
    });

    $('.mo-setting-type').change(function(){
        refreshJSON();
    });

    $('.mo-layer-number').change(function(){
        refreshJSON();
    });
}

function autoCheck() {
    var type = $('#application_type').val();
        if(type == 'sublimated') {
            $('.mo-allow-all-pattern').prop('checked', true);
            $('.mo-allow-all-color').prop('checked', true);
            $('.mo-allow-all-pattern').trigger('change');
            $('.mo-allow-all-color').trigger('change');
            refreshJSON();
        }
        else if (type == 'tackle_twill') {
            $('.mo-allow--all-pattern').prop('checked', false);
            $('.mo-allow-all-color').prop('checked', true);
            $('.mo-allow-all-pattern').trigger('change');
            $('.mo-allow-all-color').trigger('change');
            refreshJSON();
        }
}

$('.mo-allow-all-pattern').change(function(){
    if($(this).is(':checked')){
        $(".mo-allow-pattern").each(function(i) {
            $(this).prop('checked', true);
        });
    } else {
        $(".mo-allow-pattern").each(function(i) {
            $(this).prop('checked', false);
        });
    }
    refreshJSON();
});



$('.mo-allow-all-color').change(function(){
    if($(this).is(':checked')){
        $(".mo-allow-color").each(function(i) {
            $(this).prop('checked', true);
        });
    } else {
        $(".mo-allow-color").each(function(i) {
            $(this).prop('checked', false);
        });
    }
    refreshJSON();
});

function refreshColorBG(){
    $('.mo-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        $(this).css('color', '#fff');
        $(this).css('text-shadow', '1px 1px #000');
        refreshJSON();
    });
}

$(document).on('change', '.origin, .perspective, .mo-allow-color, .mo-allow-pattern', function() {
	refreshJSON();
});

    var pleaseWait = $('#pleaseWaitDialog');

    showPleaseWait = function() {
        pleaseWait.modal('show');
    };

    hidePleaseWait = function () {
        pleaseWait.modal('hide');
    };

$('.submit-data').on('click', function(e){
	e.preventDefault();
	console.log('submit');

	var data = $('.data-string').val();
    console.log(data);
    showPleaseWait();
    $('.progress-modal-message').html('Saving images . . .');
    var url = "//" +api_host+ "/api/material_options/insert_multiple_from_dropzone";
	$.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        headers: {"accessToken": atob(headerValue)},
        success: function(response){
            if (response.success) {
                console.log(response.message);
                hidePleaseWait();
                showPleaseWait();
                $('.progress-modal-message').html('Images saved successfully.');
                setTimeout(function(){
                    hidePleaseWait();
                }, 1500);
                window.location.reload();
            }
        }
    });
});

function patternCheck() {
     $(".mo-row").each(function(i) {
        var part_name = $(this).find('.mo-name').val();
        if (part_name == 'Highlights' || part_name == 'Shadows' || part_name == 'Extra' || (part_name.match(/Static.*/)) ) {
            $(this).find('.mo-allow-pattern').prop('checked', false);
            $(this).find('.mo-team-color-id').val('');
            $(this).find('.mo-allow-pattern').trigger('change');
        }
    });
}

function refreshJSON(){
 	var data = [];

	$(".mo-row").each(function(i) {
		var allow_pattern = 0;
		var allow_color = 0;

	    if($(this).find('.mo-allow-pattern').is(':checked')){
	        allow_pattern = 1;
	    }
		if($(this).find('.mo-allow-color').is(':checked')){
	        allow_color = 1;
	    }

		data.push({
			'name' : $(this).find('.mo-name').val(),
			'material_option_path' : $(this).data('mo-path'),
			'layer_level' : $(this).find('.mo-layer-number').val(),
			'setting_type' : $(this).find('.mo-setting-type').val(),
			'default_color' : $(this).find('.mo-default-color').val(),
			'team_color_id' : $(this).find('.mo-team-color-id').val(),
			'group_id' : $(this).find('.mo-group-id').val(),
			'perspective' : $('.perspective').val(),
			'origin' : $('.origin').val(),
			'material_id' : $('#material_id').val(),
			'allow_pattern' : allow_pattern,
			'allow_color' : allow_color,
			'colors' : [],
			'sublimated_colors' : []
		});
	});
	console.log(data);
	$('.data-string').val(JSON.stringify(data));
}

function buildRows(filesData){
	$('.material-options-rows').html('');
	$.each(filesData, function(i, entry) {
		window.colors = null;
		getColors(function(colors){ window.colors = colors; });
		var colors_dropdown = generateColorsDropdown();
		var entry_name = entry.name;
		entry_name = entry_name.split(".");
		var split_name = entry.name.split("_");
		var layer_number = split_name[0];
        split_name.shift();
        var zb = split_name.join();
        var zc = zb.split(".");
        zc.pop();
        var zd = zc.join();
		var base_name = entry_name[0].replace("_", " ");

        entry_name = zd;
		entry_name = entry_name.replace(",", " ");
		entry_name = entry_name.replace(",", " ");
		entry_name = entry_name.replace(",", " ");
		entry_name = entry_name.replace(",", " ");
		entry_name = entry_name.replace(",", " ");

		var name = null;
		var arr = entry_name.split(' ');
		var result = "";
	    for (var x=0; x<arr.length; x++){
	        result+=arr[x].substring(0,1).toUpperCase()+arr[x].substring(1)+' ';
	        name = result.substring(0, result.length-1);
	    }
	    name = $.trim(name);
	    var namex = name.replace(" ", "_");

	    var setting_type_dd = buildSettingTypeDD(namex);

        var team_color_id_dd = `<select class="mo-team-color-id">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>`;

		var elem = `<tr class="mo-row" data-mo-path="`+entry.url+`">
						<td><input type="text" class="mo-name" value="`+name+`"></td>
						<td><input type="number" class="mo-layer-number" value="`+layer_number+`"></td>
						<td>`+setting_type_dd+`</td>
						<td><select class="mo-default-color">`+colors_dropdown+`</select></td>
						<td><input class="mo-allow-pattern" type="checkbox" value="1"></td>
						<td><input class="mo-allow-color" type="checkbox" value="1"></td>
						<td>`+team_color_id_dd+`</td>
						<td><input type="number" class="mo-group-id"></td>
						<td style="background-color: gray;"><img src="`+entry.url+`" style="height: 50px; width: 50px;"></td>
					<tr>`;
		$('.material-options-rows').append(elem);
		refreshColorBG();
        refreshFields();
        autoCheck();
        patternCheck();
	});
	refreshJSON();
}

Dropzone.options.myAwesomeDropzone = {
	addRemoveLinks: true,
    success: function(file, response){
        filesData.push({
    		'name' : file.name,
    		'url' : response
    	});
    	buildRows(filesData);
    },
    complete: function(file){
        files.push(file.name);
        hidePleaseWait();
    },
    removedfile: function(file) {
        filesData = filesData.filter(function (e){
            return e.name != file.name;
        });
    	files.splice(files.indexOf(file.name), 1);
	    file.previewElement.remove();
        console.log(files);
	    console.log(filesData);

        buildRows(filesData);
	},
    drop: function(){
        showPleaseWait();
        $('.progress-modal-message').html('Uploading image . . .');
    },
};

});
</script>
@endsection
