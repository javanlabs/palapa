<!-- Modal -->
<div class="modal fade modal-case-info" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">{{ $witness['name'] }}</h4>
            </div>

            <div class="modal-body ">
                <div class="pad-lg">
                    <dl class="dl-horizontal dl-wide">
                        <dt>Jenis Kelamin</dt>
                        <dd>{{$witness->sex}}</dd>
                        <dt>Tempat Lahir </dt>
                        <dd>{{$witness['pob_name']}}</dd>
                        <dt>Umur/Tanggal Lahir </dt>
                        <dd>{{$witness->age}} / {{ $witness['dob'] }}</dd>
                        <dt>Agama </dt>
                        <dd>{{ $witness->religion}}</dd>
                        <dt>Alamat </dt>
                        <dd>
                            {{ $witness->address }} {{ $witness->city?$witness->city->nama:'' }}<br/>
                        </dd>
                        <dt>Kewarganegaraan </dt>
                        <dd>{{ $witness['nationality'] }}</dd>
                        <dt>Pendidikan </dt>
                        <dd>{{ $witness['education'] }}</dd>
                        <dt>Pekerjaan </dt>
                        <dd>{{ $witness['job'] }}</dd>
                    </dl>
                </div>
            </div>

            <div class="modal-footer">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    {{ Form::delete(route('backend.witness.destroy', $witness['id']), 'Hapus', ['class' => 'form-delete'], ['class' => 'btn btn-danger']) }}
                    <a class="btn btn-primary" href="{{ route('backend.witness.edit', [$witness['id']]) }}">Edit</a>
                </div>
                <div class="col-md-4 text-right">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    </div>
</div>