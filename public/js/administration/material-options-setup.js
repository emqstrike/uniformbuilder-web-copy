$(document).ready(function() {

    // var item_id = $('#item_id').val();

    // getQuestions(function(questions){ window.questions = questions; });

	var frontLength = 0;
	var backLength = 0;
	var leftLength = 0;
	var rightLength = 0;

	$( "tbody" ).disableSelection();
    $( "tbody.sortable-items" ).sortable({
        start: function( ) { },
        stop: function( ) {
            sortLayers();
            listLayers();
        }
    });

    function listLayers(){
        $(".layer").each(function(i) {
            console.log($(this).val());
        });
    }

    countPerspectiveLayers();

    function sortLayers(){
    	try{
	    	sortFront();
	    	sortBack();
	    	sortLeft();
	    	sortRight();
	    } catch(err){
	    	console.log(err.message);
	    }
    }

	$('.name').focus(function() {
        var name = $(this).val().toLowerCase();
        var perspective = $(this).data('perspective');
    	$(".name").each(function(i) {
    		if( $(this).data('perspective') != perspective && $(this).val().toLowerCase() == name ){
    			$(this).fadeOut();
    			$(this).fadeIn();
    		}
		});
    });

    $(document).on('change', '.group-id', function() {
        console.log('changed gid');
        var number = $(this).val();
        var perspective = $(this).data('perspective');
        var name = $(this).data('name').toLowerCase();
        $(".group-id").each(function(i) {
            if( $(this).data('perspective') != perspective && $(this).data('name').toLowerCase() == name ){
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(number);
            }
        });
    });

    $(document).on('change', '.default-color', function() {
        $(this).val($(this).val().toUpperCase());
        var color = $(this).val();
        var perspective = $(this).data('perspective');
        var name = $(this).data('name').toLowerCase();
        $(".default-color").each(function(i) {
            if( $(this).data('perspective') != perspective && $(this).data('name').toLowerCase() == name ){
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(color);
            }
        });
    });

    $(document).on('change', '.allow-pattern', function() {
        console.log('changed allow pattern');
        var pattern = $(this).val();
        var perspective = $(this).data('perspective');
        var name = $(this).data('name').toLowerCase();
        $(".allow-pattern").each(function(i) {
            if( $(this).data('perspective') != perspective && $(this).data('name').toLowerCase() == name ){
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(pattern);
            }
            var part_name = $(this).parent().parent().find('.name').val();
            if (part_name == 'Highlights' || part_name == 'Shadows' || part_name == 'Extra' || (part_name.match(/Static.*/)) ) {
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(0);
                $(this).parent().parent().find('.tcid').val('');
                $(this).parent().parent().find('.tcid').prop('disabled', true);
                $(this).parent().parent().find('.group-id').val('');
                $(this).parent().parent().find('.group-id').prop('disabled', true);
            }
        });


    });

    $(document).on('change', '.tcid', function() {
        var number = $(this).val();
        var color = $(this).parent().parent().find('.default-color').val();
        var perspective = $(this).data('perspective');
        var name = $(this).data('name').toLowerCase();
        $(".tcid").each(function(i) {
            if( $(this).data('perspective') != perspective && $(this).data('name').toLowerCase() == name ){
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(number);
            }
        });
        //Auto set TCID for same color
        $(".default-color").each(function(i) {
            if( $(this).val() == color ) {
                var part_name = $(this).parent().parent().find('.name').val();
                if (part_name != 'Highlights' && part_name != 'Shadows' && part_name != 'Body' && part_name != 'Extra' && !(part_name.match(/Static.*/)) ) {
                    $(this).parent().parent().find('.tcid').fadeOut();
                    $(this).parent().parent().find('.tcid').fadeIn();
                    $(this).parent().parent().find('.tcid').val(number);
                }

            }
        });
    });

    $('.format-names').on('click', function(){
    	formatNames();
    });

    /* functions */     /* */            /* */      /* */            /* */
    /* */               /* */            /* */      /*   */          /* */
    /* */               /* */            /* */      /*     */        /* */
    /* */               /* */            /* */      /*       */      /* */
    /* helpers */       /* */            /* */      /* */  /*  */    /* */
    /* */               /* */            /* */      /* */    /*  */  /* */
    /* */                /* */          /* */       /* */      /*      */
    /* */                 /*  */      /*  */        /* */        /*    */
    /* */                   /*          */          /* */          /*  */

    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    // buildQuestions();

    // function bindQuestions(questions_dropdown){
    //     $(".questions-select").each(function(i) {
    //         $(this).append(questions_dropdown);
    //     });
    // }

    // function buildQuestions(){
    //     var questions_dropdown = '';
    //     $.each(window.questions, function(i, item) {
    //         questions_dropdown += '<option value="' + item.QuestionID + '">' + item.Question + '<option>';
    //     });console.log(questions_dropdown);
    //     bindQuestions(questions_dropdown);
    // }

    function formatNames(){
    	$(".name").each(function(i) {
    		var name = $(this).val();
    		var new_name = name.split("_").join(' ');
    		if( new_name.charAt(0) == ' ' ){
	            new_name = new_name.substr(1);
	        } else if( new_name.charAt(new_name.length - 1) == ' ' ){
	        	new_name = new_name.substr(0, new_name.length - 1);
	        }
	        name = new_name.capitalize();
	        $(this).val(name);
    	});
    }

    function countPerspectiveLayers(){
		$(".front.layer").each(function(i) {
			frontLength++;
		});

		$(".back.layer").each(function(i) {
			backLength++;
		});

		$(".left.layer").each(function(i) {
			leftLength++;
		});

		$(".right.layer").each(function(i) {
			rightLength++;
		});
	}

    function topLayers(thisObj, length){
    	var name = thisObj.next().val().toLowerCase();
		// console.log( "Name: " + name );
    	if ( name == "highlights" ) {
            thisObj.val('99');
        } else if( name == "shadows" ){
            thisObj.val('98');
        } else if( name == "locker tag" ){
            thisObj.val('97');
        } else if( name == "prolook" ){
            thisObj.val('96');
        } else if( name == "guide" ){
            thisObj.val('95');
        } else if( name == "pro-dry" ){
            thisObj.val('90');
        } else {
               thisObj.val(parseInt(length));
        }
    }

    function sortFront(){
    	var length = frontLength;
    	$(".front.layer").each(function(i) {
    		topLayers($(this), length);
    		length--;
    	});
    }

    function sortBack(){
    	var length = backLength;
    	$(".back.layer").each(function(i) {
    		topLayers($(this), length);
    		length--;
    	});
    }

    function sortLeft(){
    	var length = leftLength;
    	$(".left.layer").each(function(i) {
    		topLayers($(this), length);
    		length--;
    	});
    }

    function sortRight(){
    	var length = rightLength;
    	$(".right.layer").each(function(i) {
    		topLayers($(this), length);
    		length--;
    	});
    }

    // function getQuestions(callback){
    //     var questions;
    //     var url = "http://qx.azurewebsites.net/api/itemquestion/getitemquestions/" + item_id;
    //     $.ajax({
    //         url: url,
    //         async: false,
    //         type: "GET",
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         success: function(data){
    //             questions = data;
    //             if(typeof callback === "function") callback(questions);
    //         }
    //     });
    // }
        $('.delete-multiple-material-option').on('click', function(){
        var checkedMaterialOptionsIDs = [];
        $('input[type=checkbox]:checked').each(function () {
            if($(this).hasClass("delete-multiple-material-options")){
                checkedMaterialOptionsIDs.push($(this).val());
            }

        });
        console.log(checkedMaterialOptionsIDs);
        modalConfirm(
            'Remove Multiple Material Options',
            'Are you sure you want to delete the following Material Options? : '+ checkedMaterialOptionsIDs +'?',
            checkedMaterialOptionsIDs,
            'confirm-yes',
            'confirmation-modal-multiple-material-option'
        );
    });

    $('#confirmation-modal-multiple-material-option .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material_option/deleteMultiple/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(id),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal-multiple-material-option').modal('hide');
                }



                window.location.reload(true);
            }
        });
    });

});
