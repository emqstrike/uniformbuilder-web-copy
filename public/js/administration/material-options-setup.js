$(document).ready(function() {

	var frontLength = 0;
	var backLength = 0;
	var leftLength = 0;
	var rightLength = 0;

	$( "tbody" ).disableSelection();
    $( "tbody.sortable-items" ).sortable({
        start: function( ) {
            // execute a function here
        },
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

    /* functions */

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