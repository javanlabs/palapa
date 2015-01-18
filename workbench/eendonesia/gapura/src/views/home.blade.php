@extends('dekor::layouts.full')

@section('content')

<div class="container">
    <h2>Welcome Home</h2>
    <p>{{ Auth::user()->email }}</p>
    <a href="{{ route('gapura.logout') }}">Logout</a>
</div>

@stop
