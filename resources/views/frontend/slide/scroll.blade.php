@extends('frontend.slide.layout')

@section('body-class')
    scroll
@endsection

@section('style-head')

@endsection

@section('script-head')

@endsection

@section('content')
    <div id="ss-wrapper" class="ss-wrapper">
        <div class="ss-container">
            <div class="inner">
            @foreach($images as $img)
                <img src="{{ $img['url'] }}" data-width="{{ $img['width'] }}" data-height="{{ $img['height'] }}"/>
            @endforeach
            </div>
        </div>
        {{--<div class="ss-overlay"></div>--}}
    </div>
@stop

@section('script-end')
    <script>
        var SLIDE_INTERVAL = {{ Config::get('slide.interval')  }};
        var IMAGE_COUNT = {{ count($images)  }};

        $(function() {
            var imageHeight = 0;
            var imageCount = $('.ss-container .inner').children('img').length;
            var windowHeight = $(window).height();
            var loaded = 0;
            var isAnim = false;

            $('html, body').animate({scrollTop: 0}, 0);

            $('.ss-container img').load(function(){

                    var img = $(this);
                    imageHeight += img.height();
                    loaded++;

                    if(loaded == imageCount)
                    {
                        var delta = imageHeight - windowHeight;
                        var duration = (delta / 50 ) * 1000;

                        if(!isAnim)
                        {
                            isAnim = true;
                            setTimeout(function(){
                                $('html, body').animate({scrollTop: delta}, duration, 'linear', function(){
                                    setTimeout(function(){
                                        $.blockUI(BLOCKUI_STYLE);
                                        window.location.href = '{{ route('slide.sidang')  }}';
                                    }, 2000);
                                });
                            }, 2000);
                        }
                    }

            });

        });
    </script>
@endsection