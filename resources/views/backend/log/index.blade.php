@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Log</span>
@stop

@section('content-admin')
    <h2 class="page-title">Log Aplikasi</h2>

    <div class="panel panel-default">
        <table class="table">
            @foreach($logs as $item)
                <tr>
                    <td>{{ $item->subject_name }}</td>
                    <td>{{ trans('event.' . $item->predicate) }}</td>
                    <td>{{ $item->object_name }}</td>
                    <td class="text-right"><small class="text-muted">{{ $item['time_for_human'] }}</small></td>
                </tr>
            @endforeach
        </table>
        <div class="panel-footer">{{ $logs->render() }}</div>
    </div>
@stop