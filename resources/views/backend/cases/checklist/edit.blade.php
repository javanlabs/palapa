<!-- Modal -->
<div class="modal fade modal-case-info" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            {{ Form::open(['url' => route('backend.cases.checklist.update', [$case['id'], $checklist['id']]), 'role' => 'form', 'id' => 'form-checklist-edit']) }}

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">{{ $checklist['name'] }}</h4>
            </div>

            <div class="modal-body ">

                <div class="pad-lg">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

                    @foreach($relatedData as $column)
                        <div class="form-group">
                            <label>@lang('case.' . $column['name'])</label>
                            @if($column['type'] == 'string')
                                {{ Form::text('data[' . $column['name'] . ']', $case[$column['name']], ['class' => 'form-control']) }}
                            @elseif($column['type'] == 'date')
                                {{ Form::text('data[' . $column['name'] . ']', $case[$column['name']], ['class' => 'form-control datepicker']) }}
                            @endif
                        </div>
                    @endforeach

                    <div class="form-group">
                        <label for="">{{ $checklist['date_label'] or 'Tanggal Checklist' }}</label>
                        {{ Form::text('date', \Carbon\Carbon::createFromFormat('Y-m-d', $checklist['pivot']['date'])->format('d-m-Y'), ['class' => 'form-control datepicker', 'id' => 'activity-date']) }}
                    </div>

                    @if( ! $checklist['contain_number'])
                    <div class="form-group">
                        <label for="">Nomor</label>
                        {{ Form::text('number', $checklist['pivot']['number'], ['class' => 'form-control']) }}
                    </div>
                    @endif

                    <div class="form-group">
                        <label for="">Catatan</label>
                        {{ Form::textarea('note', $checklist['pivot']['note'], ['class' => 'form-control', 'rows' => 3]) }}
                    </div>

                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                <button type="submit" class="btn btn-primary" data-loading-text="Loading..." style="width: 100px">Simpan</button>
            </div>

            {{ Form::close() }}
        </div>
    </div>
</div>

<script>
    $(function(){

    });
</script>
