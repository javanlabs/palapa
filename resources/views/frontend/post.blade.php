@extends('layouts.frontend.frontend')
@section('content')
<h2>{{$post->title}}</h2>
{{$post->content}}
@stop
