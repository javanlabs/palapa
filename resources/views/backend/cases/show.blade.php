@extends('layouts.admin.admin-full')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail"><a href="{{ route('backend.cases.index') }}">Manajemen Perkara</a></span>
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">{{ $case['spdp_number'] }}</span>
@stop

@section('content-admin')
<div id="page-case-sop">
    <div class="pad-lg case-info">
        <div class="panel panel-default">
            @include('modules.case.tabular', ['case' => $case])
            <div class="panel-footer">
                <div class="text-right action">
                    <a href="/backend/cases/edit/{{$case['id']}}" class="btn btn-default btn-xs">Ubah Data</a>
                    {{ Form::delete(route('backend.cases.delete', $case['id']), 'Hapus Kasus', ['class' => 'form-delete'], ['class' => 'btn btn-danger btn-xs']) }}
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid section-entry">

        <div class="col-md-6">
            <div class="panel panel-default panel-checklist">
                @foreach($phases as $phase)
                    <div class="panel-heading">
                        <h4>{{ $phase['name'] }}</h4>
                        @if(isset($phaseHistories[$phase['id']]))
                            <div class="text-muted">
                                @if($phaseHistories[$phase['id']]['current_duration'])
                                    <span class="label label-default">{{ $phaseHistories[$phase['id']]['current_duration'] }} hari</span>
                                @else
                                    <span class="label label-danger">tanggal tidak valid</span>
                                @endif

                                <small>
                                {{ $phaseHistories[$phase['id']]['start_date'] }}
                                s/d
                                @if($phaseHistories[$phase['id']]['finish_date'])
                                    {{ $phaseHistories[$phase['id']]['finish_date'] }}
                                @else
                                    ...
                                @endif
                                </small>
                            </div>
                        @endif
                    </div>
                    <ul class="list-group items {{ (($phase->id > $case['phase']['id']) && $phase->id != $case['phase_id'])?'disabled':'' }}">
                        @foreach($phase['checklist'] as $item)

                            @if(in_array($item['id'], $checklistIds))
                                <li class="list-group-item list-group-item-success">

                                    @if($case->isLatestChecklist($item))
                                        {{ Form::open(['route' => ['backend.cases.unchecklist', $case->id, $item['id']], 'method' => 'post', 'class' => 'pull-right']) }}
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                                        {{ Form::submit('Batal', ['class' => 'btn btn-xs btn-danger']) }}
                                        {{ Form::close() }}
                                    @endif

                                    <i class="fa fa-check"></i>
                                    {{ $item['name'] }}<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span class='small'><i>{{$case->getChecklistDate($item['id'])}}</i></span>
                                    <a href="{{ route('backend.cases.checklist.edit', [$case['id'], $item['id']]) }}" class="btn btn-xs btn-default btn-edit">Edit</a>


                                </li>
                            @else
                                <li class="list-group-item item-checklist" data-id="{{ $item['id'] }}" data-url="{{ route('backend.cases.checklist', [$case['id'], $item['id']]) }}">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="checklist[]" value="{{ $item['id'] }}"/>
                                            {{ $item['name'] }}

                                            @if($phase->id == $case['phase_id'])
                                                <?php $remaining = $sop->checklistRemainingDay($case, $item) ?>
                                                &nbsp;&nbsp;
                                                @if($remaining)
                                                    @if($remaining > 0)
                                                        <small class="label label-success">{{ $remaining }} hari lagi</small>
                                                    @else
                                                        <small class="label label-danger">lewat {{ abs($remaining) }} hari</small>
                                                    @endif
                                                @endif
                                            @endif
                                        </label>
                                    </div>
                                </li>
                            @endif

                        @endforeach
                    </ul>
                @endforeach
            </div>

        </div>

    <div class="col-md-6">
        <div class="panel panel-default box-tersangka">
            <div class="panel-heading">
                <i class="icon ion-ios-body"></i> Tersangka
                <a href="/backend/suspect/create?case_id={{$case->id}}" class="btn btn-default btn-xs pull-right"><i class="ion-android-add"></i> Tambah</a>
            </div>
            <table class="table table-list items">
                @forelse($case->suspects as $item)
                    <tr>
                        <td>
                            <a class="item" href="{{ route('backend.suspect.show', [$item['id']]) }}">
                                <h5 class="name ell">{{ $item['sex_icon'] }} {{ $item['name'] }}</h5>
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td><small class="empty">Belum Ada</small></td>
                    </tr>
                @endforelse
            </table>
        </div>

        <div class="panel panel-default box-tersangka">
            <div class="panel-heading">
                <i class="icon ion-eye"></i> Saksi
                <a href="/backend/witness/create?case_id={{$case->id}}" class="btn btn-default btn-xs pull-right"><i class="ion-android-add"></i> Tambah</a>
            </div>
            <table class="table table-list items">
                @forelse($case->witness as $item)
                    <tr>
                        <td>
                            <a class="item" href="{{ route('backend.witness.show', [$item['id']]) }}">
                                <h5 class="name ell">{{ $item['sex_icon'] }} {{ $item['name'] }}</h5>
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td><small class="empty">Belum Ada</small></td>
                    </tr>
                @endforelse
            </table>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="icon ion-briefcase"></i> Barang Bukti
                <a href="{{ route('backend.evidences.create', ['case_id' => $case['id']]) }}" class="btn btn-default btn-xs pull-right"><i class="ion-android-add"></i> Tambah</a>
            </div>
            <table class="table table-list items">
                @forelse($evidences as $item)
                    <tr>
                        <td>
                            {{ $item['name'] }}
                        </td>
                        <td width="150px" class="text-center">
                            {{ Form::delete(route('backend.evidences.destroy', [$item['id']]), '<i class="ion-backspace-outline"></i> Hapus', ['class' => 'form-delete'], ['class' => 'btn btn-xs btn-link btn-delete']) }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td><small class="empty">Belum Ada</small></td>
                    </tr>
                @endforelse
            </table>
        </div>

        <div class="panel panel-default box-sidang">
            <div class="panel-heading">
                <i class="icon fa fa-gavel"></i> Jadwal Sidang
                <a href="{{ route('backend.courts.create', ['case_id' => $case['id']]) }}" class="btn btn-default btn-xs pull-right"><i class="ion-android-add"></i> Tambah</a>
            </div>
            <table class="table table-list items">
                @forelse($case->courts as $item)
                    <tr>
                        <td>
                            <div><small class="text-muted">{{ $item['date_for_human'] }}</small></div>
                        </td>
                        <td>{{ $item['agenda'] }}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn btn-xs btn-default" href="{{ route('backend.courts.edit', [$item['id']]) }}">Edit</a>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3"><small class="empty">Belum Ada</small></td>
                    </tr>
                @endforelse
            </table>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="icon ion-person-stalker"></i> Jaksa Anggota
                <a href="{{ route('backend.cases.member.add', [$case['id']]) }}" class="btn btn-default btn-xs pull-right"><i class="ion-android-add"></i> Tambah</a>
            </div>
            <table class="table table-list items">
                @forelse($case->members as $item)
                    <tr>
                        <td>
                            <h5 class="name ell">{{ $item['name'] }}</h5>
                        </td>
                        <td width="100px">
                            {{ Form::delete(route('backend.cases.member.remove', [$case['id'], $item['id']]), '<i class="ion-backspace-outline"></i> Hapus', ['class' => 'form-delete'], ['class' => 'btn btn-xs btn-link btn-delete']) }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td><small class="empty">Belum Ada</small></td>
                    </tr>
                @endforelse
            </table>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading"><i class="ion-document-text icon"></i> Dokumen</div>
            @if($case['is_allow_create_document'])
            <table class="table table-list">
                @foreach($templates as $item)
                <tr>
                    <td>
                        <h5>{{ $item['short_title'] }} {{ $item['title'] }}</h5>
                        @if(in_array($item['id'], $documentsIds))
                        {{ Form::delete(route('backend.document.destroy', [array_search( $item['id'], $documentsIds)]), '<i class="ion-backspace-outline"></i> Hapus Dokumen', ['class' => 'form-delete'], ['class' => 'btn btn-xs btn-link btn-delete']) }}
                        @endif
                    </td>
                    <td width="100px" class="text-center">
                        @if(in_array($item['id'], $documentsIds))
                            <a class="btn btn-xs btn-default" href="{{ route('backend.document.edit', [array_search( $item['id'], $documentsIds)]) }}">Edit</a>
                        @else
                            <a class="btn btn-xs btn-default" href="{{ route('backend.document.create', ['template_id' => $item['id'], 'template' => strtolower($item['short_title']), 'case_id' => $case['id']]) }}">Buat Dokumen</a>
                        @endif
                    </td>
                </tr>
                @endforeach
            </table>
            @else
                <div class="panel-body">
                    <div class="alert alert-warning">Untuk membuat dokumen, silakan lengkapi data jaksa, data penyidik, dan data tersangka.</div>
                </div>
            @endif

        </div>

        <table class="table table-striped">
            <caption><i class="icon ion-ios-shuffle-strong"></i> Riwayat Aktivitas</caption>
            @foreach($activities as $item)
            <tr>
                <td width="130px"><small class="text-muted">{{ $item['date'] }}</small></td>
                <td>
                    <strong>{{ $item['name'] }}</strong>
                    <p>{{ $item['note'] }}</p>
                </td>
            </tr>
            @endforeach
        </table>


            {{ Form::open(['route' => ['backend.cases.activity', $case['id']], 'method' => 'post', 'role'=>'form']) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <div class="form-group">
                {{ Form::textarea('content', '', ['class' => 'form-control', 'rows' => 3]) }}
            </div>
            <div class="text-right">
                {{ Form::submit('Tambah Catatan', ['class' => 'btn btn-primary']) }}
            </div>
            {{ Form::close() }}
    </div>
    </div>

</div>

@stop


@section('style-head')
    @parent
    <style>
        .list-group-item.item-checklist {
            padding: 1px 10px;
        }
        .fa-check {color: #090}
        .list-group.disabled *{
            opacity: .5;
            cursor: not-allowed;
        }
    </style>
@stop

@section('script-end')
    @parent

    <script>
    $(function(){

        $('.item-checklist').on('click', function(e){

            e.preventDefault();

            if($(this).parent('ul').hasClass('disabled'))
            {
                return false;
            }

            $.blockUI(BLOCKUI_STYLE);

            $.get($(this).data('url'), '', function(response, status){
                $.unblockUI();
                var modal = $(response);
                modal.modal();

                modal.find('.datepicker').datepicker();

                modal.find('#form-activity').on('submit', function(e){
                    e.preventDefault();
                    var form = $(this);
                    var btn = form.find('button[type=submit]');
                    btn.button('loading');
                    $.ajax({
                        url: form.attr('action'),
                        type:'post',
                        dataType:'json',
                        data: form.serialize()
                    })
                            .success(function(response){
                                if (response.status == 1) {
                                    window.location.reload();
                                } else {
                                    alert(response.message);
                                }
                            })
                            .always(function(){

                                btn.button('reset');
                            });
                });

                modal.on('hidden.bs.modal', function(e){
                    modal.remove();
                });

            });
        });

        $('.box-tersangka .item').on('click', function(e){
            e.preventDefault();
            $.blockUI(BLOCKUI_STYLE);
            $.get($(this).attr('href'), '', function(response, status){
                $.unblockUI();
                var modal = $(response);
                modal.modal();

            });
        });

        $('.panel-checklist').on('click', '.btn-edit', function(e){

            e.preventDefault();

            $.blockUI(BLOCKUI_STYLE);

            $.get($(this).attr('href'), '', function(response, status){
                $.unblockUI();
                var modal = $(response);

                modal.find('#form-checklist-edit').on('submit', function(e){
                    e.preventDefault();
                    var form = $(this);
                    var btn = form.find('button[type=submit]');
                    btn.button('loading');
                    $.ajax({
                        url: form.attr('action'),
                        type:'post',
                        dataType:'json',
                        data: form.serialize()
                    })
                            .success(function(response){
                                if (response.status == 1) {
                                    window.location.reload();
                                } else {
                                    alert(response.message);
                                }
                            })
                            .always(function(){

                                btn.button('reset');
                            });
                });

                modal.modal();

                modal.find('.datepicker').datepicker();

                modal.on('hidden.bs.modal', function(e){
                    modal.remove();
                });

            });
        });
    });
    </script>
@stop
