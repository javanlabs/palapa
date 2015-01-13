<nav class="navbar navbar-header" role="navigation">
    <div class="container-fluid">
        <div class="col-md-6">
            <img class="logo" src="{{ asset('images/logo-kejari.jpg') }}" alt=""/>
            <h1>APLIKASI MONITORING KASUS</h1>
            <h3>Kejaksaan Negeri Jember</h3>
        </div>
        <div class="col-md-6 text-right">
            <div class="clock hidden animated fadeInDownBig">
                <div class="time" id="clock-time"></div>
                <div class="block-date"><span class="day" id="clock-day"></span><span class="date" id="clock-date"></span></div>
            </div>
        </div>
    </div>
</nav>

@section('script-end')
    @parent
    <script>
        $(function(){
            moment.locale('id');
            setInterval(function(){
                $('#clock-time').html(moment().format("HH:mm:ss"));
                $('#clock-day').html(moment().format("dddd"));
                $('#clock-date').html(moment().format("D MMMM YYYY"));
            }, 1000);
            setTimeout(function(){
                $('.clock').removeClass('hidden');
            }, 1000);
        });
    </script>
@stop