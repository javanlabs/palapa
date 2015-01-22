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

</head>

<body id="screensaver">

<a href="{{ route('home') }}" id="btn-stop">Exit Screensaver</a>

<div id="wrap">
    @foreach($images as $item)
        <img class="bgfade" src="{{ $item }}">
    @endforeach
</div>

<div id="content" rel="content-1" class="content"></div>

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
    {{--@foreach($videos as $item)--}}
        {{--<div class="item" data-played="0" data-type="mp4" data-url="{{ $item }}"></div>--}}
    {{--@endforeach--}}
</div>

<script src="{{ asset('vendor/jquery/jquery-1.11.1.min.js') }}"></script>
<script src="{{ asset('vendor/jquery.vticker.js') }}"></script>
<script src="{{ asset('vendor/jquery.idle.min.js') }}"></script>

<script>
    $(window).load(function(){
        $('img.bgfade').hide();
        var dg_H = $(window).height();
        var dg_W = $(window).width();
        $('#wrap').css({'height':dg_H,'width':dg_W});
        function anim() {
            $("#wrap img.bgfade").first().appendTo('#wrap').fadeOut(1500);
            $("#wrap img").first().fadeIn(1500);
            setTimeout(anim, 5000);
        }
        anim();
    })

    $(function(){

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

//        playContent($('#content'));

    });

    var timer = false;

    function playContent(container){
        if(timer)
        {
            clearTimeout(timer);
        }

        var found = false;
        var playlist = $('#playlist');
        if(container.find('img').length > 0){
            var img = container.find('img');
            img.animate({'opacity':0}, 1000, function(){img.remove();});
        }else{
            container.html("");
        }
        playlist.find('.item').each(function(idx, elm){
            if($(elm).data('played') == 0){
                $(elm).data('played', 1);
                found = true;
                show(container, $(elm));
                return false;
            }
        });

        if(!found){
            playlist.find('.item').each(function(idx, elm){
                $(elm).data('played', 0);
            });
            playContent(container);
        }
    }

    function show(container, elm){
        switch(elm.data('type')){
            case 'mp4':
                var video = $('<video class="item" controls="controls" autoplay="autoplay">');

                var containerWidth = container.css('width');
                var containerHeight = container.css('height');

                if (containerWidth > containerHeight) {
                    video.attr('height', container.css('height'));
                }else{
                    video.attr('width', container.css('width'));
                }
                video.attr('width', '100%');
                var source = $('<source type="video/mp4; codecs=\'avc1.42E01E, mp4a.40.2\'">').attr('src', elm.data('url'));
                video.append(source);
                video.bind('ended', function(){
                    playContent(container);
                });
                container.append(video);
                video.load();
                video.play();
                break;
            case 'jpg':
            case 'JPG':
            case 'jpeg':
            case 'JPEG':
            case 'png':
            case 'PNG':
            case 'gif':
            case 'GIF':
                var img = $('<img class="item img-responsive" >').attr('src', elm.data('url')).css('opacity', 0);
                container.append(img);
                img.animate({'opacity':1}, 2000);
                img.css('left', img.parent().offset().left);

//                var containerWidth = img.parent().css('width');
//                var containerHeight = img.parent().css('height');
//
//                if (containerWidth > containerHeight) {
//                    img.css('height', img.parent().css('height'));
//                }else{
//                    img.css('width', img.parent().css('width'));
//                }


                timer = setTimeout(function(){playContent(container)}, 3000);
                break;
        }
    }
</script>
</body>
</html>
