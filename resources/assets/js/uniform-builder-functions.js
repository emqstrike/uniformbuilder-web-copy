$(document).ready(function() { 
	
	// afterLoad function container
	ub.funcs.afterLoadFunctionList = [];

	ub.funcs.executeAfterLoadFunctionList = function () {

		ub.utilities.info('Executing Afterload Functions');
		console.log('');

	    _.each(ub.funcs.afterLoadFunctionList, function (func){
	         func();
	    });

	};

	ub.funcs.addFunctionToAfterloadList = function (func) {

		if (typeof func !== "function") {
			ub.utilities.progError('Argument func must be of type function...');
			return;
		}

		ub.funcs.afterLoadFunctionList.push(func);

	}

});