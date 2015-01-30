@extends('layouts.full.full')

@section('body-class')
    frontend
@stop

@section('breadcrumb')
    <span class="trail">{{ $category }}</span>
@stop

@section('content')
    <div class="container-fluid" id="page-post-view">
        <div class="col-md-3">
            <div class="list-group list-group-menu">
                @foreach($allPostInCategory as $item)
                <a href="{{ route('frontend.post', ['category' => $category, 'id' => $item['id']]) }}" class="list-group-item ellipsis {{ ($item['id'] == $id)?'active':'' }}">
                    <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
                    {{ $item['title'] }}
                </a>
                @endforeach
                @if($category == 'pembinaan')
                <a href="{{ route('frontend.officer') }}" class="list-group-item ellipsis {{ ('jaksa' == $id)?'active':'' }}">
                    <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
                    Jaksa
                </a>
                @endif
            </div>
        </div>
        <div class="col-md-9" style="padding-top: 40px">
            <div class="content">
                @if($post)
                    <h2 class="page-title">{{$post->title}}</h2>
                    {{$post->content}}
                @else
                    <div class="empty text-center">
                        <i class="fa fa-long-arrow-left"></i> Silakan pilih menu disamping.
                    </div>
                @endif
            </div>
        </div>
    </div>
@stop
