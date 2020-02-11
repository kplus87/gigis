var i = 0;


var APP = (function() {

    var socket = io(),
        STREAM_END_TIMEOUT = 5;



    var _init = function() {
        _bindEvents();
    };

    var _bindEvents = function() {
        $('body').on('click', '.btn-search', function() {
            $('#tweets_area').empty();
            $(this).text('Streaming...').attr('disabled', true);
            $("#inputgroup").delay(1000).slideUp();
            $.ajax({
                url: '/search',
                type: 'POST',
                data: {
                    val: $.trim($('.search-txt').val()),
                    tweet_mode:'extended'
                }
            })
        });
        
        $('body').on('click', '.tweet-body', function() {
            var link = $(this).attr('data-link');
            window.open(link, '_blank');
        });

        socket.on('savedTweetToRedis', function(status) {
            console.info('APP - got tweet from Redis', status);
            _buildTweetBox(status);
        });
        socket.on('stream:destroy', function(status) {
            $('.btn-search').text('Start streaming').removeAttr('disabled');
            $('.alert-warning').fadeIn('slow');
            setTimeout(function() {
                $('.alert-warning').fadeOut('slow');
                $("#inputgroup").slideDown('slow');
            }, STREAM_END_TIMEOUT * 1000);
        });
    };



    var _buildTweetBox = function(status) {
        i++;
        $("#eye").val(i);
        var setLocale = "A friend of GiGi's out in the world";
        var letterNumber = /^[0-9a-zA-Z,]+$/;
        var specclass="";
        var dh = (i % 7);
        console.log("DH = "+dh);
        if (dh == 0 ){
            var specclass="highlight";
        }else {
            var specclass="nvm";
        }
        var locale = status.user.location;
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';/{}|\\":<>\?]/); //unacceptable chars
        if(locale !== null && locale !== '') {
            if (pattern.test(tweetplace)) {
                var tweetplace = setLocale;
                var specclass="nvm";
            }else{
                var tweetplace = status.user.location;                
            }
        }else{
            var tweetplace = setLocale;
            var specclass="nvm";
        }
        if(tweetplace !== setLocale && specclass == "highlight"){
            console.log("SELECTED USER! = "+tweetplace);
            $("#tweetfrom").val("<span class='usnmA'>"+status.user.name+"</span> in <span class='usnm'>"+tweetplace+"</span> IS");
            $("#showtweetfrom").click();
            //update_map()
        }
        var html =  '';
        html    +=  '<strong>'; //added
        html    +=  '<span>'+ tweetplace +'</span>'; //added
        html    +=  '</strong><br>'; //added
        html    +=  '<div class="media tweet-single '+ specclass +'">';
        html    +=  '   <div class="media-left">';
        html    +=  '       <a href="https://twitter.com/' + status.user.screen_name  + '" target="_blank" title="' + status.user.name + '">';
        html    +=  '           <img class="media-object" src="' + status.user.profile_image_url_https + '" alt="' + status.user.name + '" />';
        html    +=  '       </a>';
        html    +=  '   </div>';
        html    +=  '   <div class="media-body">';
        html    +=  '       <h5 class="media-heading"><a href="https://twitter.com/' + status.user.screen_name  + '" target="_blank">' + status.user.screen_name + '</a></h5>';
        html    +=  '<p class="tweet-body" title="View full tweet" data-link="https://twitter.com/' + status.user.screen_name +  '/status/' + status.id_str + '">' + status.text + '</p>';
        html    +=  '   </div>';
        html    +=  '</div>';
        $('#tweets_area').prepend(html);
        $('#tweets_area').find('.tweet-single').first().fadeIn('slow');
    };

    return {
        init: _init
    };

})();

$(function() {
    APP.init();
});

