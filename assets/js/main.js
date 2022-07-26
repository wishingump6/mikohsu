/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href){
						window.location.hash = href;

						if(href == "#home" | href == "#contact"){
							window.document.getElementById("main").style.background = "rgba(250, 250, 250, 0.75)";
							// window.document.getElementById("nav").getElementsByClassName("active")[0].style.opacity = "0.75";
						}

						else{
							window.document.getElementById("main").style.background = "rgba(250, 250, 250, 1)";
							// window.document.getElementById("nav").getElementsByClassName("active")[0].style.opacity = "1";
						}
					}

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

	// Google form
		$('#google-form').submit(function (e) {
	      //在這裡我們要先擋掉form默認事件
	      e.preventDefault();

	      if ($('#email').val() && $('#name').val() && $('#phone').val() && $('#purpose').val() && $('#time1').val() && $('#time2').val()) {//需要先確認必填欄位是否填寫
	        $.ajax({
	          // url為Google Form按下submit的aciotn
	          url: "https://docs.google.com/forms/d/e/1FAIpQLSfUH5D9hPe7hOpMOZdUg-fpttOOKq9Eh2ypTz3dVIAUboVZpQ/formResponse",
	          crossDomain: true,//解決跨網域CORS的問題
	          data: {// entry.xxxxx 這些需要填寫您表單裡面的值，與其相互對應
	            "entry.1475828167": $('#email').val(),
	            "entry.946793821": $('#name').val(),
	            "entry.819294006": $('#phone').val(),
	            "entry.362561278": $('#purpose').val(),
	            "entry.1672301594": $('#time1').val(),
	            "entry.1711592634": $('#time2').val(),
	            "entry.1855613071": $('#message').val()
	          },
	          type: "POST", //因為是要進行insert的動作，故是用POST
	          dataType: "JSONP",
	          complete: function () {
	          	console.log($('#email').val()+$('#name').val()+$('#phone').val()+$('#purpose').val()+$('#time1').val()+$('#time2').val()+$('#message').val());
	            //完成後把這些欄位清空
	            $('#email').val('');
	            $('#name').val('');
	            $('#phone').val('')
	            $('#purpose').val('來信目的');
	            $('#time1').val('');
	            $('#time2').val('預計拍攝時段');
	            $('#message').val('');
	            //最後跳轉到感謝的頁面
	            // window.location.replace("index.html");
	            alert("∣ 𝙈𝙞𝙠𝙤 𝙋𝙝𝙤𝙩𝙤𝙜𝙧𝙖𝙥𝙝𝙮 ∣\n\n 🤍 已收到您填寫的表單\n 🤍 一人作業請靜候 𝘌-𝘮𝘢𝘪𝘭 回覆.ᐟ.ᐟ");
	          }
	        });
	      }else{
	      	alert("∣ 𝙈𝙞𝙠𝙤 𝙋𝙝𝙤𝙩𝙤𝙜𝙧𝙖𝙥𝙝𝙮 ∣\n\n 🤍   資料好像沒有填寫完整哦( ˘•ω•˘ ).ᐟ.ᐟ\n\n");
	      }
	    });
})(jQuery);