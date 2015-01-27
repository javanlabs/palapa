@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail">Jadwal Sidang</span>
@stop

@section('content')

    <div class="container-fluid" style="margin-top: 40px">
        <div class="col-md-3">
            <div class="panel panel-default text-center">
                <div class="panel-heading">Pilih Tanggal</div>
                <div class="panel-body">
                    <div class="date-selection"></div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="subtitle">Jadwal Sidang @if($date) <span class="badge">{{ $dateForHuman }}</span> @endif</div>
                </div>
                <table class="table">
                    <tbody>
                    @forelse($courts as $item)
                        <tr>
                            <td>
                                <h3>
                                    <a href="{{ $item['cases']['permalink'] }}" class="btn-detail court">
                                        {{ $item['agenda'] }}
                                    </a>
                                </h3>
                            </td>
                            <td style="padding-top: 20px">
                                {{$item['date_for_human']}}
                            </td>
                            <td style="padding-top: 20px">
                                <span class="badge">{{ $item['schedule_for_human'] }}</span>
                            </td>
                            <td style="padding-top: 20px">
                                <a href="{{ $item['cases']['permalink'] }}" class="btn-detail btn btn-default">
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
        </div>
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

            $('.date-selection').datepicker({clearBtn: true});
            $('.date-selection').datepicker('setDate', '{{ Input::get('date')  }}');
            $('.date-selection').on('changeDate', function(e){
                location.href = '{{ route('frontend.sidang') }}?date=' + e.format();
            });

        });
    </script>
@stop
