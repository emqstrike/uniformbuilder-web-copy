	$( document ).ready(function() {

		var play = 0, temp = 0;

		//  play/pause
		$("#play").click(function() {

		$(this).children().removeClass('fa fa-play');
		$(this).children().removeClass('fa fa-pause');
		
			if(play == 0){
				$(this).children().addClass('fa fa-pause');
				play = 1;
				window.UniformBuilder.rotateY = temp;
			}

			else{
				$(this).children().addClass('fa fa-play');
				play = 0;
				window.UniformBuilder.rotateY = 0;
			}
			console.log(play);

		});

		$("#rb_left").click(function() {
			if(play == 1){
				window.UniformBuilder.rotateY = -0.04;
				temp = window.UniformBuilder.rotateY;
			}
			
		});

		$("#rb_right").click(function() {
			if(play == 1){
				window.UniformBuilder.rotateY = 0.04;
				temp = window.UniformBuilder.rotateY;
			}
		});


	});