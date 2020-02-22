$(document).ready(function(){

	var header = {
		parent: $('#header'),
		slidesNumber: $('#header').children('.slide').length,
		position: 1
	};

	var info = {
		parent: $('#information'),
		slidesNumber: $('#information').children('.slide').length,
		position: 1
    }
    
	header.parent.children('.slide').first().css({
		'left': 0
	});

	info.parent.children('.slide').first().css({
		'left': 0
    });	
    
	var headerHeight = function(){
		var height = header.parent.children('.slide').outerHeight();
		header.parent.css({
			'height': height + 'px'
		});
	}

	var infoHeight = function(){
		var height = info.parent.children('.active').outerHeight();
		info.parent.animate({
			'height': height + 'px'
		});
	}

	var holderHeight = function(){
		var windowHeight = $(window).height();

		if (windowHeight <= $('.holder').outerHeight() + 200) {
			$('#holder').css({'height': ''});
		} else {
			$('#holder').css({'height': windowHeight + 'px'});
		}
	}

    headerHeight();
	holderHeight();
	infoHeight();

	$(window).resize(function(){
        headerHeight();
		holderHeight();
	});

	$('#information').children('.slide').each(function(){
		$('#buttons').append('<span>');
	});

	$('#buttons').children('span').first().addClass('active');


    // SLIDER

	$('#next').on('click', function(e){
		e.preventDefault();

		if (info.position < info.slidesNumber){
			
			info.parent.children().not('.active').css({
				'left': '100%'
			});

			$('#information .active').removeClass('active').next().addClass('active').animate({
				'left': 0
			});

			$('#information .active').prev().animate({
				'left': '-100%'
			});

			$('.buttons').children('.active').removeClass('active').next().addClass('active');
				
			info.position = info.position + 1;
		} else {
			
			$('#information .active').animate({
				'left': '-100%'
			});

			info.parent.children().not('.active').css({
				'left': '100%'
			});

			$('#information .active').removeClass('active');
			info.parent.children().first().addClass('active').animate({
				'left': 0
			});

			$('.buttons').children('.active').removeClass('active');
			$('.buttons').children('span').first().addClass('active');

			info.position = 1;
		}

		infoHeight();
	});

		$('#previous').on('click', function(e){
			e.preventDefault();

			if (info.position > 1){

				info.parent.children().not('.active').css({
					'left': '-100%'
				});

				$('#information .active').animate({
					'left': '100%'
				});

				$('#information .active').removeClass('active').prev().addClass('active').animate({
					'left': 0
				});

				$('#buttons').children('.active').removeClass('active').prev().addClass('active');

				info.position = info.position - 1;
			} else {

				info.parent.children().not('.active').css({
					'left': '-100%'
				});

				$('#information .active').animate({
					'left': '100%'
				});

				$('#information .active').removeClass('active');
				info.parent.children().last().addClass('active').animate({
					'left': 0
				});

				$('#buttons').children('.active').removeClass('active');
				$('#buttons').children('span').last().addClass('active');

				info.position = info.slidesNumber;
			}

			infoHeight();
		});
});