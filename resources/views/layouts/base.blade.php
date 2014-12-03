<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="title" content="{{ Config::get('meta.title') }}"/>
    <meta name="description" content="{{ Config::get('meta.description') }}"/>
    <title>{{ Config::get('meta.title') }}</title>

    <!-- Bootstrap -->
    <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Lato:300, 400,700'>
    <link rel="stylesheet" href="{{ asset('vendor/bootstrap/bootstrap.min.css') }}">
    {{--<link rel="stylesheet" href="{{ asset('vendor/bootflat/css/bootflat.css') }}">--}}

    @yield('style-head')

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    @yield('script-head')

  </head>
  <body class="@yield('body-class')">

    @yield('body')

    <script src="{{ asset('vendor/jquery-1.10.1.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/bootstrap.min.js') }}"></script>

    @yield('script-end')

  </body>
</html>
