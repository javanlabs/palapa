<!-- Modal -->
<div class="modal fade modal-case-info" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i
                                class="fa fa-times"></i></span></button>
                <h2 class="modal-title mb-0">{{ $case['name'] }}</h2>
            </div>
            <div class="modal-body">
                <div class="panel panel-default panel-tersangka">
                    <div class="panel-heading"><i class="icon ion-ios-body"></i> Tersangka</div>
                    <table class="table">
                        <tbody class="items">
                        @forelse($suspects as $suspect)
                            <tr>
                                <td>{{ $suspect['sex_icon'] }}</td>
                                <td>{{ $suspect['name'] }}</td>
                                <td>{{$suspect['address']}} {{$suspect['city_name']}}</td>
                            </tr>

                        @empty
                            <tr>
                                <td>Data tersangka belum tersedia</td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading"><i class="icon ion-ios-information"></i> Info</div>
                    @include('modules.case.tabular', ['case' => $case])
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading"><i class="icon fa fa-gavel"></i> Jadwal Sidang</div>
                    <table class="table">
                        <tbody>
                        @forelse($courts as $item)
                            <tr>
                                <td width="200px">
                                    <small class="text-muted">{{ $item['date_for_human'] }}</small>
                                </td>
                                <td>
                                    <strong>{{ $item['agenda'] }}</strong>

                                    <p>{{ $item['note'] }}</p>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td>Jadwal sidang belum tersedia</td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>


                <div class="panel panel-default">
                    <div class="panel-heading"><i class="icon ion-ios-shuffle-strong"></i> Riwayat</div>
                    <table class="table">
                        <tbody>
                        @forelse($activities as $item)
                            <tr>
                                <td width="130px">
                                    <small class="text-muted">{{ $item['date_for_human'] }}</small>
                                </td>
                                <td>
                                    <strong>{{ $item['name'] }}</strong>

                                    <p>{{ $item['note'] }}</p>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td>Riwayat perkara belum tersedia</td>
                            </tr>
                        @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>