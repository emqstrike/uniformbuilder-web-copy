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
window.qstrike_item_url = 'http://qx.azurewebsites.net/api/item?itemid=';

function sortArr(data, category_case, data_field){ // filter by category id or name
	var filtered_data = [];
	data.forEach(function(e) {
		if(e[data_field] != null){
			var x = e[data_field];
			if(x.indexOf(category_case) !== -1){ filtered_data.push(e); }
		}
	});
	return filtered_data;
}

function validateActiveCategorySport(loaded_data_cond, data, ddclass){
	if(loaded_data_cond && data != null){
		var filtered_data = [];
		data.forEach(function(e) {
			if(e.sports != null){
				var sports = e.sports;
				if(sports.indexOf(active_category_name) !== -1){ filtered_data.push(e); }
			}
		});

		if(filtered_data.length > 0){
			populateSelectElem(filtered_data, 'name', 'id', ddclass, true);
		}
		console.log(filtered_data.length);
	}
}

function validateActivSportCatID(loaded_data_cond, data, ddclass){
	if(loaded_data_cond && data != null){
		var filtered_data = [];
		data.forEach(function(e) {
			if(e.sport_category_id != null){
				var sport_category_id = e.sport_category_id;

				if(sport_category_id == active_category_id){ filtered_data.push(e); }
			}
		});

		if(filtered_data.length > 0){
			populateSelectElem(filtered_data, 'name', 'id', ddclass, true);
		}
		console.log(filtered_data.length);
		console.log(filtered_data);
	}
}

function validateActiveCategoryUCID(loaded_data_cond, data, ddclass){
	if(loaded_data_cond && data != null){
		var filtered_data = [];
		data.forEach(function(e) {
			if(e.uniform_category_id != null){
				var uniform_category_id = e.uniform_category_id;

				if(uniform_category_id == active_category_id){ filtered_data.push(e); }
			}
		});

		if(filtered_data.length > 0){
			populateSelectElem(filtered_data, 'name', 'id', ddclass, true);
		}
		console.log(filtered_data.length);
		console.log(filtered_data);
	}
}

function setDatabyActiveCategory(){
	if(loaded_fonts){
		validateActiveCategorySport(loaded_fonts, fonts, '.rules-fonts');
	}

	if(loaded_patterns){
		validateActiveCategorySport(loaded_patterns, patterns, '.rules-patterns');
	}

	if(loaded_block_patterns){
		validateActiveCategoryUCID(loaded_block_patterns, block_patterns, '.rules-bp');
	}

	if(loaded_price_item_templates){
		validateActivSportCatID(loaded_price_item_templates, price_item_templates, '.rules-pi-template');
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

function populateDDwithNums(dd_class, min, max){
	for(i = min; i <= max; i++){
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

function repopulateElem(data, option_text, option_val, dd_class){
	console.log('[[ repopulate ELEM ]]');
	$(dd_class).html('');
	var elem = '';
	data = _.sortBy(data, function(e){ return e.name; });
	console.log('Active category name');
	console.log(active_category_name);
	var filtered_data = [];
	if(window.currentActivity == "price_item_templates"){
		data.forEach(function(e) {
	        if(e.sport_category_id != null){
	            var sport_category_id = e.sport_category_id;
	            if(sport_category_id == active_category_id){ filtered_data.push(e); }
	        }
	    });
	} else if(window.currentActivity == "fonts" || window.currentActivity == "patterns"){
		data.forEach(function(e) {
	        if(e.sports != null){
	            var sports = e.sports;
	            if(sports.indexOf(active_category_name) !== -1){ filtered_data.push(e); }
	        }
	    });
	} else {
		filtered_data = data;
	}

	filtered_data.forEach(function(e) {
		elem += '<option value="'+e[option_val]+'">'+capitalizeFirstLetter(e[option_text])+'</option>';
	});
	$(dd_class).append(elem);
}

function populateSelectElem(data, option_text, option_val, dd_class, sort_cond){
	active_category_id = $(".style-category").val();
    active_category_name = $(".style-category option:selected").text();
	$(dd_class).html('');
	var elem = '';
	if(sort_cond){
		data = _.sortBy(data, function(e){ return e.name; });
	}
	data.forEach(function(e) {
		elem += '<option value="'+e[option_val]+'">'+capitalizeFirstLetter(e[option_text])+'</option>';
	});
	$(dd_class).append(elem);
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

function getDataSyncAs(url, result_text, as_case, name, id, elem_class, repopulate = false){
	$.ajax({
		url: url,
		async: as_case,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data) {
            window[result_text] = data[result_text];
            try{
            	sortArr(window[result_text], active_category_name, 'sports');
            } catch(err){
            	console.log(err.message);
            }
            populateSelectElem(window[result_text], 'name', 'id', elem_class, true);
            if(repopulate){
            	repopulateElem(window[result_text], 'name', 'id', elem_class, true);
            }
            $('#loadingModal').modal('hide');
        }
    });
}

function getDataCallback(callback){
	console.log('getDataCallback');
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
        	console.log(data);
            data = data[gdfapi_result_text];
            console.log(data);
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

function setCurrentActivity(currentactivity){
	window.currentActivity = currentactivity;
}

function getQStrikeItemData(item_id){
	$.ajax({
		url: qstrike_item_url+item_id,
		async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data) {
            if(data.length > 0){
            	$('#qiid').removeClass("glyphicon-question-sign");
            	$('#qiid').addClass("glyphicon-ok");
            	$('#qiid_div').removeClass("alert-danger");
            	$('#qiid_div').addClass("alert-success");
            } else {
            	$('#qiid').removeClass("glyphicon-ok");
            	$('#qiid').addClass("glyphicon-remove");
            	$('#qiid_div').removeClass("alert-success");
            	$('#qiid_div').addClass("alert-danger");
            }

            if($('.style-qstrike-item-id').val().length < 1){
            	$('#qiid_div').removeClass("alert-success");
            	$('#qiid_div').addClass("alert-danger");
            	$('#qiid').removeClass("glyphicon-ok");
            	$('#qiid').removeClass("glyphicon-remove");
            	$('#qiid').removeClass("glyphicon-question-sign");
            }
        }
    });
}