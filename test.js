AWS.config.update({accessKeyId: 'AKIAJYPPZOTE3N7J7XBA', secretAccessKey: '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'});

	var s3 = new AWS.S3();

	var params = {
	Bucket: 'ddweaver-host', // required
	MaxKeys: 10};
	s3.listObjects(params, function(err, data) {	
	if (err) console.log(err, err.stack); // an error occurred
	else     console.log(data);           // successful response
	});