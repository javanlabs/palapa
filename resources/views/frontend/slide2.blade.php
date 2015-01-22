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
    <script src="{{ asset('vendor/jquery/jquery-1.11.1.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery.idle.min.js') }}"></script>
</head>

<body id="screensaver">
<div class="bx-overlay"></div>
<a href="{{ route('home') }}" id="btn-stop">Exit Screensaver</a>

@include('frontend.ticker', ['cases' => $cases])

<div class="section-video">
    <video id="video"
           class="video-js vjs-default-skin"
           preload="auto"
           autoplay="true"
            >
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser
            that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
    </video>
</div>

@yield('script-end');

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
                this.player.play();

            },
            bindEvents : function(){
                this.player.on('next', function(e){

                });
                this.player.on('lastVideoEnded', function(e){
//                    playlist.player.playList(0)
                });
            }
        };


        $(document).idle({
            onIdle: function(){
                $('#btn-stop').hide()
            },
            onActive: function(){
                $('#btn-stop').show()
            },
            idle: 1000
        })


        playlist.init();

    })(jQuery);
</script>
</body>
</html>
