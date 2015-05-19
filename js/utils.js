Utils = {};

//utils functions
Utils.fillMaterial = function($object, material) {
	
	
		console.log('########');
		console.log('invoked fillmaterials');
		console.log('########');
	
	if(!colors[material]){
		
		//if not a color, fill with the material texture
		
		console.log('########');
		console.log('not a color');
		console.log('########');
	
		var style = 'fill-opacity: 1; fill:url("'+material+'")';
		
	}
	else{
	
		console.log('########');
		console.log('a color');
		console.log('########');
	
		var style = 'fill-opacity: 0; fill:#ffffff';
		
	}
	
	$object.attr('style', style);	
	
};
