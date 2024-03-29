$(document).ready(function() {

colors = getColors().colors;

window.random_feed_sets = [
					"Top Welt",
					"Arch",
					"Padding",
					"Body",
					"Toe",
					"Heel",
                    "Ankle Padding"
				];

function buildSetsDropdown(value){
	var dropdown = '<select class="form-control random-feed-set">';
	window.random_feed_sets.forEach(function(entry) {
		if(entry == value){
			dropdown += '<option value="'+entry+'" selected>'+entry+'</option>';
		} else {
			dropdown += '<option value="'+entry+'">'+entry+'</option>';
		}
	});
	return dropdown;
}

$(".global-color").append(globalColorSelector(colors));
	$('.copy-random-feed').on('click', function(e){
		copyToClipboard();
		function copyToClipboard() {
			var data = $('#random_feed_data').val().slice(1, -1).replace(new RegExp("\\\\", "g"), "");
		    $('#ta_random_feed_data').val(data);
		    $('#ta_random_feed_data').show();
		}
	});

	$('.load-random-feed').on('click', function(e){
		var data = $('#ta_load_random_feed').val();
		console.log(data);
	    loadRandomFeeds(data);
	});

	var random_feed_data = $('#random_feed_data').val();

	if(random_feed_data){
		if(random_feed_data != null && random_feed_data != '""'){
			console.log('Has value');
			loadRandomFeeds();
		} else {
			console.log('None');
		}
	}

	function loadRandomFeeds(copydata){
		try{
			var random_feed, x;
			if(!copydata){
				var random_feed_data = $('#random_feed_data').val();
				random_feed = random_feed_data.slice(1, -1);
				random_feed = random_feed.replace(new RegExp("\\\\", "g"), "");
				x = random_feed;
				random_feed = JSON.parse(random_feed);
				console.log(random_feed);
			} else {
				$('.random-feed-content').html('');

				random_feed = JSON.parse(copydata);
				x = random_feed;
			}

			random_feed.forEach(function(entry) {
				console.log(entry);
				var size = entry.size;

			var ischecked = '';
			if(entry.enabled == "1"){
				ischecked = 'checked';
			}

			var pos1checked = '';
			if(entry.color1 == true){
				pos1checked = 'checked';
			}

			var pos2checked = '';
			if(entry.color2 == true){
				pos2checked = 'checked';
			}

			var pos3checked = '';
			if(entry.color3 == true){
				pos3checked = 'checked';
			}

			var selectbox = '<select class="form-control random-feed-size">';
			var random_feed_sizes = ["1/8", "1/4", "1/2"];
			random_feed_sizes.forEach(function(entry) {
				if(entry == size){
					selectbox += '<option value="'+entry+'" selected>'+entry+'</option>';
				} else {
					selectbox += '<option value="'+entry+'">'+entry+'</option>';
				}
			});
			selectbox += '</select>';

			if(!entry.colors_array){
				entry.colors_array = ["","","",];
			}
			if(!entry.team_color_id_array){
				entry.team_color_id_array = ["","","",];
			}

			var set = buildSetsDropdown(entry.set);

			var template = `<table class="table table-striped table-bordered table-hover random-feed-table">
	        <tr>
	        	<td><b>PIPING DETAILS</b></td>
	        	<td colspan="5"><a href="#" class="btn btn-danger pull-right delete-random-feed">Remove</a></td>
	        </tr>
	        <tr>
	    		<td>
	    			<b>SIZE</b>`+selectbox+`</td>
	    		<td>
	    			<b>NAME</b>
	    			<input type="text" class="form-control random-feed-name" value="`+entry.name+`">
	    		</td>
	    		<td>
	    			<b>SET</b>
	    			`
	    			// +entry.set+
	    			+set+
	    			`
	    		</td>
	    		<td></td>
	    		<td></td>
	    		<td>
					<div class="alert alert-info">
	    				<i style="font-size: 30px;">Enable Random Feed</i>
	    				<input type="checkbox" class="random-feed-toggler big-checkbox" value="1" `+ischecked+`>
	    			</div>
	    		</td>
	    	</tr>
	        <tr><th></th><th>TEAM COLOR ID</th><th>FRONT</th><th>BACK</th><th>LEFT</th><th>RIGHT</th></tr>
	        <tbody>
	        	<tr>
	        		<td>
	        			Position 1 <input type="checkbox" class="position-1" value="1" `+pos1checked+`>

	  					`+ getSelectColorTemplate(colors,entry.colors_array[0])  +`
	        		</td>
	        		<td><br><input class="team_color_id_array" type="number" value="`+ entry.team_color_id_array[0] +`"></td>
	        		<td><input type="file" class="file-f-1 image" data-img-url="`+entry.perspectives[0].layers[0].filename+`"></td>
	        		<td><input type="file" class="file-b-1 image" data-img-url="`+entry.perspectives[1].layers[0].filename+`"></td>
	        		<td><input type="file" class="file-l-1 image" data-img-url="`+entry.perspectives[2].layers[0].filename+`"></td>
	        		<td><input type="file" class="file-r-1 image" data-img-url="`+entry.perspectives[3].layers[0].filename+`"></td>
	        	</tr>
	        	<tr>

	        		<td>
	        			Position 2 <input type="checkbox" class="position-2" value="1" `+pos2checked+`>
	        			`+ getSelectColorTemplate(colors,entry.colors_array[1])  +`
	        		</td>
	        		<td><br><input class="team_color_id_array" type="number" value="`+ entry.team_color_id_array[1] +`"></td>
	        		<td><input type="file" class="file-f-2 image" data-img-url="`+entry.perspectives[0].layers[1].filename+`"></td>
	        		<td><input type="file" class="file-b-2 image" data-img-url="`+entry.perspectives[1].layers[1].filename+`"></td>
	        		<td><input type="file" class="file-l-2 image" data-img-url="`+entry.perspectives[2].layers[1].filename+`"></td>
	        		<td><input type="file" class="file-r-2 image" data-img-url="`+entry.perspectives[3].layers[1].filename+`"></td>
	        	</tr>
	        	<tr>
	        		<td>
	        			Position 3 <input type="checkbox" class="position-3" value="1" `+pos3checked+`>
	        			`+ getSelectColorTemplate(colors,entry.colors_array[2])  +`
	        		</td>
	        		<td><br><input class="team_color_id_array" type="number" value="`+ entry.team_color_id_array[2] +`"></td>
	        		<td><input type="file" class="file-f-3 image" data-img-url="`+entry.perspectives[0].layers[2].filename+`"></td>
	        		<td><input type="file" class="file-b-3 image" data-img-url="`+entry.perspectives[1].layers[2].filename+`"></td>
	        		<td><input type="file" class="file-l-3 image" data-img-url="`+entry.perspectives[2].layers[2].filename+`"></td>
	        		<td><input type="file" class="file-r-3 image" data-img-url="`+entry.perspectives[3].layers[2].filename+`"></td>
	        	</tr>
	        </tbody>
	        </table>`;

	        $('.random-feed-content').append(template);


	    	}); // loop closing
	    	deleteRandomFeed();
	    	changeImage();
	    	changeEvent();
	    	refreshJSON();
	    	detectImages();
	    } catch(err){
			console.log(err.message);
		}

	}

 	function deleteRandomFeed(){
 		$('.delete-random-feed').on('click', function(e){
	 		$(this).parent().parent().parent().parent().remove();
	 		refreshJSON();
	 	});
 	}

    $('.add-random-feed').on('click', function(e){
    	e.preventDefault();
    	var selectedFirst = $(".global-color-selector option:selected").eq(0).val();
    	var selectedSecond = $(".global-color-selector option:selected").eq(1).val();
    	var selectedThird = $(".global-color-selector option:selected").eq(2).val();

    	var sets_dropdown = buildSetsDropdown();

        console.log( 'Add Section . . .' );
        var elem = `<table class="table table-striped table-bordered table-hover random-feed-table">
        <tr>
        	<td><b>PIPING DETAILS</b></td>
        	<td colspan="5"><a href="#" class="btn btn-danger pull-right delete-random-feed">Remove</a></td>
        </tr>
        <tr>
    		<td>
    			<b>SIZE</b>
    			<select class="form-control random-feed-size">
    				<option value="1/8">1/8</option>
    				<option value="1/4">1/4</option>
    				<option value="1/2">1/2</option>
    			</select>
    		</td>
    		<td>
    			<b>NAME</b>
    			<input type="text" class="form-control random-feed-name">
    		</td>
    		<td>
    			<b>SET</b>
    			`
    			+sets_dropdown+
    			`
    		</td>
    		<td></td>
    		<td></td>
    		<td>
    			<div class="alert alert-info">
    				<i style="font-size: 30px;">Enable Random Feed</i>
    				<input type="checkbox" class="random-feed-toggler big-checkbox" value="1">
    			</div>
    		</td>
    	</tr>
        <tr><th></th><th>TEAM COLOR ID</th><th>FRONT</th><th>BACK</th><th>LEFT</th><th>RIGHT</th></tr>
        <tbody>
        	<tr>

        		<td>
        			Position 1 <input type="checkbox" class="position-1" value="1">
        			`+ getSelectColorTemplate(colors,selectedFirst)  +`
        		</td>
        		<td><br><input class="team_color_id_array" type="number"></td>
        		<td><input type="file" class="file-f-1 image" data-img-url=""></td>
        		<td><input type="file" class="file-b-1 image" data-img-url=""></td>
        		<td><input type="file" class="file-l-1 image" data-img-url=""></td>
        		<td><input type="file" class="file-r-1 image" data-img-url=""></td>
        	</tr>
        	<tr>

        		<td>
        			Position 2 <input type="checkbox" class="position-2" value="1">
        			`+ getSelectColorTemplate(colors,selectedSecond)  +`
        		</td>
        		<td><br><input class="team_color_id_array" type="number"></td>
        		<td><input type="file" class="file-f-2 image" data-img-url=""></td>
        		<td><input type="file" class="file-b-2 image" data-img-url=""></td>
        		<td><input type="file" class="file-l-2 image" data-img-url=""></td>
        		<td><input type="file" class="file-r-2 image" data-img-url=""></td>
        	</tr>
        	<tr>
        		<td>
        			Position 3 <input type="checkbox" class="position-3" value="1">
        			`+ getSelectColorTemplate(colors,selectedThird)  +`
        		</td>
        		<td><br><input class="team_color_id_array" type="number"></td>
        		<td><input type="file" class="file-f-3 image" data-img-url=""></td>
        		<td><input type="file" class="file-b-3 image" data-img-url=""></td>
        		<td><input type="file" class="file-l-3 image" data-img-url=""></td>
        		<td><input type="file" class="file-r-3 image" data-img-url=""></td>
        	</tr>
        </tbody>
        </table>`;
    	$('.random-feed-content').prepend(elem);
    	deleteRandomFeed();
    	changeImage();
    	changeEvent();
    	refreshJSON();
    	detectImages();

    });

    function detectImages(){
    	$(".image").each(function(i) {
    		var val = $(this).data('img-url');
    		if(val != ""){
    			$(this).removeClass( "alert alert-danger" );
    		} else {
    			console.log('none');
    			$(this).addClass( "alert alert-danger" );
    		}
    	});
    }

    function changeEvent(){
    	$("select").on('change', function() {
    		refreshJSON();
    	});
    	$("input").on('change', function() {
    		refreshJSON();
    	});
    	$("input").keyup(function() {
    		refreshJSON();
    	});
    }

    function refreshJSON(){
    	var data = [];
		$(".random-feed-table").each(function(i) {
			var name = $(this).find('.random-feed-set').val() + " " + $(this).find('.random-feed-size').val()
			$(this).find('.random-feed-name').val(name);
    		var info = {
				"name" : name,
				"size" : $(this).find('.random-feed-size').val(),
				"set" : $(this).find('.random-feed-set').val()
			};
			var cbx = $(this).find('.random-feed-toggler');
			if(cbx.is(":checked")){
				info.enabled = 1;
			} else {
				info.enabled = 0;
			}

			var pos_1 = $(this).find('.position-1');
			if(pos_1.is(":checked")){
				info.color1 = true;
			} else {
				info.color1 = false;
			}

			var pos_2 = $(this).find('.position-2');
			if(pos_2.is(":checked")){
				info.color2 = true;
			} else {
				info.color2 = false;
			}

			var pos_3 = $(this).find('.position-3');
			if(pos_3.is(":checked")){
				info.color3 = true;
			} else {
				info.color3 = false;
			}

			var colors_array = [];
			$( $(this).find(".random-feed-colors option:selected") ).each(function( index ) {
			   colors_array.push($( this ).val());

			});

			info.colors_array = colors_array;

			var team_color_id_array = [];
			$( $(this).find(".team_color_id_array") ).each(function( index ) {
			    team_color_id_array.push($( this ).val());
			});

			info.team_color_id_array = team_color_id_array;

			console.log( 'front file 1: '+ $(this).find('.file-f-1').attr('data-img-url') );

			var perspectives = [];

			var front_perspective = [{
				"position" : 1,
				"filename" : $(this).find('.file-f-1').attr('data-img-url')
			}, {
				"position" : 2,
				"filename" : $(this).find('.file-f-2').attr('data-img-url')
			}, {
				"position" : 3,
				"filename" : $(this).find('.file-f-3').attr('data-img-url')
			}];

			var front_data = {
				"perspective" : "front",
				"layers" : front_perspective
			};

			var back_perspective = [{
				"position" : 1,
				"filename" : $(this).find('.file-b-1').attr('data-img-url')
			}, {
				"position" : 2,
				"filename" : $(this).find('.file-b-2').attr('data-img-url')
			}, {
				"position" : 3,
				"filename" : $(this).find('.file-b-3').attr('data-img-url')
			}];

			var back_data = {
				"perspective" : "back",
				"layers" : back_perspective
			};

			var left_perspective = [{
				"position" : 1,
				"filename" : $(this).find('.file-l-1').attr('data-img-url')
			}, {
				"position" : 2,
				"filename" : $(this).find('.file-l-2').attr('data-img-url')
			}, {
				"position" : 3,
				"filename" : $(this).find('.file-l-3').attr('data-img-url')
			}];

			var left_data = {
				"perspective" : "left",
				"layers" : left_perspective
			};

			var right_perspective = [{
				"position" : 1,
				"filename" : $(this).find('.file-r-1').attr('data-img-url')
			}, {
				"position" : 2,
				"filename" : $(this).find('.file-r-2').attr('data-img-url')
			}, {
				"position" : 3,
				"filename" : $(this).find('.file-r-3').attr('data-img-url')
			}];

			var right_data = {
				"perspective" : "right",
				"layers" : right_perspective
			};

			perspectives.push(front_data);
			perspectives.push(back_data);
			perspectives.push(left_data);
			perspectives.push(right_data);

			info.perspectives = perspectives;
			data.push(info);
    		console.log(JSON.stringify(info));
    	});
    	$('#random_feed').val(JSON.stringify(data));
    }

    function changeImage(){
	    $(".image").change( function() {

	            console.log('uploading');
	            var elem = $(this);
	            console.log(elem);

	            if (this.files && this.files[0]) {

	                var _filename = fileUploadAttachment(this.files[0], elem, function (filename, extension, valid, element) {
	                    if (typeof filename === 'undefined') {

	                        $.smkAlert({text: 'Error Uploading File', type:'warning', time: 3, marginTop: '80px'});
	                        $('span.additional-attachment-message').html('Error Uploading File');

	                        return;

	                    }

	                    if (valid){

	                        console.log('Valid');
	                        console.log(element);
	                        element.attr("data-img-url", filename);
	                        refreshJSON();

	                    } else {

	                        $('span.additional-attachment-message').html('Invalid File Type: ' + extension);
	                        $.smkAlert({text: 'Invalid File Type: ' + extension, type:'warning', time: 3, marginTop: '80px'});
	                        console.log('Invalid');
	                    }


	                });

	            }
	            refreshJSON();
	    });
	}

    fileUploadAttachment = function (file, elem, callback) {

        $('span.ok_btn').attr('data-status', 'processing');
        $('em.unsupported-file').html('');

        var _file = file;
        var formData = new FormData();
        var x = elem;

        formData.append('file', file);

        if (typeof $.ajaxSettings.headers !== "undefined") {
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        }

        $.ajax({

            data: formData,
            url: "//api-dev.qstrike.com/api/fileUpload",
            type: "POST",
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            crossDomain: true,

            success: function (response){

                if(response.success) {

                    var _extension = response.filename.split('.').pop();

                    console.log('success' + response.filename);

                        callback(response.filename, _extension, true, x);

                }
                else {

                    callback(undefined, undefined, undefined);

                }

            }

        });

    }

    function getColors(){
		return $.ajax({
		    type: 'GET',
		    url: "http://api-dev.qstrike.com/api/colors",
		    async: false,
		    dataType: 'json',
		    data: { action : 'getHotelsList' },
		    done: function(results) {
		        // uhm, maybe I don't even need this?
		        // return  results.colors.colors;
		    },
		    fail: function( jqXHR, textStatus, errorThrown ) {
		        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
		    }
		}).responseJSON; // <-- this instead of .responseText
	}

	function getSelectColorTemplate(result,c_code){

     	var template = '<option value="none" style="background:#fff;color:black"selected>None</option>';
     	var selectedColor = "";
     	var fontColor = "black";

    	 result.forEach(function(entry) {
    	 	if(entry.color_code == "W" || entry.color_code == "none" ){
	      			fontColor = "black";
	      			entry.hex_code = "fff";
	      	}else{
	      			fontColor = "white";
	      	}

	      	console.log(fontColor);
	      	if(entry.color_code == c_code){

				template += '<option value="'+ entry.color_code +'" style="background:#'+ entry.hex_code + ';color:'+ fontColor + '" selected>' + entry.name + '</option>';
				selectedColor = entry.hex_code;
			} else {
				template += '<option value='+ entry.color_code +' style="background:#'+ entry.hex_code + ';color:'+ fontColor + '">' + entry.name + '</option>';
			}

		});
    	if(c_code == "W" || c_code == "none" || !c_code){
    		fontColor = "black";
    	}
	    return template = `<select class='form-control random-feed-colors' style="background:#` + selectedColor + `;color:` + fontColor + `">` + template + `</select>`;

	}

	function globalColorSelector(result){
		var template = '<option value="none" style="background:#fff;color:black"selected>None</option>';
     	var selectedColor = "";
     	var fontColor = "black";
		result.forEach(function(entry) {

			if(entry.color_code == "W" || entry.color_code == "none"){
	      			fontColor = "black";
	      			entry.hex_code = "fff";
	      	}else{
	      			fontColor = "white";
	      	}
			template += '<option value='+ entry.color_code +' style="background:#'+ entry.hex_code + ';color:'+ fontColor + '">' + entry.name + '</option>';

		});

		return template = `<select class='form-control global-color-selector' ">` + template + `</select>`;


	}


	 $(document).on('change', '.random-feed-colors', function(){

  		var selectedColorValue = $(this).find("option:selected").attr("style");
  		$(this).attr("style",selectedColorValue);
  	});

	$(document).on('change', '.global-color-selector', function(){
  		var selectedColorValue = $(this).find("option:selected").attr("style");
  		var ind = $(".global-color-selector").index(this);
  		ind++;
  		$(this).attr("style",selectedColorValue);

  		$(".position-"+ ind +" ~ select").val($(this).val()).attr("style",selectedColorValue);
  		refreshJSON();
  	});

});
