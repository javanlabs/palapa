<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="title" content="Application Title" />
    <meta name="description" content="Application Description" />
    <title>Application Title</title>

    <link rel="stylesheet" href="{{ asset('packages/eendonesia/dekor/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('packages/eendonesia/dekor/font-awesome/css/font-awesome.min.css') }}">

    @yield('style-head')

    <!-- HTML5 shim and Respond.js for IE8 support of HTM   L5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    @yield('script-head')

</head>

<body class="@yield('body-class')">

    @yield('header')

    {{--@include('layouts.elements.alert')--}}

    @yield('body')

    <script src="{{ asset('packages/eendonesia/dekor/jquery/jquery-1.11.1.min.js') }}"></script>
    <script src="{{ asset('packages/eendonesia/dekor/bootstrap/js/bootstrap.min.js') }}"></script>

    @yield('script-end')

</body>
</html>
