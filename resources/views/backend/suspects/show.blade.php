<!-- Modal -->
<div class="modal fade modal-case-info" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">{{ $suspect['name'] }}</h4>
            </div>

            <div class="modal-body ">
                <div class="pad-lg">
                    <dl class="dl-horizontal dl-wide">
                        @if($suspect['is_individu'])
                        <dt>Jenis Kelamin</dt>
                        <dd>{{$suspect->sex}}</dd>
                        <dt>Tempat Lahir </dt>
                        <dd>{{$suspect['pob_name']}}</dd>
                        <dt>Umur/Tanggal Lahir </dt>
                        <dd>{{$suspect->age}} / {{ $suspect['dob'] }}</dd>
                        <dt>Agama </dt>
                        <dd>{{ $suspect->religion}}</dd>
                        @else
                        <dt>Nama Pimpinan</dt>
                        <dd>{{$suspect->nama_pimpinan}}</dd>
                        @endif
                        <dt>Alamat </dt>
                        <dd>
                            {{ $suspect->address }}<br/>
                        </dd>
                        @if($suspect['is_individu'])
                        <dt>Kewarganegaraan </dt>
                        <dd>{{ $suspect['nationality'] }}</dd>
                        <dt>Pendidikan </dt>
                        <dd>{{ $suspect['education'] }}</dd>
                        <dt>Pekerjaan </dt>
                        <dd>{{ $suspect['job'] }}</dd>
                        @endif
                        <dt>Status Tahanan</dt>
                        <dd>{{ $suspect->tahanan}}</dd>
                        <dt>Ditahan Sejak</dt>
                        <dd>{{ $suspect->tgl_penahanan }}</dd>
                    </dl>
                </div>
            </div>

            <div class="modal-footer">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                    <a class="btn btn-primary" href="{{ route('backend.suspect.edit', [$suspect['id']]) }}">Edit</a>
                </div>
                <div class="col-md-4 text-right">
                    {{ Form::delete(route('backend.suspect.destroy', $suspect['id']), 'Hapus Tersangka', ['class' => 'form-delete'], ['class' => 'btn btn-danger']) }}
                </div>
            </div>
        </div>
    </div>
</div>