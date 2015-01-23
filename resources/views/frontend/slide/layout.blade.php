<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="title" content="{{ Config::get('meta.title') }}" />
    <meta name="description" content="{{ Config::get('meta.title') }}" />
    <title>{{ Config::get('meta.title') }}</title>

    <link rel="icon" type="image/png" href="{{asset('favicon.ico')}}">
    <link rel="stylesheet" href="{{ asset('compiled/bootstrap-custom.min.css') }}">

    @yield('style-head')
    @yield('script-head')
    <script src="{{ asset('vendor/jquery/jquery-1.11.1.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery.idle.min.js') }}"></script>
</head>

<body id="screensaver">
<a href="{{ route('home') }}" id="btn-stop">Exit Screensaver</a>

@yield('content')

<script src="{{ asset('vendor/jquery.blockUI.js') }}"></script>
<script src="{{ asset('compiled/app.js') }}"></script>
@yield('script-end');

<script>
    (function($){

        $(document).idle({
            onIdle: function(){
                $('#btn-stop').hide()
            },
            onActive: function(){
                $('#btn-stop').show()
            },
            idle: 1000
        })

    })(jQuery);
</script>
</body>
</html>
