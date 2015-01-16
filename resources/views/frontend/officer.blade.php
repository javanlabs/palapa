@extends('layouts.full.full')

@section('breadcrumb-title')
    Jaksa
@stop

@section('content')

    <div class="panel panel-default">
        <div class="panel-heading">
            Daftar Jaksa di Kejaksaan Negeri Jember
        </div>
    <table class="table">
    <tbody>
    @foreach($officers as $key=>$jaksa)
    <tr>
        <td style="padding-left:50px;">
            <h3>{{ $jaksa->name }}</h3>
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
                    <span class="label label-info">{{ $jaksa['active_cases_count'] }}</span>
                @else
                    <span class="">{{ $jaksa['active_cases_count'] }}</span>
                @endif
                Kasus Aktif
            </a>
        </td>
    </tr>
    @endforeach
    </tbody>
    </table>

    </div>

@stop

@section('script-end')
    @parent
    <script>
        $(function(){
            $(document).on('click', '.btn-case-count', function(e){
                e.preventDefault();
                $.blockUI({message:null});
                $.get($(this).attr('href'), '', function(response, status){
                    $.unblockUI();
                    var modal = $(response);
                    modal.modal();

                });
            });
        });
    </script>
@stop
