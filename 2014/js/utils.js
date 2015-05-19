Utils = {};



//utils functions
Utils.fillMaterial = function($object, material) {
	
	if(material == "none") {
		$object.css('fill-opacity', '0').css('fill', 'none');
	}
	else {
		$object.css('fill-opacity', '1').css('fill', 'url(#'+material+')');
		var style = $object.attr('style');
		
	  	style = style.replace("fill: #" + material, "fill: url(#"+material+")");
	  	$object.attr('style', style);	
	}
	
};
