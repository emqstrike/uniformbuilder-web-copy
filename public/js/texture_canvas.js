
	$( document ).ready(function() {

		window.texture_canvas = {};
		window.texture_canvas['objects'] = {};

		var canvas = new fabric.Canvas('texture_canvas');

		window.texture_canvas['canvas'] = canvas;

		var rect = new fabric.Rect({
		  left: 100,
		  top: 100,
		  fill: 'red',
		  width: 20,
		  height: 20
		});

		window.texture_canvas.objects['rect'] = rect;

		canvas.add(rect);

		fabric.Image.fromURL('/images/materials/baseball_1/base.png', function(oImg) {

			oImg.left = 0;
			oImg.top = 0;

			window.texture_canvas.objects['base'] = oImg;

  			canvas.add(oImg);


		});


	});
