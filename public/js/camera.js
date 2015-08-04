	$( document ).ready(function() { //  play/pause

		var play = 0, temp = 0;

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

	function rotate_direction(){

		$("#rotate_right").mousedown(function(){

			window.UniformBuilder.rotateY = 0.04;

		}).mouseup(function(){window.UniformBuilder.rotateY = 0; // Obvious events here . . .
		}).mouseleave(function(){window.UniformBuilder.rotateY = 0;});

		$("#rotate_left").mousedown(function(){

			window.UniformBuilder.rotateY = -0.04;

		}).mouseup(function(){window.UniformBuilder.rotateY = 0; // Obvious events here . . .
		}).mouseleave(function(){window.UniformBuilder.rotateY = 0;});

		$("#model_view input[type='radio']:checked").click(function() {
			var direction = $(this).val();
			if(play==1){

				if(direction=="left"){
					window.UniformBuilder.rotateY = -0.04
				}

				else{
					window.UniformBuilder.rotateY = 0.04
				}

			}
			console.log(direction);
		});


	}