<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="title" content="{{ Config::get('meta.title') }}" />
    <meta name="description" content="{{ Config::get('meta.title') }}" />
    <title>{{ Config::get('meta.title') }}</title>

    {{--<link rel="stylesheet" href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}">--}}
    <link rel="stylesheet" href="{{ asset('compiled/bootstrap-custom.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/font-awesome/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/ionicons/css/ionicons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/animate.css') }}">

    @yield('style-head')

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="{{ asset('vendor/html5shiv.min.js') }}"></script>
    <script src="{{ asset('vendor/respond.min.js') }}"></script>
    <![endif]-->

    @yield('script-head')

</head>

<body class="@yield('body-class')">

    @yield('body')

    <footer class="text-center text-muted">
        <i class="fa fa-university"></i>
        <br/>
        <small>&copy; {{ date('Y') }} Kejaksaan Negeri Jember</small>
    </footer>
    <script src="{{ asset('vendor/jquery/jquery-1.11.1.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('vendor/moment-with-locales.js') }}"></script>
    <script src="{{ asset('vendor/jquery.cookie.js') }}"></script>
    <script src="{{ asset('vendor/jquery.blockUI.js') }}"></script>

    @yield('script-end')

</body>
</html>
