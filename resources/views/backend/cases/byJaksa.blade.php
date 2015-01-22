<!-- Modal -->
<div class="modal fade modal-case-byJaksa" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">{{ $officer['name'] }}</h4>
            </div>
            <table class="table">
                @forelse($cases as $item)
                    <tr>
                        <td style="padding: 10px 20px 20px">
                            <h4 class="mb-0"><a href="{{ $item['permalink'] }}" class="btn-detail">{{ $item['name'] }}</a></h4>
                            <span class="text-muted">{{ $item['spdp_number'] }}</span>
                            <span class="label label-default">{{ $item['age'] }} hari</span>
                            <span class="label label-default">{{ $item['type_name'] }}</span>
                            <span class="label label-default">{{ $item['status_name'] }}</span>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td class="empty text-center pad-lg">Tidak ada kasus yang sedang ditangani</td>
                    </tr>
                @endforelse
            </table>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>