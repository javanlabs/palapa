@extends('layouts.admin.admin-full')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail"><a href="{{ route('backend.cases.index') }}">Manajamen Kasus</a></span>
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail ">{{ $case['spdp_number'] }}</span>
@stop

@section('content-admin')
<div id="page-case-sop">
    <div class="pad-lg case-info">
        <div class="panel panel-default">
            <table class="table table-bordered">
                <tbody>
                <tr>
                    <td colspan="8">
                        <h4 class="mb-0">{{ $case['name'] }}</h4>
                        <small class="text-muted">{{ $case['spdp_number'] }}</small>
                    </td>
                </tr>
                <tr>
                    <td>
                        <dl>
                            <dt>Pasal</dt>
                            <dd>{{ nl2br($case['pasal']) }}</dd>
                        </dl>
                    </td>
                    <td>
                        <dl>
                            <dt>Penyidik</dt>
                            <dd>{{ $case['penyidik_name'] }}</dd>
                        </dl>
                    </td>
                    <td>
                        <dl>
                            <dt>Jaksa</dt>
                            <dd>{{ $case['prosecutor_name'] }}</dd>
                        </dl>
                    </td>
                    <td>
                        <dl>
                            <dt>Staff Administrasi</dt>
                            <dd>{{ $case['staff_name'] }}</dd>
                        </dl>
                    </td>
                    <td>
                        <dl>
                            <dt>Usia Kasus</dt>
                            <dd>
                                @if($case['age'] !== false)
                                    {{ $case['age'] }} hari
                                @else
                                    <span class="label label-default">{{ $case['status'] }}</span>
                                @endif
                            </dd>
                        </dl>
                    </td>
                    <td>
                        <dl>
                            <dt>Jenis Kasus</dt>
                            <dd><span class="label label-default">{{ $case['type_name'] }}</span></dd>
                        </dl>
                    </td>
                    <td>
                        <dl>
                            <dt>Status</dt>
                            <dd><span class="label label-primary">{{ $case['status_name'] }}</span></dd>
                        </dl>
                    </td>
                </tr>
                </tbody>
            </table>
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
            <div class="panel panel-default">
                @foreach($phases as $phase)
                    <div class="panel-heading">{{ $phase['name'] }}</div>
                    <ul class="list-group {{ (($phase->id > $case['phase']['id']) && $phase->id != $case['phase_id'])?'disabled':'' }}">
                        @foreach($phase['checklist'] as $item)

                            @if(in_array($item['id'], $checklistIds))
                                <li class="list-group-item list-group-item-success">

                                    @if($case->isLatestChecklist($item))
                                        {{ Form::open(['route' => ['backend.cases.unchecklist', $case->id, $item['id']], 'method' => 'post', 'class' => 'pull-right']) }}
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                                        {{ Form::submit('Batal', ['class' => 'btn btn-link']) }}
                                        {{ Form::close() }}
                                    @endif

                                    <i class="fa fa-check"></i>
                                    {{ $item['name'] }}

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
            @if(count($case->suspects))
            <?php $count = 1;?>
            <div class="panel-body row items">
                @foreach($case->suspects as $item)
                    <div class="col-md-6">
                        <a class="thumbnail item" style="padding: 10px 20px" href="{{ route('backend.suspect.show', [$item['id']]) }}">
                            <h5 class="name ell">{{ $item['sex_icon'] }} {{ $item['name'] }}</h5>
                        </a>
                    </div>
                @endforeach
            </div>
            @endif
        </div>

        <div class="panel panel-default">
            <div class="panel-heading"><i class="ion-document-text icon"></i> Dokumen</div>
            @if($case['is_allow_create_document'])
            <table class="table">
                @foreach($templates as $item)
                <tr>
                    <td>
                        <h5>{{ $item['short_title'] }} {{ $item['title'] }}</h5>
                    </td>
                    <td width="100px">
                        @if(in_array($item['id'], $documentsIds))
                            <div class="btn-group">
                                <a class="btn btn-xs btn-link" href="{{ route('backend.document.edit', [array_search( $item['id'], $documentsIds)]) }}">Edit</a>
                                {{ Form::delete(route('backend.document.destroy', [array_search( $item['id'], $documentsIds)]), 'Hapus', [], ['class' => 'btn btn-xs btn-link']) }}
                            </div>
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

            $.blockUI({message:null});

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
