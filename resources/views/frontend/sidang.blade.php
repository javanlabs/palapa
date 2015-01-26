@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail">Jadwal Sidang</span>
@stop

@section('content')

    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="subtitle">Jadwal Sidang di Kejaksaan Negeri Jember</div>
        </div>
        <table class="table">
            <tbody>
            @forelse($cases as $item)
                <tr>
                    <td>
                        <h3>
                            <a href="{{ $item['permalink'] }}" class="btn-detail court">
                                {{ $item['name'] }}
                            </a>
                        </h3>
                    </td>
                    <td style="padding-top: 20px">
                        {{$item['persidangan_date_for_human']}}
                    </td>
                    <td style="padding-top: 20px">
                        <span class="badge">{{ $item['schedule_for_human'] }}</span>
                    </td>
                    <td style="padding-top: 20px">
                        <a href="{{ $item['permalink'] }}" class="btn-detail btn btn-default">
                            Info Kasus <i class="ion-ios-arrow-forward"></i>
                        </a>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4"><div class="empty text-center">Saat ini belum ada jadwal sidang.</div></td></tr>
            @endforelse
            </tbody>
        </table>

    </div>

@stop

@section('script-end')
    @parent
    <script>
        $(function(){
            $('.btn-detail').on('click', function(e){
                e.preventDefault();
                $.blockUI(BLOCKUI_STYLE);

                $.get($(this).attr('href'), '', function(response, status){
                    $.unblockUI();
                    $(response).modal('show');
                    $(response).on('hidden.bs.modal', function(e){
                        $(response).remove();
                    });
                });
            });

        });
    </script>
@stop
