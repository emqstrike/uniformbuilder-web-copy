$(document).ready(function() {

	window.au.initialize = function () {									

		window.au.config.api_host = '//api-dev.qstrike.com';

		au.endpoints.accents_url = window.au.config.api_host + '/api/accents/';
		au.endpoints.colors_url = window.au.config.api_host + '/api/colors/';
		au.endpoints.fonts_url = window.au.config.api_host + '/api/fonts/';
		au.endpoints.mascots_url = window.au.config.api_host + '/api/mascots/';
		au.endpoints.materials_url = window.au.config.api_host + '/api/materials/';
		au.endpoints.patterns_url = window.au.config.api_host + '/api/patterns/';
		au.endpoints.tailsweeps_url = window.au.config.api_host + '/api/tailsweeps/';
	}

	window.au.util = {
		escapeSingleQuotes: function (jsonString) {
			return jsonString.replace(/(['])/g, "\\$1");
		},
		stringifyThenJSONParse: function (jsonObject) {
			return JSON.parse(JSON.stringify(jsonObject));
		}
	};

	au.applications.events = function(){

		/*
			Load application template
		*/
		$(document).on('click','.load-applications-template',function(){
	        // console.log($("#filter_app_template").val());
	        var str2 = $("#filter_app_template").val();
	        str2 = str2.split(' ');
	        // console.log(str2);
	        $( ".load-applications-template option" ).hide();

	        $.each(str2, function( index, value ) {
	           $( ".load-applications-template option" ).each(function( index ) {
	              var str1 = $( this ).text().toLowerCase();

	                if(str1.indexOf(value) != -1){
	                    $(this).show();
	                }
	            });
	        });
	    });

		/*
			Application Default Font
		*/
	    $(document).on('click', '.app-default-font', function() {

	        var Sports = $("#material_uniform_category").val();
	        $(".app-default-font option").hide();
	        $(this).find("option:first-child").show();

	        $(this).find("option").each(function( index ) {
		        var stringSport = JSON.stringify($(this).data("sport"));
		        stringSport = "" +stringSport+ "";
	            if (stringSport.indexOf(Sports) > -1){
	                 $(this).show();
	                 // console.log("");
	            }
	        }); 
        });

        /*
			Update Applications JSON
        */
        $(document).on('click', '.update-applications-json', function() {
	        u.applications.update_applications_json();
	    });
	}

	au.applications.initFrontCanvas = function(){
		var canvasFront = this.__canvas = new fabric.Canvas('applications-front-canvas');
	}

	au.applications.update_applications_json = function(){
	    var multiplier = 2;
	    applicationProperties = {};
	    cx = 0;
	    $(".app-rotation").each(function(i) {

	        itemIdx = "layer"+$(this).data('id');
	        layer = $(this).data('id');

	        var rotation_val = $(this).val();

	        thisGroup = canvasFront.item(layer);
	        applicationType = $(this).parent().siblings('td').find("select[class=app-def-item]").val();
	        applicationName = $(this).parent().siblings('td').find("input[class=app-def-name]").val();
	        applicationId = $(this).parent().siblings('td').find("input[class=app-id]").val();

	        isPrimary = $(this).parent().siblings('td').find("input[class=app-primary]");
	        hasLogo = $(this).parent().siblings('td').find("input[class=app-logo]");
	        hasTeamName = $(this).parent().siblings('td').find("input[class=app-team-name]");
	        hasPlayerName = $(this).parent().siblings('td').find("input[class=app-player-name]");
	        hasNumber = $(this).parent().siblings('td').find("input[class=app-number]");
	        fontSizes = $(this).parent().siblings('td').find("input[class=app-font-sizes]").val();
	        uniformSizes = $(this).parent().siblings('td').find("input[class=app-uniform-sizes]").val();
	        verticalText = $(this).parent().siblings('td').find("input[class=app-vertical-text]");
	        rotatedTailsweep = $(this).parent().siblings('td').find("input[class=app-rotated-tailsweep]");

	        applicationFont = $(this).parent().siblings('td').find("select[class=app-default-font]").val();
	        applicationText = $(this).parent().siblings('td').find("input[class=app-default-text]").val();
	        applicationNumber = $(this).parent().siblings('td').find("input[class=app-default-number]").val();

	        applicationColors = $(this).parent().siblings('td').find("input[class=app-colors]").val();
	        applicationAccents = $(this).parent().siblings('td').find(".dd-selected-value").val();
	        applicationMascot = $(this).parent().siblings('td.msc').find(".dd-selected-value").val();
	        applicationTailsweep = $(this).parent().siblings('td.tsc').find(".dd-selected-value").val();

	        // console.log('ACCENT >>>>>>' + applicationAccents);
	        // console.log('MASCOT >>>>>>' + applicationMascot);
	        // console.log('TAILSWEEP >>>>>>' + applicationTailsweep);
	        fontData = window.fontData;

	        if(isPrimary.prop( "checked" )){
	            isPrimary = 1;
	        } else {
	            isPrimary = 0;
	        }

	        if(hasLogo.prop( "checked" )){
	            hasLogo = 1;
	        } else {
	            hasLogo = 0;
	        }

	        if(hasTeamName.prop( "checked" )){
	            hasTeamName = 1;
	        } else {
	            hasTeamName = 0;
	        }

	        if(hasPlayerName.prop( "checked" )){
	            hasPlayerName = 1;
	        } else {
	            hasPlayerName = 0;
	        }

	        if(verticalText.prop( "checked" )){
	            verticalText = 1;
	        } else {
	            verticalText = 0;
	        }

	        if(rotatedTailsweep.prop( "checked" )){
	            rotatedTailsweep = 1;
	        } else {
	            rotatedTailsweep = 0;
	        }

	        if(hasNumber.prop( "checked" )){
	            hasNumber = 1;
	        } else {
	            hasNumber = 0;
	        }

	        var topLeftX = thisGroup.oCoords.tl.x * multiplier;
	        var topLeftY = thisGroup.oCoords.tl.y * multiplier;
	        var topRightX = thisGroup.oCoords.tr.x * multiplier;
	        var topRightY = thisGroup.oCoords.tr.y * multiplier;
	        var bottomLeftX = thisGroup.oCoords.bl.x * multiplier;
	        var bottomLeftY = thisGroup.oCoords.bl.y * multiplier;
	        var bottomRightX = thisGroup.oCoords.br.x * multiplier;
	        var bottomRightY = thisGroup.oCoords.br.y * multiplier;
	        var mascot_offset = 3;

	        canvas.renderAll();

	        applicationProperties[itemIdx] = {};
	        applicationProperties[itemIdx]['type'] = {};
	        applicationProperties[itemIdx]['name'] = {};
	        applicationProperties[itemIdx]['id'] = {};
	        applicationProperties[itemIdx]['layerOrder'] = {};
	        applicationProperties[itemIdx]['topLeft'] = {};
	        applicationProperties[itemIdx]['topLeft']['x'] = {};
	        applicationProperties[itemIdx]['topLeft']['y'] = {};
	        applicationProperties[itemIdx]['topRight'] = {};
	        applicationProperties[itemIdx]['topRight']['x'] = {};
	        applicationProperties[itemIdx]['topRight']['y'] = {};
	        applicationProperties[itemIdx]['bottomLeft'] = {};
	        applicationProperties[itemIdx]['bottomLeft']['x'] = {};
	        applicationProperties[itemIdx]['bottomLeft']['y'] = {};
	        applicationProperties[itemIdx]['bottomRight'] = {};
	        applicationProperties[itemIdx]['bottomRight']['x'] = {};
	        applicationProperties[itemIdx]['bottomRight']['y'] = {};
	        applicationProperties[itemIdx]['isPrimary'] = {};
	        applicationProperties[itemIdx]['hasLogo'] = {};
	        applicationProperties[itemIdx]['hasTeamName'] = {};
	        applicationProperties[itemIdx]['hasPlayerName'] = {};
	        applicationProperties[itemIdx]['hasNumber'] = {};
	        applicationProperties[itemIdx]['fontSizes'] = {};
	        applicationProperties[itemIdx]['uniformSizes'] = {};
	        applicationProperties[itemIdx]['verticalText'] = {};
	        applicationProperties[itemIdx]['rotatedTailsweep'] = {};

	        applicationProperties[itemIdx]['defaultMascot'] = {};
	        applicationProperties[itemIdx]['defaultFont'] = {};
	        applicationProperties[itemIdx]['defaultText'] = {};
	        applicationProperties[itemIdx]['defaultNumber'] = {};

	        applicationProperties[itemIdx]['mascotData'] = {};
	        applicationProperties[itemIdx]['fontData'] = {};

	        applicationProperties[itemIdx]['center'] = {};
	        applicationProperties[itemIdx]['colors'] = {};
	        applicationProperties[itemIdx]['accents'] = {};
	        applicationProperties[itemIdx]['tailsweeps'] = {};


	        applicationProperties[itemIdx].type = applicationType;
	        applicationProperties[itemIdx].name = applicationName;
	        applicationProperties[itemIdx].id = applicationId;
	        // applicationProperties[itemIdx].layerOrder = applicationId;
	        applicationProperties[itemIdx].topLeft.x = topLeftX;
	        applicationProperties[itemIdx].topLeft.y = topLeftY;
	        applicationProperties[itemIdx].topRight.x = topRightX;
	        applicationProperties[itemIdx].topRight.y = topRightY;
	        applicationProperties[itemIdx].bottomLeft.x = bottomLeftX;
	        applicationProperties[itemIdx].bottomLeft.y = bottomLeftY;
	        applicationProperties[itemIdx].bottomRight.x = bottomRightX;
	        applicationProperties[itemIdx].bottomRight.y = bottomRightY;
	        applicationProperties[itemIdx].isPrimary = isPrimary;
	        applicationProperties[itemIdx].hasLogo = hasLogo;
	        applicationProperties[itemIdx].hasTeamName = hasTeamName;
	        applicationProperties[itemIdx].hasPlayerName = hasPlayerName;
	        applicationProperties[itemIdx].hasNumber = hasNumber;
	        applicationProperties[itemIdx].fontSizes = fontSizes;
	        applicationProperties[itemIdx].uniformSizes = uniformSizes;
	        applicationProperties[itemIdx].verticalText = verticalText;
	        applicationProperties[itemIdx].rotatedTailsweep = rotatedTailsweep;

	        applicationProperties[itemIdx].defaultMascot = applicationMascot;

	        applicationProperties[itemIdx].defaultFont = applicationFont;
	        applicationProperties[itemIdx].defaultText = applicationText;
	        applicationProperties[itemIdx].defaultNumber = applicationNumber;

	        applicationProperties[itemIdx].colors = applicationColors;
	        applicationProperties[itemIdx].accents = applicationAccents;
	        applicationProperties[itemIdx].tailsweeps = applicationTailsweep;

	        applicationProperties[itemIdx].topLeft.xp = ((topLeftX / canvasFront.width) * 100) * multiplier;
	        applicationProperties[itemIdx].topLeft.yp = ((topLeftY / canvasFront.height) * 100) * multiplier;
	        applicationProperties[itemIdx].topRight.xp = ((topRightX / canvasFront.width) * 100) * multiplier;
	        applicationProperties[itemIdx].topRight.yp = ((topRightY / canvasFront.height) * 100) * multiplier;
	        applicationProperties[itemIdx].bottomLeft.xp = ((bottomLeftX / canvasFront.width) * 100) * multiplier;
	        applicationProperties[itemIdx].bottomLeft.yp = ((bottomLeftY / canvasFront.height) * 100) * multiplier;
	        applicationProperties[itemIdx].bottomRight.xp = ((bottomRightX / canvasFront.width) * 100) * multiplier;
	        applicationProperties[itemIdx].bottomRight.yp = ((bottomRightY / canvasFront.height) * 100) * multiplier;

	        applicationProperties[itemIdx].width = thisGroup.getWidth() * multiplier;
	        applicationProperties[itemIdx].height = thisGroup.getHeight() * multiplier;
	        applicationProperties[itemIdx].widthp = ((thisGroup.getWidth() / canvasFront.width) * 100) * multiplier;
	        applicationProperties[itemIdx].heightp = ((thisGroup.getHeight() / canvasFront.height) * 100) * multiplier;
	        applicationProperties[itemIdx].pivot = thisGroup.getCenterPoint();
	        applicationProperties[itemIdx].pivot.x = $(this).parent().siblings('td').find("input[class=app-x]").val();
	        applicationProperties[itemIdx].pivot.y = $(this).parent().siblings('td').find("input[class=app-y]").val();
	        applicationProperties[itemIdx].rotation = thisGroup.getAngle();

	        var tx = parseFloat(applicationProperties[itemIdx].pivot.x);
	        var ty = parseFloat(applicationProperties[itemIdx].pivot.y);

	        applicationProperties[itemIdx].center.x = ( tx + 3 ) * multiplier;
	        applicationProperties[itemIdx].center.y = ( ty ) * multiplier;

	        applicationProperties[itemIdx].pivot.x = applicationProperties[itemIdx].pivot.x * multiplier;
	        applicationProperties[itemIdx].pivot.y = applicationProperties[itemIdx].pivot.y * multiplier;
	        try{
	            if(cs == 1){
	                $(this).parent().siblings('td').find("input[class=app-x]").val(applicationProperties[itemIdx].pivot.x);
	                $(this).parent().siblings('td').find("input[class=app-y]").val(applicationProperties[itemIdx].pivot.y);
	                $(this).val(thisGroup.getAngle());
	            } else {
	                applicationProperties[itemIdx].rotation = rotation_val;
	                // console.log("ROTATION VALUE: >>>> " + rotation_val);
	            }
	        } catch(err){
	            console.log(err.message);
	        }
	        cx++;
	        canvasFront.renderAll();
	    });

	    var appProperties = JSON.stringify(applicationProperties);
	    appProperties = '"'+appProperties+'"';
	    $('#a-application-properties').val(appProperties);
	    window.ap = appProperties;

	    // console.log("APP PROPS: "+window.ap);
	}

});