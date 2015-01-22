<div id="slider">
    <div id="items-slider">
        <ul>
            @foreach($cases as $item)
                <li>
                    <div class="item">
                        <h3 class="name">Sidang {{ $item['name'] }}</h3>
                        <div class="time">{{$item['persidangan_date_for_human']}}</div>
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
                pause: 5000,
                animation: 'fade',
                mousePause: false,
                showItems: 8
            });
        });
    </script>
@stop