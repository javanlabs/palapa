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

        <form action="" class="mb">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Cari nama kasus, nomor SPDP atau nama tersangka..." value="{{ Input::get('q') }}">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="submit">Cari</button>
                </span>
            </div>
            <!-- /input-group -->
        </form>

        <div class="panel panel-default">
            <div class="panel-heading">{{ count($cases) }} Perkara Perlu Penanganan</div>
            <table class="table table-case">
                @foreach($cases as $item)
                    @include('modules.case.row', ['item' => $item, 'phases' => $item->phases()])
                @endforeach
            </table>
            <div class="panel-footer">
                {{ $cases->appends('q', Input::get('q'))->render() }}
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
