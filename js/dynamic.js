function introduction() {
	var h = $(window).height()-$('header').height();
	$('.introduction').height(h);
}
function team(e) {
	var teamLines = Math.ceil(e.find('li').size()/2)-1;
	for ( var i = 0; i<=teamLines; i++ ) {
		var max = 0;
		for ( var j=1; j<=2; j++ ) {
			e.find('li:nth-child('+eval(i*2+j)+')').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
		}
		for ( var j=1; j<=2; j++ ) {
			e.find('li:nth-child('+eval(i*2+j)+')').outerHeight(max);
		}
	}
	e.css({
		'opacity': '1'
	});
}
function features() {
	var t = $('.features ul');
	var featureLines = Math.ceil(t.find('li').size()/3);
	for ( var i = 0; i<=featureLines; i++ ) {
		var max = 0;
		for ( var j=1; j<=3; j++ ) {
			t.find('li:nth-child('+eval(i*3+j)+')').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
		}
		for ( var j=1; j<=3; j++ ) {
			t.find('li:nth-child('+eval(i*3+j)+')').outerHeight(max);
		}
	}
	t.css({
		'opacity': '1'
	});
}
$(document).ready(function() {
	if ( $('.introduction').length > 0 ) {
		introduction();
		$('.introduction .slider').slides({
			generatePagination: false,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 0
		});
	}
	$('.introduction .scroll').bind('click', function(event) {
		event.preventDefault();
		var s = $('.introduction').offset().top+$('.introduction').outerHeight();
		$('html, body').stop().animate({
			scrollTop: s-69+'px'
		}, 1000, 'easeInOutQuad');
	});
	$('.modal > div, .popup').append('<span class="close"></span>');
	$('[data-open]').bind('click', function(event) {
		event.preventDefault();
		$('.modal').stop(true,true).fadeOut(500);
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(500);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(500);
	});
	$('.fade, .modal .close').bind('click', function(event) {
		event.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	var bh = 0;
	$('[data-popup]').bind('click', function(event) {
		event.preventDefault();
		var t = $('.popup[data-target="'+$(this).attr('data-popup')+'"]');
		t.stop(true,true).fadeIn(500);
		bh = $('body').scrollTop();
		$('body').css({'position': 'fixed', 'top': -bh+'px', 'overflow-y': 'scroll'});
		if ( t.find('.grid-b').length > 0 ) {
			team(t.find('.grid-b'));
		}
		t.children('div').jScrollPane({
			verticalDragMinHeight: 30,
			verticalDragMaxHeight: 30
		});
	});
	$('.popup .close').bind('click', function(event) {
		event.preventDefault();
		$('.popup, .modal').stop(true,true).fadeOut(500);
		$('body').css({'position': 'static', 'top': '0', 'overflow-y': 'auto'});
		$('body').scrollTop(bh);
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('header nav ul li a').bind('click', function(event) {
		event.preventDefault();
		var s = $('header .submenu');
		if ( $(this).hasClass('sub') ) {
			if ( s.is(':hidden') ) {
				s.stop().fadeIn(500);
				$(this).parent().addClass('active').siblings().removeClass();
			}
			else {
				s.stop().fadeOut(500);
				$(this).parent().removeClass('active').siblings().removeClass();
			}
		}
		if ( $(this).attr('href').length > 0 ) {
			$('html, body').stop().animate({
				scrollTop: $('[data-scroll="'+$(this).attr('href')+'"]').offset().top-69+'px'
			}, 1000, 'easeInOutQuad');
			s.stop().fadeOut(500);
			$(this).parent().addClass('active').siblings().removeClass();
		}
	});
	var fixedHeader = false;
	$(window).bind('scroll', function() {
		if ( $(document).scrollTop() > $('.introduction').outerHeight()+145-70 ) {
			if ( !fixedHeader ) {
				$('.wrapper').css({
					'padding-top': '145px'
				});
				$('header').addClass('fixed');
				$('header').css({
					'left': $('.wrapper').offset().left+'px',
					'width': $('.wrapper').outerWidth()+'px',
					'opacity': '0'
				}).stop().animate({
					'opacity': '1'
				}, 200);
				fixedHeader = true;
			}
		}
		else {
			if ( fixedHeader ) {
				$('header').stop().fadeOut(250, function() {
					$('.wrapper').css({
						'padding-top': '0'
					});
					$('header').css({
						'left': '0',
						'width': '100%'
					});
					$('header').show();
					$('header').removeClass('fixed');
				});
				fixedHeader = false;
			}
		}
	});
	$('header .mini').bind('click', function(event) {
		event.preventDefault();
		$('header .submenu').stop().fadeOut(500);
		$('header nav ul li').removeClass('active');
		$('html, body').stop().animate({
			scrollTop: 0
		}, 1000, 'easeInOutQuad');
	});
});
$(window).load(function() {
	if ( $('.team .grid-b').length > 0 ) {
		team($('.team .grid-b'));
	}
	if ( $('.features').length > 0 ) {
		features();
	}
});
$(window).resize(function() {
	if ( $('.introduction').length > 0 ) {
		introduction();
	}
	if ( $('header.fixed').length > 0 ) {
		$('header.fixed').css({
			'left': $('.wrapper').offset().left+'px',
			'width': $('.wrapper').outerWidth()+'px'
		});
	}
});