@extends('slide.layout')

@section('style-head')
    <link href="{{ asset('vendor/videojs/video-js.css') }}" rel="stylesheet">
@endsection

@section('script-head')
    <script src="{{ asset('vendor/videojs/video.js') }}"></script>
    <script src="{{ asset('vendor/videojs/videojs-playlists.js') }}"></script>
@endsection

@section('content')

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

@stop

@section('script-end')
    <script>
        (function(){

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
                        $.blockUI(BLOCKUI_STYLE);
                        window.location.href = '{{ route('slide.image')  }}';
                    });
                }
            };

            playlist.init();

        })(jQuery);
    </script>
@endsection