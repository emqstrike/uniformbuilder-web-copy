//awsKey = 'AKIAI7CTHYBOPL4ZX2JQ';
//secret = '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';
awsKey = 'AKIAJBGXZ7ET4HZD6YAA';
secret = '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';
bucket = 'ddweaver-host';
logosKey = 'newbalance/baseball/logos/';

function start() {

	AWS.config.update({
		accessKeyId : awsKey,
		secretAccessKey : secret
	});

	
	// listBucket('newbalance/baseball/logos', 'svg', '#logos');
	
	listBucket('newbalance/baseball/assets/img/infusions', 'svg', '#infusions');
	
	listBucket('newbalance/baseball/assets/img/materials', 'svg', '#materials');
	
	listFonts('newbalance/baseball/assets/fonts', 'woff', '#fonts');

	$('#delete').click(function () {

		deleteFromBucket($(this).attr('data-key'));

	});

	$('#uploadlogo')
	.ajaxForm({
		beforeSubmit : function () {},
		success : function (response) {

			$('#logos').append('<button class="col-md-1 btn btn-default logo"><img src="http://' + finalUrl + '" data-key="' + folder + ts + filename + '"><span class="glyphicon glyphicon-remove-circle"></span></button>');
			makeCardsDeletable();

		}
	});
	
	$('#uploadInf')
	.ajaxForm({
		beforeSubmit : function () {},
		success : function (response) {

			$('#infusions').append('<button class="col-md-1 btn btn-default logo"><img src="http://' + finalUrl + '" data-key="' + folder + ts + filename + '"><span class="glyphicon glyphicon-remove-circle"></span></button>');
			makeCardsDeletable();

		}
	});
	
	$('#uploadMat')
	.ajaxForm({
		beforeSubmit : function () {},
		success : function (response) {

			$('#materials').append('<button class="col-md-1 btn btn-default logo"><img src="http://' + finalUrl + '" data-key="' + folder + ts + filename + '"><span class="glyphicon glyphicon-remove-circle"></span></button>');
			makeCardsDeletable();

		}
	});

	$('#file').change(function () {

		$('#upload').removeClass('disabled');

	});
	$('#fileinf').change(function () {

		$('#uploadinf').removeClass('disabled');

	});
	$('#filemat').change(function () {

		$('#uploadmat').removeClass('disabled');

	});

	$('#upload').click(function () {

		uploadLogo();

	});
	$('#uploadinf').click(function () {

		uploadInf();

	});
	$(uploadmat).click(function () {

		uploadMat();

	});

}

function uploadLogo() {

	bucket = 'ddweaver-host';
	folder = 'newbalance/baseball/builder/logos/';
	//awsKey = 'AKIAI7CTHYBOPL4ZX2JQ';
	//secret = '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';
	awsKey = 'AKIAJBGXZ7ET4HZD6YAA';
	secret = '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';
	ts = +new Date;

	filename = ts + '.svg';

	finalUrl = bucket + '.s3.amazonaws.com/' + folder + filename;

	POLICY = {
		"expiration" : "2014-01-01T00:00:00Z",
		"conditions" : [{
				"bucket" : bucket
			},
			["starts-with", "$key", folder + filename], {
				"acl" : "public-read"
			}, {
				"success_action_redirect" : finalUrl
			},
			["starts-with", "$Content-Type", "image/svg+xml"],
			["content-length-range", 0, 1048576]
		]
	};

	var policyBase64 = Base64.encode(JSON.stringify(POLICY));
	var signature = b64_hmac_sha1(secret, policyBase64);

	$("#uploadlogo .policy").val(policyBase64);
	$("#uploadlogo .signature").val(signature);
	$("#uploadlogo .redirect").attr('value', finalUrl);
	$("#uploadlogo .key").attr('value', folder + filename);
	// $("#sendSvg .type").attr('value', 'image/svg+xml');

	$("#uploadlogo").submit();

	console.log('SVG uploaded to: ' + finalUrl);

}

function uploadInf() {

	bucket = 'demos.marcellus.tv';
	folder = 'newbalance/baseball/infusions/';
	//awsKey = '0MCFA5AQKT4TK3XCQ4R2';
	//secret = 'rBhzsSANlnxk6jP1jd+GoNa3Jy/qnOpIHsp6gaoZ';
	awsKey = 'AKIAJBGXZ7ET4HZD6YAA';
	secret = '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';
	ts = +new Date;

	filename = ts + '.svg';

	finalUrl = bucket + '.s3.amazonaws.com/' + folder + filename;

	POLICY = {
		"expiration" : "2014-01-01T00:00:00Z",
		"conditions" : [{
				"bucket" : bucket
			},
			["starts-with", "$key", folder + filename], {
				"acl" : "public-read"
			}, {
				"success_action_redirect" : finalUrl
			},
			["starts-with", "$Content-Type", "image/svg+xml"],
			["content-length-range", 0, 1048576]
		]
	};

	var policyBase64 = Base64.encode(JSON.stringify(POLICY));
	var signature = b64_hmac_sha1(secret, policyBase64);

	$("#uploadInf .policy").val(policyBase64);
	$("#uploadInf .signature").val(signature);
	$("#uploadInf .redirect").attr('value', finalUrl);
	$("#uploadInf .key").attr('value', folder + filename);
	
	$("#uploadInf").submit();

	console.log('SVG uploaded to: ' + finalUrl);

}

