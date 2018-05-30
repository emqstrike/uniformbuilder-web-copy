window.accents_url = '//'+api_host+'/api/accents';
window.block_patterns_url = '//'+api_host+'/api/block_patterns';
window.fonts_url = '//'+api_host+'/api/fonts';
window.mascots_url = '//'+api_host+'/api/mascots';
window.patterns_url = '//'+api_host+'/api/patterns';
window.price_item_templates_url = '//'+api_host+'/api/price_item_templates';
window.sports_categories_url = '//'+api_host+'/api/categories';
window.style_request_priorities = [{
									'name' : 'low',
									'id' : 'low'},
									{
									'name' : 'mid',
									'id' : 'mid'},
									{
									'name' : 'high',
									'id' : 'high'}];

function setDatabyActiveCategory(){

	if(loaded_fonts){
		var filtered_fonts = [];
		fonts.forEach(function(e) {
			if(e.sports != null){
				var sports = e.sports;

				if(sports.indexOf(active_category_name) !== -1){ filtered_fonts.push(e); }
			}
		});

		if(filtered_fonts.length > 0){
			populateSelectElem(filtered_fonts, 'name', 'id', '.rules-fonts');
		}
		console.log(filtered_fonts.length);
	}

	if(loaded_patterns){
		var filtered_patterns = [];
		patterns.forEach(function(e) {
			if(e.sports != null){
				var sports = e.sports;

				if(sports.indexOf(active_category_name) !== -1){ filtered_patterns.push(e); }
			}
		});

		if(filtered_patterns.length > 0){
			populateSelectElem(filtered_patterns, 'name', 'id', '.rules-patterns');
		}
		console.log(filtered_patterns.length);
	}
}

function updateBPOdd(data, selected_bp_id, bpo_class){ // Populate block pattern options dropdown based on block pattern selected
	var selected_block_pattern = _.find(data, function(e){ return e.id == selected_bp_id; });
	var block_pattern_options = JSON.parse(selected_block_pattern.neck_options);
	var bpos = [];

	Object.keys(block_pattern_options).forEach(function(key,index) {
		bpos.push(block_pattern_options[key]);
	});
	$(bpo_class).html('');
	bpos.forEach(function(e) {
		$(bpo_class).append('<option value="'+e.name+'">'+e.name+'</option>');
	});
}

function populateDDwithNums(dd_class, length){
	for(i = 1; i <= length; i++){
	    $(dd_class).append('<option value="'+i+'">'+i+'</option>');
	}
}

function buildPITTable(data, tbody_id){ // CUSTOM -> USED IN STYLES REQUEST PAGE
	$(tbody_id).html('');
	var elem = '';
	var properties = JSON.parse(data.properties);
	console.log(properties);
	var inner_properties = properties.properties;
	console.log(inner_properties);
	var adult_sizes = inner_properties.adult;
	var youth_sizes = inner_properties.youth;
	if(adult_sizes){
		adult_sizes.forEach(function(e) {
			elem += '<tr><td>'+e.size+'</td><td>'+e.price_item+'</td><td>'+e.msrp+'</td><td>'+e.web_price_sale+'</td><td></tr>';
		});
	}
	if(youth_sizes){
		youth_sizes.forEach(function(e) {
			elem += '<tr><td>'+e.size+'</td><td>'+e.price_item+'</td><td>'+e.msrp+'</td><td>'+e.web_price_sale+'</td><td></tr>';
		});
	}
	$(tbody_id).append(elem);
}

function populateSelectElem(data, option_text, option_val, dd_class){
	$(dd_class).html('');
	var elem = '';
	data.forEach(function(e) {
		elem += '<option value="'+e[option_val]+'">'+capitalizeFirstLetter(e[option_text])+'</option>';
	});
	$(dd_class).append(elem);
	console.log('populate select elem');
}

function initSelect2(dd_class, placeholder_message){
	$(dd_class).select2({
		placeholder: placeholder_message,
		multiple: true,
		allowClear: true
	});
}

function getDataFromAPI(url, result_text){
	window.gdfapi_url = url;
	window.gdfapi_result_text = result_text;
	getDataCallback(function(data){ window[result_text] = data; });
}

function getDataSyncAs(url, result_text, as_case, name, id, elem_class){
	$.ajax({
		url: url,
		async: as_case,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json', 
        success: function(data) {
            window[result_text] = data[result_text];
            console.log(window[result_text]);
            populateSelectElem(window[result_text], name, id, elem_class);
            $('#loadingModal').modal('hide');
        }
    });
}

function getDataCallback(callback){
	var data;
    var url = window.gdfapi_url;
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            data = data[gdfapi_result_text];
            if(typeof callback === "function") callback(data);
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showLoadingModal(){
	$('#loadingModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function setLoadingModalText(text){
	$('.modal-text-body').text(text);
}