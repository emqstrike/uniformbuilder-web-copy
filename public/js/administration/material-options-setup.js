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
	    	sortBack();
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
        console.log('changed default color');
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
        var color = $(this).val();
        var perspective = $(this).data('perspective');
        var name = $(this).data('name').toLowerCase();
        $(".allow-pattern").each(function(i) {
            if( $(this).data('perspective') != perspective && $(this).data('name').toLowerCase() == name ){
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(color);
            }
        });
    });

    $(document).on('change', '.tcid', function() {
        console.log('changed gid');
        var number = $(this).val();
        var perspective = $(this).data('perspective');
        var name = $(this).data('name').toLowerCase();
        $(".tcid").each(function(i) {
            if( $(this).data('perspective') != perspective && $(this).data('name').toLowerCase() == name ){
                $(this).fadeOut();
                $(this).fadeIn();
                $(this).val(number);
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
		} else {
			thisObj.val( parseInt(length) );
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

});