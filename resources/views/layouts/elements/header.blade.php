<nav class="navbar navbar-header" role="navigation">
    <div class="container-fluid">
        <div class="col-md-6">
            <div class="clock hidden animated fadeInDownBig">
                <div class="block-date"><span class="day" id="clock-day"></span><span class="date" id="clock-date"></span></div>
                <div class="time" id="clock-time"></div>
            </div>
        </div>
        <div class="col-md-6 text-right">
            <img class="logo" src="{{ asset('images/logo-kejari.jpg') }}" alt=""/>
            <h1>APLIKASI MONITORING KASUS</h1>
            <h3>Kejaksaan Negeri Jember</h3>
        </div>
    </div>
</nav>

<div class="clearfix"></div>

@section('script-end')
    @parent
    <script>
        function clockTick()
        {
            $('#clock-time').html(moment().format("HH:mm:ss"));
            $('#clock-day').html(moment().format("dddd"));
            $('#clock-date').html(moment().format("D MMMM YYYY"));
        }

        $(function(){

            // remove animation class for next visit
            var key = 'animation-' + moment().format("D");

            if($.cookie(key) != undefined) {
                $('.clock').removeClass('animated');
                $('.clock').removeClass('hidden');
            }
            $.cookie(key, true, {expires: 30});

            clockTick();
            setInterval(clockTick, 1000);
            setTimeout(function(){
                $('.clock').removeClass('hidden');
            }, 1000);

        });
    </script>
@stop