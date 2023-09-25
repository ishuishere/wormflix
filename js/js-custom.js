!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){var e,t=["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"];if(function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(e){}return e}()){var n=EventTarget.prototype.addEventListener;e=n,EventTarget.prototype.addEventListener=function(n,o,r){var i,s="object"==typeof r&&null!==r,u=s?r.capture:r;(r=s?function(e){var t=Object.getOwnPropertyDescriptor(e,"passive");return t&&!0!==t.writable&&void 0===t.set?Object.assign({},e):e}(r):{}).passive=void 0!==(i=r.passive)?i:-1!==t.indexOf(n)&&!0,r.capture=void 0!==u&&u,e.call(this,n,o,r)},EventTarget.prototype.addEventListener._original=e}});
if (window.innerWidth < 991)  {
$(function() {
  var menuVisible = false;
  $('#mobile-menu').click(function() {
    if (menuVisible) {
      $('#top-menu').css({'display':'none'});
      menuVisible = false;
      return;
    }
    $('#top-menu').css({'display':'block'});
    menuVisible = true;
  });
  $('#top-menu').click(function() {
    $(this).css({'display':'none'});
    menuVisible = false;
  });
});
}

if (window.innerWidth > 991) {
$(document).ready(function () {
    $('.country-sub').mouseover(function() {
        $('.country').show();
    })
	$( "#sidebar_menu" ).addClass( "active" );
	$( "#sidebar_menu_bg" ).addClass( "active" );
	
    $('.country-sub').mouseout(function() {
        t = setTimeout(function() {
            $('.country').hide();
        }, 100);

        $('.country').on('mouseenter', function() {
            $('.country').show();
            clearTimeout(t);
        }).on('mouseleave', function() {
            $('.country').hide();
        })
    })
});

$(document).ready(function () {
    $('.genre-sub').mouseover(function() {
        $('.genre').show();
    })

    $('.genre-sub').mouseout(function() {
        t = setTimeout(function() {
            $('.genre').hide();
        }, 100);

        $('.genre').on('mouseenter', function() {
            $('.genre').show();
            clearTimeout(t);
        }).on('mouseleave', function() {
            $('.genre').hide();
        })
    })
});
}

jQuery(document).ready(function() {
	jQuery(".ss-item").click(function() {
		var data = jQuery(this).attr("data-id");
		var data_ss = jQuery(this).attr("data-ss");
		var ajax_url = ''+WebsiteURL+'ajax/ajax.php?episode='+data+'';
		var btn_call_action = jQuery('#episodes');
		var btn_current_ss = jQuery('#current-ss');
		
		
		jQuery.ajax({
			type:'GET',
			url: ajax_url,
			success: function(data){
				var status = data.trim();
				jQuery(btn_call_action).html(status);
				$('.dropdown-menu').find('.dropdown-item').removeClass('active');
				$('a.change-me-'+data_ss+'').toggleClass('active');
				jQuery(btn_current_ss).html('Season '+data_ss+'');
				
			}
			}
		);
	});

});


