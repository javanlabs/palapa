@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Log</span>
@stop

@section('content-admin')
    <div id="page-log-index">

        <form action="" class="mb">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Cari berdasar nama pengguna atau kasus posisi ..." value="{{ Input::get('q') }}">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="submit">Cari</button>
                </span>
            </div>
            <!-- /input-group -->
        </form>

        <div class="panel panel-default">
            <div class="panel-heading">Log Aplikasi</div>
            <table class="table table-bordered table-list list-log">
                @forelse($logs as $item)
                    <tr>
                        <td class="pad">
                            <div class="">
                                {{ $item->subject_name }}
                                <strong>{{ trans('event.' . $item->predicate) }}</strong>
                                {{ $item->object_name }}
                            </div>
                            <div class="ell">
                                <small class="text-muted"><i class="ion-clock"></i> {{ $item['time_for_human'] }}</small>
                                <small class="text-muted">dalam perkara <a class="btn-detail" href="{{ $item->cases->permalink }}">{{ $item->cases->name }}</a></small>
                            </div>
                        </td>
                    </tr>
                @empty
                    <div class="empty">Belum ada data</div>
                @endforelse
            </table>
            <div class="panel-footer">{{ $logs->appends(['q' => Input::get('q')])->render() }}</div>
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

        });
    </script>
@stop