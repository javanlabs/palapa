<div id="slider">
    <div id="items-slider">
        <ul>
            @foreach($items as $item)
                <li>
                    <div class="item">
                        <h3 class="name">Sidang {{ $item['agenda'] }}</h3>
                        <div class="time">{{$item['date_for_human']}}</div>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
</div>

@section('script-end')
    @parent
    <script src="{{ asset('vendor/jquery.vticker.js') }}"></script>

    <script>
        $(function(){
            $('#items-slider').vTicker({
                speed: 500,
                pause: {{ Config::get('slide.interval') }},
                animation: 'fade',
                mousePause: false,
                showItems: 8
            });
        });
    </script>
@stop