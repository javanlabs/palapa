@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail">{{ array_get($types, Input::get('type', 201), 'Cari Kasus') }}</span>
@stop

@section('content')

    <div class="container-fluid">
        <div class="col-md-3">
            <div class="list-group list-group-menu">
                <a href="{{ route('frontend.search') }}?type={{ $type }}" class="list-group-item ellipsis">
                    <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
                    Daftar Kasus
                </a>
                @foreach($allPostInCategory as $item)
                    <a href="{{ route('frontend.post.byCaseType', ['id' => $item['id']]) }}" class="list-group-item ellipsis {{ (isset($post) && ($item['id'] == $id))?'active':'' }}">
                        <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
                        {{ $item['title'] }}
                    </a>
                @endforeach
            </div>
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
