@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Alert</span>
@stop

@section('content-admin')
    <div id="page-case-index">
        <div class="panel panel-default">
            <div class="panel-heading">{{ count($cases) }} Perkara Perlu Penanganan</div>
            <table class="table table-case">
                @foreach($cases as $item)
                    @include('modules.case.row', ['item' => $item, 'phases' => $item->phases()])
                @endforeach
            </table>
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
