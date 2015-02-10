@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Manajemen Perkara</span>
@stop

@section('content-admin')
    <div id="page-case-index" class="row">
        <h2 class="page-title">Manajemen Perkara</h2>

        @include('backend.cases.tab', ['owner' => $owner])

        <form action="" class="mb row">
            <input type="hidden" name="owner" value="{{ Input::get('owner') }}"/>
            <div class="col-md-3">
                {{ Form::select('type', $caseTypes, Input::get('type', 'all'), ['class' => 'form-control']) }}
            </div>
            <div class="col-md-9">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Cari nama kasus, nomor SPDP atau nama tersangka..." value="{{ Input::get('q') }}">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">Cari</button>
                </span>
                </div>
                <!-- /input-group -->
            </div>
        </form>

        <div class="panel panel-default">
            <table class="table table-case">
                <thead>
                <tr>
                    <th>Kasus</th>
                    <th width="200px">Jaksa/Penyidik</th>
                    <th width="200px">Tahapan</th>
                    <th width="100px">Aksi</th>
                </tr>
                </thead>
                @forelse($cases as $item)
                    @include('modules.case.row2', ['item' => $item, 'phases' => $item->phases()])
                @empty
                    <tr><td colspan="4"><span class="empty">Tidak ada data</span></td></tr>
                @endforelse
            </table>
            <div class="panel-footer">
                {{ $cases->appends('q', Input::get('q'))->appends('owner', $owner)->appends('type', $type)->render() }}
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
        });
    </script>
@stop
