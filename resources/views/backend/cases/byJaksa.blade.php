<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h4 class="modal-title">Kasus Yang Sedang Ditangani <small>{{ $officer['name'] }}</small></h4>
</div>
<table class="table">
    @foreach($cases as $item)
        <tr>
            <td>
                <div>
                    <span class="label label-default">{{ $item['age'] }} hari</span>
                    <span class="label label-default">{{ $item['type_name'] }}</span>
                    <span class="label label-default">{{ $item['status_name'] }}</span>
                </div>
                <a href="{{ $item['permalink'] }}" target="_blank"><strong>{{ $item['name'] }}</strong></a>
            </td>
        </tr>
    @endforeach
</table>
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
</div>