jQuery(document).ready(function() {

		var data = jQuery('#vote-info').attr("data-movie-id");
		if(data) {
		var ajax_url = ''+WebsiteURL+'ajax/ajax.php?rating='+data+'';
		var ajax = ''+WebsiteURL+'ajax/ajax.php';
		
		var vote_info = jQuery('#vote-info');
		
		
		jQuery.ajax({
			type:'GET',
			url: ajax_url,
			success: function(data){
				var status = data.trim();
				jQuery(vote_info).html(status);
				
				jQuery(".popup").click(function() {
					swal({ html:true,type: 'warning', title:'<span style="font-size:18px;color:#000;">You must be logged in to vote!</span>', text:'<a style="background-color: #112760;color:#fff !important;font-size:15px;cursor:pointer;padding:15px;margin-right:15px;" href="'+WebsiteURL+'login/">Login</a> <a style="background-color: #354567;color:#fff !important;font-size:15px;cursor:pointer;padding:15px;" href="'+WebsiteURL+'login/">Register</a>'});
				});
	
				var muh_data = jQuery('#vote-info').attr("data-movie-id");
				var total_votes = jQuery('.is-total');
				var total_score = parseInt(jQuery('.is-total').attr("data-votes"));

				var clicked = false;
				  $('.star-rating .fa').click(function(){
					if (!clicked) {
					  clicked = true;
					  var rating = $(this).data('rating');
					  $('#rating').val(rating);
					  $('.star-rating .fa').removeClass('checked');
					  $(this).addClass('checked');
					  $(this).prevAll('.fa').addClass('checked');
					  $(this).nextAll('.fa').removeClass('checked');
					  var thank_you = 'You have rated '+ rating +'';

					  $.ajax({
						url: ajax,
						type: 'post',
						data: { rating: rating, action: muh_data, action: 'likeit', sent: muh_data,},
						success: function(data){
						  	swal('Success', thank_you, "success");
								jQuery.ajax({
								type:'GET',
								url: ajax_url,
								success: function(data){
									var status = data.trim();
									jQuery(vote_info).html(status);
								}
								});
						}
					  });
					}
				  });

				  $('.star-rating .fa').hover(function(){
					if (!clicked) {
					  $(this).addClass('hover');
					  $(this).prevAll('.fa').addClass('hover');
					}
				  }, function(){
					if (!clicked) {
					  $(this).removeClass('hover');
					  $(this).prevAll('.fa').removeClass('hover');
					}
				  });

			}
			}
		);
		}

});

	jQuery(document).ready(function($) {
		$('#player-expand').click(function() {
		  $('.section-area').toggleClass("expand-main");
	  });
	});
	
	jQuery(document).ready(function() {
		$('#mask-player').allofthelights();
	});
	
	
	jQuery(document).ready(function() {
		jQuery("#wl-content").click(function() {
		var ajax_url = "/ajax/ajax.php";
		var added_ok_watchlist = "This movie has been added to your Watch List.";
		var removed_watchlist = "This movie has been removed from your Watch List.";
		var btn_call_action = jQuery(this);

		var add_it = jQuery(this).attr("data-id");
		var data_name = jQuery(this).attr("data-name");
		
		var data = {
            action: 'watchlist',
            add_it: add_it,
        };

		jQuery.ajax({
            type: 'post',
            url: ajax_url,
            data: data,
            success: function (response) {   
            	var status = response.trim();           
            	if(status === "ok") {
            		jQuery(btn_call_action).html('<div class="btn btn-sm btn-wl-single active"><i class="fas fa-plus mr-2"></i><span class="mobile-hidden">Watch List</span></div>');				
            		swal(data_name, added_ok_watchlist, "success");
            	}

            	if(status === "removed") {         
            		jQuery(btn_call_action).html('<div class="btn btn-sm btn-wl-single"><i class="fas fa-plus mr-2"></i><span class="mobile-hidden">Watch List</span></div>');				
            		swal(data_name, removed_watchlist, "error");
            	}      			
            },
        });
		
	});
	jQuery("#wl-content-login").click(function() {
		swal({ html:true,type: 'warning', title:'<span style="font-size:18px;color:#000;">You must be logged in to create a Watch List!</span>', text:'<a style="background-color: #112760;color:#fff !important;font-size:15px;cursor:pointer;padding:15px;margin-right:15px;" href="'+WebsiteURL+'login/">Login</a> <a style="background-color: #354567;color:#fff !important;font-size:15px;cursor:pointer;padding:15px;" href="'+WebsiteURL+'login/">Register</a>'});
	});
});



function showResult(str) {
  if (str.length==0) {
    document.getElementById("search-loading").innerHTML="";
    document.getElementById("search-loading").style="display:none";
    return;
  }
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("search-loading").innerHTML=this.responseText;
      document.getElementById("search-loading").style="width: 100%;background: rgb(26, 30, 39);padding: 0 !important;font-size: 22px;"}
  }
  xmlhttp.open("GET","/livesearch?q="+str,true);
  xmlhttp.send();
}

