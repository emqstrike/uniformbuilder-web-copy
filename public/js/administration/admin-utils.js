$(document).ready(function() {

	window.au.initialize = function () {									

		window.au.config.api_host = '//api-dev.qstrike.com';

		au.accents_url = window.au.config.api_host + '/api/accents/';
		au.colors_url = window.au.config.api_host + '/api/colors/';
		au.fonts_url = window.au.config.api_host + '/api/fonts/';
		au.mascots_url = window.au.config.api_host + '/api/mascots/';
		au.materials_url = window.au.config.api_host + '/api/materials/';
		au.patterns_url = window.au.config.api_host + '/api/patterns/';
		au.tailsweeps_url = window.au.config.api_host + '/api/tailsweeps/';
	}

});