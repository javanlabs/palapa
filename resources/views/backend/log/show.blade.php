<!-- Modal -->
<div class="modal fade modal-case-info" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">
                    {{ $log->subject_name }}
                    {{ trans('event.' . $log->predicate) }}
                    {{ $log->object_name }}
                </h4>
            </div>

            <div class="modal-body ">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Nama Field</th>
                        <th>Isian Lama</th>
                        <th>Isian Baru</th>
                    </tr>
                    </thead>
                    @foreach($revisions as $item)
                        <tr>
                            <td>{{ $item->fieldName() }}</td>
                            <td>{{ $item->oldValue() }}</td>
                            <td>{{ $item->newValue() }}</td>
                        </tr>
                    @endforeach
                </table>
            </div>
        </div>
    </div>
</div>