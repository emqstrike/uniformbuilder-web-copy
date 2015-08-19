	$( document ).ready(function() { //  play/pause

		var play = 0, temp = 0;

		$("#play_left").click(function() {

			if(play == 0){
				$(this).children().removeClass('fa fa-chevron-left');
				$(this).children('i').eq(0).addClass('fa fa-pause');
				play = 1;
				window.UniformBuilder.rotateY = -0.04;

				$('#play_right').children().removeClass('fa fa-pause');
				$('#play_right').children().addClass('fa fa-chevron-right');
			}
			else{
				$(this).children('i').eq(0).removeClass('fa fa-pause');
				$(this).children().addClass('fa fa-chevron-left');
				play = 0;
				window.UniformBuilder.rotateY = 0;
			}
		
		});

		$("#play_right").click(function() {

			if(play == 0){
				$(this).children().removeClass('fa fa-chevron-right');
				$(this).children('i').eq(0).addClass('fa fa-pause');
				play = 1;
				window.UniformBuilder.rotateY = 0.04;

				$('#play_left').children().removeClass('fa fa-pause');
				$('#play_left').children().addClass('fa fa-chevron-left');
			}
			else{
				$(this).children('i').eq(0).removeClass('fa fa-pause');
				$(this).children().addClass('fa fa-chevron-right');
				play = 0;
				window.UniformBuilder.rotateY = 0;
			}
		
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

	function reset_buttons(){
		$('#play_right').children().removeClass('fa fa-pause');
		$('#play_right').children().addClass('fa fa-chevron-right');
		$('#play_left').children().removeClass('fa fa-pause');
		$('#play_left').children().addClass('fa fa-chevron-left');
	}

	function rotate_direction(){

		$("#rotate_right").mousedown(function(){

			window.UniformBuilder.rotateY = 0.04;

		}).mouseup(function(){window.UniformBuilder.rotateY = 0; // Obvious events here . . .
			reset_buttons()
		}).mouseleave(function(){window.UniformBuilder.rotateY = 0;});

		$("#rotate_left").mousedown(function(){

			window.UniformBuilder.rotateY = -0.04;

		}).mouseup(function(){window.UniformBuilder.rotateY = 0; // Obvious events here . . .
			reset_buttons()
		}).mouseleave(function(){window.UniformBuilder.rotateY = 0;});


	}