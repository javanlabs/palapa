<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="title" content="{{ Config::get('meta.title') }}" />
    <meta name="description" content="{{ Config::get('meta.title') }}" />
    <title>{{ Config::get('meta.title') }}</title>

    <link rel="icon"
          type="image/png"
          href="{{asset('favicon.ico')}}">
    <link rel="stylesheet" href="{{ asset('compiled/bootstrap-custom.min.css') }}">
    <link href="{{ asset('vendor/videojs/video-js.css') }}" rel="stylesheet">
    <script src="{{ asset('vendor/videojs/video.js') }}"></script>
    <script src="{{ asset('vendor/videojs/videojs-playlists.js') }}"></script>
</head>

<body id="screensaver">
<div class="bx-overlay"></div>
<a href="{{ route('home') }}" id="btn-stop">Exit Screensaver</a>

<div id="wrap" class="section-image">
    @foreach($images as $item)
        <img class="bgfade" src="{{ $item }}">
    @endforeach
</div>

<div id="slider" class="">
    <div id="items-slider">
        <ul>
            @foreach($cases as $item)
            <li>
                <div class="item">
                    <h3 class="name">Sidang {{ $item['name'] }}</h3>
                    <div class="time">{{ $item['schedule_for_human'] }}</div>
                </div>
            </li>
            @endforeach
        </ul>
    </div>
</div>

<div id="playlist" style="display: none">
    @foreach($images as $item)
        <div class="item" data-played="0" data-type="jpg" data-url="{{ $item }}"></div>
    @endforeach
    @foreach($videos as $item)
        <div class="item" data-played="0" data-type="mp4" data-url="{{ $item['src'][0] }}"></div>
    @endforeach
</div>

<script src="{{ asset('vendor/jquery/jquery-1.11.1.min.js') }}"></script>
<script src="{{ asset('vendor/jquery.vticker.js') }}"></script>
<script src="{{ asset('vendor/jquery.idle.min.js') }}"></script>

<div class="section-video">
    <video id="video"
           class="video-js vjs-default-skin"
           preload="auto"
            >
        <source src="http://palapa.dev/upload/slide/videos/small.mp4" type='video/mp4'>
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser
            that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
    </video>
</div>

<script>
    (function($){

        var playlist = {
            init : function(){
                this.initVideo();
                this.bindEvents();
            },
            initVideo : function(){
                this.player = videojs('video');
                this.player.playList({{ json_encode($videos) }});

                $('.section-video').show();
                $('.section-image').hide();
                this.player.play();

            },
            bindEvents : function(){
                this.player.on('next', function(e){
//                    playlist.adjustDimension();
                });
                this.player.on('lastVideoEnded', function(e){
                    anim();
                });
            },
            adjustDimension: function(){
//                var top = ($(document).height() - $('.section-video').height()) / 2;
//                $('.video-js .vjs-tech').css('top', top + 'px');
            }
        };

        var imageCounter = 0;
        var imageCount = {{ count($images) }};

        function anim() {
            $('.section-video').hide();
            $('.section-image').show();
            $("#wrap img.bgfade").first().appendTo('#wrap').fadeOut(1500);
            $("#wrap img").first().fadeIn(1500);
            imageCounter++;

            if(imageCounter >= imageCount) {
                imageCounter = 0;
                playlist.init();
            }
            else {
                setTimeout(anim, 5000);
            }
        }

        $(window).load(function(){
            $('img.bgfade').hide();
            var dg_H = $(window).height();
            var dg_W = $(window).width();
            $('#wrap').css({'height':dg_H,'width':dg_W});
        })


        $(document).idle({
            onIdle: function(){
                $('#btn-stop').hide()
            },
            onActive: function(){
                $('#btn-stop').show()
            },
            idle: 1000
        })

        $('#items-slider').vTicker({
            speed: 500,
            pause: 5000,
            animation: 'fade',
            mousePause: false,
            showItems: 8
        });


        playlist.init();
//        anim();
    })(jQuery);
</script>
</body>
</html>
