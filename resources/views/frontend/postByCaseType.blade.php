@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail">{{ array_get($types, Input::get('type', 201), 'Cari Kasus') }}</span>
@stop

@section('content')

    <div class="container-fluid">
        <div class="col-md-3">
            @include('frontend.tab', ['active' => $post->id])
        </div>
        <div class="col-md-9" style="margin-top: 40px">
            <h2 class="page-title">{{$post->title}}</h2>
            {{$post->content}}
        </div>

    </div>



@stop

@section('script-end')
    @parent
    <script>
        $(function(){

        });
    </script>
@stop
