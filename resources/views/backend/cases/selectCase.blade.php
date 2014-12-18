<div id="modalSelectCase" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header"><h4>Jenis Kasus Apa Yang Ingin Anda Buat?</h4></div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading"><strong>PIDANA UMUM</strong></div>
                            <div class="list-group" style="height: 160px">
                                <a class="list-group-item" href="" data-id="201"><i class="fa fa-check"></i> PIDANA UMUM</a>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading"><strong>PERDATA</strong></div>
                            <div class="list-group">
                                <a class="list-group-item" href="" data-id="202"><i class="fa fa-check"></i> BANKUM</a>
                                <a class="list-group-item" href="" data-id="203"><i class="fa fa-check"></i> THL</a>
                                <a class="list-group-item" href="" data-id="204"><i class="fa fa-check"></i> TIMKUM</a>
                                <a class="list-group-item" href="" data-id="205"><i class="fa fa-check"></i> YANKUM</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading"><strong>PPH</strong></div>
                            <div class="list-group">
                                <a class="list-group-item" href="" data-id="206"><i class="fa fa-check"></i> BANKUM LITIGASI</a>
                                <a class="list-group-item" href="" data-id="207"><i class="fa fa-check"></i> BANKUM NON LITIGASI</a>
                                <a class="list-group-item" href="" data-id="208"><i class="fa fa-check"></i> THL</a>
                                <a class="list-group-item" href="" data-id="209"><i class="fa fa-check"></i> TIMKUM</a>
                                <a class="list-group-item" href="" data-id="210"><i class="fa fa-check"></i> YANKUM</a>
                            </div>

                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading"><strong>TUN</strong></div>
                            <div class="list-group">
                                <a class="list-group-item" href="" data-id="211"><i class="fa fa-check"></i> BANKUM</a>
                                <a class="list-group-item" href="" data-id="212"><i class="fa fa-check"></i> THL</a>
                                <a class="list-group-item" href="" data-id="213"><i class="fa fa-check"></i> TIMKUM</a>
                                <a class="list-group-item" href="" data-id="214"><i class="fa fa-check"></i> YANKUM</a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                {{ Form::open(['route' => 'backend.cases.create', 'method' => 'get']) }}
                {{ Form::hidden('type', '', ['id' => 'inputType']) }}
                <button class="btn btn-default btn-next" disabled type="submit">Lanjut <i class="fa fa-chevron-right"></i></button>
                {{ Form::close() }}
            </div>
        </div>
    </div>
</div>

@section('script-end')
    @parent
    <script>
        $(function(){
            $('#modalSelectCase').on('click', 'a.list-group-item', function(e){
                e.preventDefault();
                $('#modalSelectCase a.list-group-item').removeClass('active');
                $(this).addClass('active');

                $('#modalSelectCase .btn-next').removeAttr('disabled');
                $('#inputType').val($(this).data('id'));
            });
        });
    </script>
@stop
