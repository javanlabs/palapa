@extends('layouts.single')

@section('content')
<div>

    <div class="col-md-7">
        <dl class="dl-horizontal case-info">
            <dt>Kasus :</dt>
            <dd><p class="lead">{{ $case['name'] }}</p></dd>
            <dt>Tersangka :</dt>
            <dd>{{ $case['suspect_name'] }}</dd>
            <dt>Jaksa :</dt>
            <dd>{{ $case['prosecutor_name'] }}</dd>
            <dt>Usia Kasus :</dt>
            <dd>{{ $case['age'] }} hari</dd>
            <dt>Status :</dt>
            <dd><span class="label label-primary">{{ $case['status_name'] }}</span></dd>
        </dl>
        <hr/>

        <table class="table table-striped">
        <caption>Riwayat Aktivitas</caption>
        @foreach($activities as $item)
        <tr>
            <td><small class="text-muted">{{ $item['date'] }}</small></td>
            <td>{{ $item['name'] }}</td>
            <td>{{ $item['note'] }}</td>
        </tr>
        @endforeach
        </table>

    </div>

<div class="col-md-5">
        <h4>Progress Kasus</h4>
<div class="panel panel-default">
    @foreach($sop as $phase => $checklist)
    <div class="panel-heading">{{ $phase }}</div>
    <ul class="list-group">
        @foreach($checklist as $item)
        <li class="list-group-item">
            <div class="checkbox">
                <label>
                    <input type="checkbox"/>
                    {{ $item['checklist'] }}
                </label>
            </div>
        </li>
        @endforeach
    </ul>
    @endforeach
    </div>
</div>

@stop

@section('style-head')
@parent
<style>
    .case-info {font-size: 1.2em;}
    .case-info dd, .case-info dt {line-height: 2em;}
</style>
@stop
