@extends('frontend.slide.layout')

@section('style-head')

@endsection

@section('script-head')

@endsection

@section('content')

    @include('frontend.ticker', ['cases' => $cases])

@stop

@section('script-end')
    <script src="{{ asset('vendor/jquery.backstretch.min.js') }}"></script>
    <script>
        var SLIDE_INTERVAL = {{ Config::get('slide.interval')  }};
        var ITEM_COUNT = {{ count($cases)  }};

        setTimeout(function(){
            $.blockUI(BLOCKUI_STYLE);
            window.location.href = '{{ route('slide.video')  }}';
        }, SLIDE_INTERVAL * ITEM_COUNT * 2);

        $(function(){
            $.backstretch("{{ asset('images/wallpaper.jpg')  }}");
        });
    </script>

@endsection