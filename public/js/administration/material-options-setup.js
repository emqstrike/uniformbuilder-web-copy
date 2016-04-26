$(document).ready(function() {

	var frontLength = 0;
	var backLength = 0;
	var leftLength = 0;
	var rightLength = 0;

	$( "tbody" ).disableSelection();
    $( "tbody.sortable-items" ).sortable({
        start: function( ) { },
        stop: function( ) {
            sortLayers();
        }
    });

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
		console.log( "Name: " + name );
    	if ( name == "highlights" ) {
			thisObj.val('99');
		} else if( name == "shadows" ){
			thisObj.val('98');
		} else {
			thisObj.val( length );
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

});