@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Alert</span>
@stop

@section('content-admin')
    <div id="page-case-index">
        <div class="panel panel-default">
            <div class="panel-heading">{{ $caseAlertCount }} Perkara Perlu Penanganan</div>
            <table class="table table-case">
                @foreach($cases as $item)
                    <tr>
                        <td>
                            {{ case_deadline($item['day_remaining']) }}
                            <h5 class="mb-0">{{ $item['name'] }}</h5>
                            {{strtoupper($item->category)}} - <small class="text-muted">{{ $item['spdp_number'] }}</small>
                            <br/>
                            <strong>Tersangka</strong>
                            @foreach($item->suspects as $suspect)
                                {{$suspect->name}}
                            @endforeach
                        </td>
                        <td>
                            <div><i class="ion-person"></i> {{ $item['prosecutor_name'] }}</div>
                            <hr style="margin-top: 10px; margin-bottom:10px; border-style: dashed none none"/>
                            <div><i class="ion-ios-people"></i> {{ $item['penyidik_name'] }}</div>

                        </td>
                        <td width='100px'>
                            @if($item['is_suspend'])
                                <div class="label label-danger label-lg">Perkara Dihentikan</div>
                            @endif
                            <span class="label label-default {{ $item['type_name'] }}">{{ $item['type_name'] }}</span>
                            <small class="text-muted">
                                <i>{{ $item->getLatestActivityAttribute()?$item->getLatestActivityAttribute()->name:'' }}</i>
                            </small>
                        </td>
                        <td class="text-right">
                            <div class="btn-group">
                                @if(Auth::user()->canManage($item))
                                    <a class="btn btn-default btn-sm" href="{{ $item['permalink_edit'] }}">
                                        Edit <i class="ion-ios-arrow-forward"></i>
                                    </a>
                                @else
                                    <a class="btn btn-default btn-sm btn-detail" href="{{ $item['permalink'] }}">Info</a>
                                @endif


                            </div>
                        </td>
                    </tr>
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
