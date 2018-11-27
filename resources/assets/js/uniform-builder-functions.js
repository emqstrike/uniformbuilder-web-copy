$(document).ready(function() {
	
	// afterLoad function container
	ub.funcs.afterLoadFunctionList = [];

	ub.funcs.executeAfterLoadFunctionList = function () {

	     _.each(ub.funcs.afterLoadFunctionList, function (func){
	         func();
	    });

	};

});