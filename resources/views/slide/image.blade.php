@extends('slide.layout')

@section('style-head')
<link rel="stylesheet" type="text/css" href="{{ asset('vendor/photoswipe/photoswipe.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ asset('vendor/photoswipe/default-skin/default-skin.css') }}" />
<style>
    .pswp__container_transition {
        -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
        transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
    }
</style>
@endsection

@section('script-head')
<script src="{{ asset('vendor/photoswipe/photoswipe.min.js') }}"></script>
<script src="{{ asset('vendor/photoswipe/photoswipe-ui-default.min.js') }}"></script>

@endsection

@section('content')
        <!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
@stop

@section('script-end')
    <script>
        var SLIDE_INTERVAL = {{ Config::get('slide.interval')  }};
        var IMAGE_COUNT = {{ count($images)  }};

        setTimeout(function(){
            $.blockUI(BLOCKUI_STYLE);
            window.location.href = '{{ route('slide.scroll')  }}';
        }, SLIDE_INTERVAL * IMAGE_COUNT * 2);

        var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var items = {{ json_encode($images) }};

        // define options (if needed)
        var options = {
            barsSize: {top:0, bottom:'auto'},
            index: 0, // start at first slide
            closeEl:true,
            captionEl: false,
            fullscreenEl: false,
            zoomEl: false,
            shareEl: false,
            counterEl: true,
            arrowEl: false,
            preloaderEl: true,
            showHideOpacity:true,
            closeOnScroll:false,
            tapToClose: false,
            escKey: false,
            arrowKeys: false,
            history: false,
            closeElClasses: [],
        };

        // Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        setInterval(function(){
            gallery.next();
        }, SLIDE_INTERVAL);
    </script>
@endsection
