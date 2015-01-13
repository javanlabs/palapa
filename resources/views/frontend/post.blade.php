@extends('layouts.full.full')
@section('content')
    <div class="container-fluid" id="page-post-view">
        <div class="col-md-4">
            <div class="list-group">
                @foreach($allPostInCategory as $item)
                <a href="{{ route('frontend.post', ['category' => $category, 'id' => $item['id']]) }}" class="list-group-item ellipsis {{ ($item['id'] == $id)?'active':'' }}">
                    <span class="badge"><i class="fa fa-2x fa-chevron-right"></i></span>
                    {{ $item['title'] }}
                </a>
                @endforeach
            </div>
        </div>
        <div class="col-md-8">
            @if($post)
                <h2>{{$post->title}}</h2>
                {{$post->content}}
            @else
                <div class="empty">
                    <i class="fa fa-long-arrow-left"></i> Silakan pilih menu disamping.
                </div>
            @endif
        </div>
    </div>
@stop