window.onload = function(){
  var divToHide = document.getElementById('search-loading');
  document.onclick = function(e){
    if(e.target.id !== 'search-loading'){
      //element clicked wasn't the div; hide the div
      divToHide.style.display = 'none';
    }
  };
};

	jQuery(document).ready(function() {
		jQuery(".is-fav a").click(function() {
		var ajax_url = "/ajax/ajax.php";
		var added_ok_watchlist = "This movie has been added to your Watch List.";
		var removed_watchlist = "This movie has been removed from your Watch List.";
		var btn_call_action = jQuery(this);

		var add_it = jQuery(this).attr("data-id");
		var data_type = jQuery(this).attr("data-type");
		var data_name = jQuery(this).attr("data-name");
		
		var data = {
            action: 'watchlist',
            add_it: add_it,
        };
		if(data_type && data_name) {
		jQuery.ajax({
            type: 'post',
            url: ajax_url,
            data: data,
            success: function (response) {   
            	var status = response.trim();           
            	if(status === "ok") {
            		jQuery(btn_call_action).parent('.is-fav').addClass('active');			
            		swal(data_name, added_ok_watchlist, "success");
            	}

            	if(status === "removed") {         
            		jQuery(btn_call_action).parent('.is-fav').removeClass('active');			
            		swal(data_name, removed_watchlist, "error");
            	}      			
            },
        });
		}
	});
	jQuery(".login_first").click(function() {
		swal({ html:true,type: 'warning', title:'<span style="font-size:18px;color:#000;">You must be logged in to create a Watch List!</span>', text:'<a style="background-color: #112760;color:#fff !important;font-size:15px;cursor:pointer;padding:15px;margin-right:15px;" href="'+WebsiteURL+'login/">Login</a> <a style="background-color: #354567;color:#fff !important;font-size:15px;cursor:pointer;padding:15px;" href="'+WebsiteURL+'login/">Register</a>'});
	});
});
if(typeof url !== 'undefined') {

let dropdown = $('#subtitles-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Subtitle</option>');
dropdown.prop('selectedIndex', 0);

jQuery.getJSON(url, function (data) {
jQuery.each(data, function (key, entry) {
dropdown.append(jQuery('<option></option>').attr('value', entry.file).text(entry.label));
})
});
};
function setIframeSource() {
var theSelect = document.getElementById('subtitles-dropdown');
var theIframe = document.getElementById('iframe-player');
var theUrl;
theUrl = theSelect.options[theSelect.selectedIndex].value;
theName = theSelect.options[theSelect.selectedIndex].text;

var finish = theIframe.src.split('?')[0] + '?c1_file=' + theUrl + '&c1_label=' + theName;
document.getElementById("iframe-player").src = finish;
}


$(document).ready(function(){

	var landifr = jQuery('#list_of');
	var ifrmas = jQuery('#mask-player');
	if(typeof pl_url !== 'undefined') {

		$.ajax({ url: pl_url,
		success: function(loadit){
			var status = loadit.trim();
			jQuery(landifr).html(status)
			var data_pl = jQuery('#first').attr("data-id");

			jQuery(ifrmas).html('<iframe id="iframe-player" width="100%" height="500" scrolling="no" frameborder="0" src="'+data_pl+'" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>');
			
			$( ".sv-item" ).click(function() {
			  var find_id = jQuery(this).attr("data-id");
			  var data_srv = jQuery(this).attr("data-srv");
				$('#list_of').find('.sv-item').removeClass('active');
				$(this).toggleClass('active');
				jQuery(ifrmas).html('<iframe id="iframe-player" width="100%" height="500" scrolling="no" frameborder="0" src="'+find_id+'" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>');
			});
		}
		});
	}
    $(".goto-comments").click(function() {
        $("html, body").animate({
            scrollTop: $("#film_comments").offset().top - 30
	}, 1e3)
});
	});
	
$(document).ready(function() {
    function p(p) {
        $(p.target).hasClass("show") ? $(p.target).prev(".toggle-submenu").html('<i class="fas fa-chevron-up"></i>') : $(p.target).prev(".toggle-submenu").html('<i class="fas fa-chevron-down"></i>')
    }
    $("#mobile_menu").click(function(p) {
        $("#mobile_menu, #sidebar_menu_bg, #sidebar_menu").toggleClass("active"), $("body").toggleClass("body-hidden")
    }), $("#sidebar_close, #sidebar_menu_bg").click(function(p) {
        $("#sidebar_menu, #sidebar_menu_bg").removeClass("active"), $("#sidebar_menu").addClass("active"), $("#sidebar_menu").toggleClass("active")
    }), $("#search-toggle").click(function(p) {
        $("#search, #search-toggle, #sidebar_menu_bg, #header").toggleClass("active"), $("body").toggleClass("body-hidden")
    }), $("#sidebar_subs_genre, #sidebar_subs_country").on("hidden.bs.collapse", p), $("#sidebar_subs_genre, #sidebar_subs_country").on("shown.bs.collapse", p);
    var l = [],
        t = {
            horizontal: 1,
            itemNav: "basic",
            smart: 1,
            activateOn: !1,
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: !1,
            scrollBy: 1,
            pagesBar: !1,
            activatePageOn: "click",
            speed: 300,
            elasticBounds: 1,
            easing: "easeOutExpo",
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            scrollSource: "mixed"
        },
        s = [$("#slideee .topslider .film_list-wrap"), $("#slide-big .topslider .film_list-wrap")];
    $.each(s, function(p, s) {
        l.push(s);
        var e = s.parent(),
            x = t;
        x.prevPage = e.find(".btn-prev"), x.nextPage = e.find(".btn-next"), s.sly(x)
    }), $("#sidebar_menu")
});