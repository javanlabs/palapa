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
    <script src="{{ asset('vendor/jquery/jquery-1.11.1.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery.idle.min.js') }}"></script>
</head>

<body id="screensaver" class="screensaver-5">
    <a href="{{ route('home') }}" id="btn-stop">Exit Screensaver</a>
    @include('frontend.ticker', ['cases' => $cases])

    <table class="section-left">
        <tr><td>slideshow</td></tr>
        <tr><td>text</td></tr>
    </table>

    @yield('script-end');

<script>
    $(document).ready(function() {

    });
</script>
</body>
</html>
