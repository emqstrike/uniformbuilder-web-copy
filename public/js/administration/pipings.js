$(document).ready(function() {

	var pipings_data = $('#pipings_data').val();

	if(pipings_data){
		if(pipings_data != null && pipings_data != '""'){
			console.log('Has value');
			loadPipings();
		} else {
			console.log('None');
		}
	}

	// String.prototype.stripSlashes = function(){
	//     return this.replace(/\\(.)/mg, "$1");
	// }

	function loadPipings(){
		// load pipings information
		var pipings_data = $('#pipings_data').val();
		var pipings = pipings_data.slice(1, -1);
		pipings = pipings.replace(new RegExp("\\\\", "g"), "");
		var x = pipings;
		pipings = JSON.parse(pipings);
		// console.log( pipings[0] );
		pipings.forEach(function(entry) {
			console.log(entry);
			var size = entry.size;
		

		// var array = $.map(pipings, function(value, index) {
		//     return [value];
		// });

		// for (var i = 0, len = array.length; i < len; i++) {
		// 	console.log('Array: ' + array[i].name);
		// }

		// console.log(array);

		var selectbox = '<select class="form-control piping-size">';
		var piping_sizes = ["1/8", "1/4", "1/2"];
		piping_sizes.forEach(function(entry) {
			if(entry == size){
				selectbox += '<option value="'+entry+'" selected>'+entry+'</option>';
			} else {
				selectbox += '<option value="'+entry+'">'+entry+'</option>';
			}
		});
		selectbox += '</select>';

		var template = `<table class="table table-striped table-bordered table-hover piping-table">
        <tr>
        	<td colspan="5"><a href="#" class="btn btn-danger pull-right delete-piping">Remove</a></td>
        </tr>
        <tr>
    		<td><b>PIPING DETAILS</b></td>
    		<td>
    			<b>SIZE</b>`+selectbox+`</td>
    		<td>
    			<b>NAME</b>
    			<input type="text" class="form-control piping-name" value="`+entry.name+`">
    		</td>
    		<td>
    			<b>SET</b>
    			<input type="text" class="form-control piping-set" value="`+entry.set+`">
    		</td>
    		<td></td>
    	</tr>
        <tr><th></th><th>FRONT</th><th>BACK</th><th>LEFT</th><th>RIGHT</th></tr>
        <tbody>
        	<tr>
        		<td>Position 1</td>
        		<td><input type="file" class="file-f-1 image" data-img-url="`+entry.perspectives[0].layers[0].filename+`"></td>
        		<td><input type="file" class="file-b-1 image" data-img-url="`+entry.perspectives[1].layers[0].filename+`"></td>
        		<td><input type="file" class="file-l-1 image" data-img-url="`+entry.perspectives[2].layers[0].filename+`"></td>
        		<td><input type="file" class="file-r-1 image" data-img-url="`+entry.perspectives[3].layers[0].filename+`"></td>
        	</tr>
        	<tr>
        		<td>Position 2</td>
        		<td><input type="file" class="file-f-2 image" data-img-url="`+entry.perspectives[0].layers[1].filename+`"></td>
        		<td><input type="file" class="file-b-2 image" data-img-url="`+entry.perspectives[1].layers[1].filename+`"></td>
        		<td><input type="file" class="file-l-2 image" data-img-url="`+entry.perspectives[2].layers[1].filename+`"></td>
        		<td><input type="file" class="file-r-2 image" data-img-url="`+entry.perspectives[3].layers[1].filename+`"></td>
        	</tr>
        	<tr>
        		<td>Position 3</td>
        		<td><input type="file" class="file-f-3 image" data-img-url="`+entry.perspectives[0].layers[2].filename+`"></td>
        		<td><input type="file" class="file-b-3 image" data-img-url="`+entry.perspectives[1].layers[2].filename+`"></td>
        		<td><input type="file" class="file-l-3 image" data-img-url="`+entry.perspectives[2].layers[2].filename+`"></td>
        		<td><input type="file" class="file-r-3 image" data-img-url="`+entry.perspectives[3].layers[2].filename+`"></td>
        	</tr>
        </tbody>
        </table>`;

        $('.pipings-content').append(template);
    	}); // loop closing
    	deletePiping();
    	changeImage();
    	changeEvent();
    	refreshJSON();
    	detectImages();
	}

	// http://localhost:81/administration/material/92/pipings


	// getPipings(function(pipings){ window.pipings = pipings; });

	// function getPipings(callback){ // get Pipings
 //        var pipings;
 //        var id = 92;
 //        var url = "//api-dev.qstrike.com/api/material/"+id+"/pipings";
 //        $.ajax({
 //            url: url,
 //            async: false,
 //            type: "GET",
 //            dataType: "json",
 //            crossDomain: true,
 //            contentType: 'application/json',
 //            success: function(data){
 //                pipings = data['pipings'];
 //                if(typeof callback === "function") callback(pipings);
 //            }
 //        });
 //    }

 //    function bindImages(data){

 //    }
 
 	function deletePiping(){
 		$('.delete-piping').on('click', function(e){
	 		$(this).parent().parent().parent().parent().remove();
	 		refreshJSON();
	 	});
 	}

    $('.add-piping').on('click', function(e){
    	e.preventDefault();
        console.log( 'Add Section . . .' );
        var elem = `<table class="table table-striped table-bordered table-hover piping-table">
        <tr>
        	<td colspan="5"><a href="#" class="btn btn-danger pull-right delete-piping">Remove</a></td>
        </tr>
        <tr>
    		<td><b>PIPING DETAILS</b></td>
    		<td>
    			<b>SIZE</b>
    			<select class="form-control piping-size">
    				<option value="1/8">1/8</option>
    				<option value="1/4">1/4</option>
    				<option value="1/2">1/2</option>
    			</select>
    		</td>
    		<td>
    			<b>NAME</b>
    			<input type="text" class="form-control piping-name">
    		</td>
    		<td>
    			<b>SET</b>
    			<input type="text" class="form-control piping-set">
    		</td>
    		<td></td>
    	</tr>
        <tr><th></th><th>FRONT</th><th>BACK</th><th>LEFT</th><th>RIGHT</th></tr>
        <tbody>
        	<tr>
        		<td>Position 1</td>
        		<td><input type="file" class="file-f-1 image" data-img-url=""></td>
        		<td><input type="file" class="file-b-1 image" data-img-url=""></td>
        		<td><input type="file" class="file-l-1 image" data-img-url=""></td>
        		<td><input type="file" class="file-r-1 image" data-img-url=""></td>
        	</tr>
        	<tr>
        		<td>Position 2</td>
        		<td><input type="file" class="file-f-2 image" data-img-url=""></td>
        		<td><input type="file" class="file-b-2 image" data-img-url=""></td>
        		<td><input type="file" class="file-l-2 image" data-img-url=""></td>
        		<td><input type="file" class="file-r-2 image" data-img-url=""></td>
        	</tr>
        	<tr>
        		<td>Position 3</td>
        		<td><input type="file" class="file-f-3 image" data-img-url=""></td>
        		<td><input type="file" class="file-b-3 image" data-img-url=""></td>
        		<td><input type="file" class="file-l-3 image" data-img-url=""></td>
        		<td><input type="file" class="file-r-3 image" data-img-url=""></td>
        	</tr>
        </tbody>
        </table>`;
    	$('.pipings-content').append(elem);
    	deletePiping();
    	changeImage();
    	changeEvent();
    	refreshJSON();
    	detectImages();
    });

    function detectImages(){
    	$(".image").each(function(i) {
    		// console.log($(this).data('img-url'));
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
    	$("input").keyup(function() {
    		refreshJSON();
    	});
    }

    function refreshJSON(){
    	var data = [];
		$(".piping-table").each(function(i) {
    		var info = {
				"name" : $(this).find('.piping-name').val(),
				"size" : $(this).find('.piping-size').val(),
				"set" : $(this).find('.piping-set').val()
			};
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
    	$('#pipings').val(JSON.stringify(data));
    }

    function changeImage(){
	    $(".image").change( function() {

	            // ub.data.uploading = true;
	            // ub.data.orderAttachment = "";
	            // $('span.additional-attachment-message').html('Uploading...' + '<img src="/images/loading.gif" />');
	            console.log('uploading');
	            var elem = $(this);
	            console.log(elem);

	            if (this.files && this.files[0]) {

	                // var _filename = ub.funcs.fileUploadAttachment(this.files[0], function (filename, extension, valid) {
	                var _filename = fileUploadAttachment(this.files[0], elem, function (filename, extension, valid, element) {
	                    if (typeof filename === 'undefined') {

	                        $.smkAlert({text: 'Error Uploading File', type:'warning', time: 3, marginTop: '80px'});
	                        $('span.additional-attachment-message').html('Error Uploading File');

	                        return;

	                    }

	                    if (valid){

	                        // ub.data.orderAttachment = filename;
	                        // $('span.additional-attachment-message').html('Upload ok! Please click on the [Continue] button to proceed.');
	                        console.log('Valid');
	                        console.log(element);
	                        element.attr("data-img-url", filename);
	                        refreshJSON();

	                    } else {

	                        $('span.additional-attachment-message').html('Invalid File Type: ' + extension);
	                        $.smkAlert({text: 'Invalid File Type: ' + extension, type:'warning', time: 3, marginTop: '80px'});
	                        console.log('Invalid');
	                    }

	                    // ub.data.uploading = false;


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
            // headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response){

                if(response.success) {

                    var _extension = response.filename.split('.').pop();

                    console.log('success' + response.filename);
                    // return response.filename;

                    // if (ub.data.validDocumentTypesForUpload.isValidDocument(_extension)) {

                        callback(response.filename, _extension, true, x);

                    // } else {

                    //     callback(response.filename, _extension, false);

                    // }

                }
                else {

                    callback(undefined, undefined, undefined);

                }

            }

        });

    }

});