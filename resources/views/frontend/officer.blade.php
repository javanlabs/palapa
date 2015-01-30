@extends('layouts.full.full')

@section('body-class')
    frontend
@stop

@section('breadcrumb')
    <span class="trail">Jaksa</span>
@stop

@section('content')
<div class="container-fluid">
        <div class="col-md-3">
            <div class="list-group list-group-menu">
                @foreach($allPostInCategory as $item)
                <a href="{{ route('frontend.post', ['category' => $category, 'id' => $item['id']]) }}" class="list-group-item ellipsis {{ ($item['id'] == $id)?'active':'' }}">
                    <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
                    {{ $item['title'] }}
                </a>
                @endforeach
                <a href="{{ route('frontend.officer') }}" class="list-group-item ellipsis {{ ('jaksa' == $id)?'active':'' }}">
                    <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
                    Jaksa
                </a>
            </div>
        </div>
        <div class="col-md-9" style="padding-top: 40px">
            <div class="content">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="subtitle">Daftar Jaksa di Kejaksaan Negeri Jember</div>
                    </div>
                    <table class="table">
                        <tbody>
                        @foreach($officers as $key=>$jaksa)
                            <tr>
                                <td>
                                    <h4>{{ $jaksa->name }}</h4>
                                </td>
                                <td>
                                    <dl class="dl-horizontal">
                                        <dt>Pangkat / NIP</dt>
                                        <dd>{{ $jaksa->pangkat_name }} / {{ $jaksa->nip }}</dd>
                                        <dt>Jabatan</dt>
                                        <dd>{{ $jaksa->jabatan_name }}</dd>
                                    </dl>
                                </td>
                                <td>
                                    <a class="btn btn-sm btn-default btn-case-count" href="{{route('backend.cases.byJaksa', [$jaksa->id])}}">
                                        @if($jaksa['active_cases_count'] > 0)
                                            <span class="badge">{{ $jaksa['active_cases_count'] }}</span>
                                        @else
                                            <span class="">{{ $jaksa['active_cases_count'] }}</span>
                                        @endif
                                        Perkara Aktif
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

@stop

@section('script-end')
    @parent
    <script>
        $(function(){
            $(document).on('click', '.btn-case-count', function(e){
                e.preventDefault();
                $.blockUI(BLOCKUI_STYLE);
                $.get($(this).attr('href'), '', function(response, status){
                    $.unblockUI();
                    var modal = $(response);
                    modal.modal();

                    modal.find('.btn-detail').on('click', function(e){
                        e.preventDefault();
                        $('.modal-case-byJaksa').block({message:null});

                        $.get($(this).attr('href'), '', function(response, status){
                            $('.modal-case-byJaksa').unblock();
                            $(response).modal();
                        });

                    });

                });
            });
        });
    </script>
@stop