function uploadMat() {

	bucket = 'demos.marcellus.tv';
	folder = 'newbalance/baseball/materials/';
	//awsKey = '0MCFA5AQKT4TK3XCQ4R2';
	//secret = 'rBhzsSANlnxk6jP1jd+GoNa3Jy/qnOpIHsp6gaoZ';
	awsKey = 'AKIAJBGXZ7ET4HZD6YAA';
	secret = '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';
	ts = +new Date;

	filename = ts + '.svg';

	finalUrl = bucket + '.s3.amazonaws.com/' + folder + filename;

	POLICY = {
		"expiration" : "2014-01-01T00:00:00Z",
		"conditions" : [{
				"bucket" : bucket
			},
			["starts-with", "$key", folder + filename], {
				"acl" : "public-read"
			}, {
				"success_action_redirect" : finalUrl
			},
			["starts-with", "$Content-Type", "image/svg+xml"],
			["content-length-range", 0, 1048576]
		]
	};

	var policyBase64 = Base64.encode(JSON.stringify(POLICY));
	var signature = b64_hmac_sha1(secret, policyBase64);

	$("#uploadMat .policy").val(policyBase64);
	$("#uploadMat .signature").val(signature);
	$("#uploadMat .redirect").attr('value', finalUrl);
	$("#uploadMat .key").attr('value', folder + filename);
	
	$("#uploadMat").submit();

	console.log('SVG uploaded to: ' + finalUrl);

}

function deleteFromBucket(key) {

	new AWS.S3().deleteObject({
		Bucket : bucket,
		Key : key
	}, function (error, data) {

		if (error) {

			console.log(error); // an error occurred

		} else {

			$('#modal-delete').modal('hide');

			$('.selected').fadeOut('slow', function () {

				$(this).remove();

			});

		}

	});

}

function listLogos() {

	new AWS.S3().listObjects({
		Bucket : bucket,
		Prefix : logosKey
	}, function (error, data) {
		if (error) {
			console.log(error); // an error occurred
		} else {

			response = data.Contents;

			for (i in response) {

				a = response[i].Key;
				b = a.split('.');

				if (b[b.length - 1] == 'svg') {

					$('#logos').append('<button class="col-md-1 btn btn-default logo"><img src="http://static-content.marcellus.tv/' + a + '" data-key="' + a + '"><span class="glyphicon glyphicon-remove-circle"></span></button>');

				}

				makeCardsDeletable();

			}

			console.log(data); // request succeeded
		}
	});

}

function listBucket(prefix, extension, target) {

	new AWS.S3().listObjects({
		Bucket : bucket,
		Prefix : prefix
	}, function (error, data) {
		if (error) {
			console.log(error); // an error occurred
		} else {

			response = data.Contents;

			for (i in response) {

				a = response[i].Key;
				b = a.split('.');

				if (b[b.length - 1] == extension) {

					$(target).append('<button class="col-md-1 btn btn-default logo"><img src="http://static-content.marcellus.tv/' + a + '" data-key="' + a + '"><span class="glyphicon glyphicon-remove-circle"></span></button>');

				}

				makeCardsDeletable();

			}

			console.log(data); // request succeeded
		}
	});

}

function listFonts(prefix, extension, target) {

	new AWS.S3().listObjects({
		Bucket : bucket,
		Prefix : prefix
	}, function (error, data) {
		if (error) {
			console.log(error); // an error occurred
		} else {

			response = data.Contents;

			for (i in response) {

				a = response[i].Key;
				b = a.split('.');
				
				if (b[b.length - 1] == extension) {
				
					filename = response[i].Key.split('fonts/')[1].split('.')[0].replace('-','').replace('_','');
					
					$(target).append(
							'<div class="col-md-1 btn btn-default logo font">'+
							'<h3 style="font-family:&#39;'+filename+'&#39;;color:#000;">ABCE 1234</h3>'+
							'<h4>'+filename+'</h4>'+
							'<span class="glyphicon glyphicon-remove-circle" data-url="http://static-content.marcellus.tv/' + a + '" data-key="' + a + '"></span>'+
							'<style>'+
							'@font-face{'+
							'font-family: "'+filename+'";'+
							'src: url("http://static-content.marcellus.tv/' + a + '") format("'+extension+'");'+
							'}'+
							'</style>'+
							'</div>'
						
						);

				}

				makeCardsDeletable();

			}

			console.log(data); // request succeeded
		}
	});

}



function makeCardsDeletable() {

	$('.logo .glyphicon-remove-circle')
	.unbind('click')
	.click(function () {

		$('.selected').removeClass('selected');
		$(this).parent('div').addClass('selected');

		$('#delete').attr('data-key',

			$(this).attr('data-key'));

		$('#logoshow').attr('data-url',
			$(this).attr('data-url'));

		$('#modal-delete').modal('show');

	});

}