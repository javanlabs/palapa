<div id="modalSelectCase" data-width="600px" class="modal container-fluid fade" tabindex="-1" role="dialog"
     aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-header"><h4>Jenis Kasus Apa Yang Ingin Anda Buat?</h4></div>
    <div class="modal-body">
        <div class="container-fluid">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="list-group">
                        <a class="list-group-item" href="" data-id="201"><i class="fa fa-check"></i> PIDANA UMUM</a>
                        <a class="list-group-item" href="" data-id="202"><i class="fa fa-check"></i> PIDANA KHUSUS</a>
                    </div>
                </div>
            </div>
            {{--<div class="col-md-6">--}}
                {{--<div class="panel panel-default">--}}
                    {{--<div class="panel-heading"><strong>PERDATA</strong></div>--}}
                    {{--<div class="list-group">--}}
                        {{--<a class="list-group-item" href="" data-id="211"><i class="fa fa-check"></i> BANKUM</a>--}}
                        {{--<a class="list-group-item" href="" data-id="212"><i class="fa fa-check"></i> THL</a>--}}
                        {{--<a class="list-group-item" href="" data-id="213"><i class="fa fa-check"></i> TIMKUM</a>--}}
                        {{--<a class="list-group-item" href="" data-id="214"><i class="fa fa-check"></i> YANKUM</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="col-md-6">--}}
                {{--<div class="panel panel-default">--}}
                    {{--<div class="panel-heading"><strong>PPH</strong></div>--}}
                    {{--<div class="list-group">--}}
                        {{--<a class="list-group-item" href="" data-id="221"><i class="fa fa-check"></i> BANKUM LITIGASI</a>--}}
                        {{--<a class="list-group-item" href="" data-id="222"><i class="fa fa-check"></i> BANKUM NON LITIGASI</a>--}}
                        {{--<a class="list-group-item" href="" data-id="223"><i class="fa fa-check"></i> THL</a>--}}
                        {{--<a class="list-group-item" href="" data-id="224"><i class="fa fa-check"></i> TIMKUM</a>--}}
                        {{--<a class="list-group-item" href="" data-id="225"><i class="fa fa-check"></i> YANKUM</a>--}}
                    {{--</div>--}}

                {{--</div>--}}

            {{--</div>--}}
            {{--<div class="col-md-6">--}}
                {{--<div class="panel panel-default">--}}
                    {{--<div class="panel-heading"><strong>TUN</strong></div>--}}
                    {{--<div class="list-group">--}}
                        {{--<a class="list-group-item" href="" data-id="231"><i class="fa fa-check"></i> BANKUM</a>--}}
                        {{--<a class="list-group-item" href="" data-id="232"><i class="fa fa-check"></i> THL</a>--}}
                        {{--<a class="list-group-item" href="" data-id="233"><i class="fa fa-check"></i> TIMKUM</a>--}}
                        {{--<a class="list-group-item" href="" data-id="234"><i class="fa fa-check"></i> YANKUM</a>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        </div>
    </div>
    <div class="modal-footer">
        {{ Form::open(['route' => 'backend.cases.create', 'method' => 'get', 'id' => 'formSelectCase']) }}
        {{ Form::hidden('type', '', ['id' => 'inputType']) }}
        <button class="btn btn-default btn-next" disabled type="submit">Lanjut <i class="fa fa-chevron-right"></i>
        </button>
        {{ Form::close() }}
    </div>
</div>

@section('script-end')
    @parent
    <script>
        $(function () {
            $('#modalSelectCase').on('click', 'a.list-group-item', function (e) {
                e.preventDefault();
                $('#modalSelectCase a.list-group-item').removeClass('active');
                $(this).addClass('active');

                $('#modalSelectCase .btn-next').removeAttr('disabled');
                $('#inputType').val($(this).data('id'));
            });

            $('#modalSelectCase a.list-group-item').dblclick(function (e) {
                $('#inputType').val($(this).data('id'));
                $('#formSelectCase').submit();
            });
        });
    </script>
@stop
