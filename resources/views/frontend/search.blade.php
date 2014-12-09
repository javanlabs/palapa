@extends('layouts.frontend.frontend')
@section('content')

    <div class="container-fluid text-center" style="margin-bottom: 20px">
        <h1 style="font-weight: 300">Cari Kasus</h1>

        {{ Form::open(['route' => 'frontend.search', 'method' => 'get', 'role' => 'form']) }}
                    <div class="form-group">
                      {{--<div class="input-group-btn">--}}
                        {{--<button type="button" class="btn btn-primary btn-lg" tabindex="-1">Pidana Umum</button>--}}
                        {{--<button type="button" class="btn btn-primary btn-lg dropdown-toggle" data-toggle="dropdown" tabindex="-1">--}}
                          {{--<span class="caret"></span>--}}
                        {{--</button>--}}
                        {{--<ul class="dropdown-menu">--}}
                          {{--<li><a href="#">Semua</a></li>--}}
                          {{--<li><a href="#">Pidana Umum</a></li>--}}
                          {{--<li><a href="#">Pidana Khusus</a></li>--}}
                          {{--<li><a href="#">Intel</a></li>--}}
                        {{--</ul>--}}
                      {{--</div>--}}
                      <input type="text" class="form-control input-lg input-block" name="q" value="{{ Input::get('q') }}" placeholder="Cari nama kasus, nomor SPDP, atau nama tersangka">
                    </div>

        {{ Form::close() }}
    </div>

<div class="container-fluid">
    <div class="panel panel-default">
        <div class="panel-heading">{{ count($cases) }} kasus ditemukan</div>
        @if(count($cases) > 0)
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th width="250px">Kasus</th>
                <th>Tersangka</th>
                <th>Jaksa</th>
                <th width="75px" class="text-center" data-toggle="tooltip" data-placement="top" title="SPDP"><i class="fa fa-file-text-o"></i></th>
                <th width="75px" class="text-center" data-toggle="tooltip" data-placement="top" title="Tahap 1"><strong>1</strong></th>
                <th width="75px" class="text-center" data-toggle="tooltip" data-placement="top" title="Tahap 2"><strong>2</strong></th>
                <th width="75px" class="text-center" data-toggle="tooltip" data-placement="top" title="Penuntutan"><i class="fa fa-random"></i></th>
                <th width="75px" class="text-center" data-toggle="tooltip" data-placement="top" title="Persidangan"><i class="fa fa-gavel"></i></th>
                <th width="150px">Terakhir Update</th>
            </tr>
        </thead>
        @foreach($cases as $item)
        <tr>
            <td style="background-color: #fffcef">
                <h5>{{ $item['name'] }}</h5>
                <small>SPDP: {{ $item['spdp_number'] }}</small>
            </td>
            <td>{{ $item['suspect_name'] }}</td>
            <td>{{ $item['prosecutor_name'] }}</td>
            <td colspan="5" style="padding-top: 25px">
                <div class="progress">
                    <div class="progress-bar progress-bar-{{ $item['status_spdp'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="SPDP"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_tahap1'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Tahap 1"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_tahap2'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Tahap 2"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_penuntutan'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Penuntutan"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_persidangan'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Persidangan"></div>
                </div>
            </td>
            <td><small class="text-muted">{{ $item['last_update'] }}</small></td>
        </tr>
        @endforeach
    </table>
    @endif
    </div>

</div>

<div class="modal fade" id="modal-detail">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Korupsi Dana BOS SD Negeri XIX Jember</h4>
      </div>
      <div class="modal-body">
           <dl class="dl-horizontal">
                <dt>Kasus</dt><dd>Korupsi Dana BOS SD Negeri XIX Jember</dd>
                <dt>Tersangka</dt><dd>Ilham Jayakusuma</dd>
                <dt>Jaksa</dt><dd>Supriyadi</dd>
                <dt>Status</dt><dd><span class="badge">SPDP</span> <a class="" href="#" data-toggle="modal" data-target="#modal-edit">Ubah Status</a></dd>
           </dl>
           <p class="lead">Riwayat Kasus</p>
           <table class="table table-condensed table-striped">
            <thead>
            <tr>
            <th>Tahapan</th>
            <th>Catatan</th>
            <th>Tanggal</th>
            <th>Status</th>
            </tr>
            </thead>
            @foreach($histories as $item)
            <tr>
                <td>{{ $item['name'] }}</td>
                <td>{{ $item['note'] }}</td>
                <td>{{ $item['date'] }}</td>
                <td><span class="label label-{{ $item['status']['label'] }}">{{ $item['status']['name'] }}</span></td>
            </tr>
            @endforeach
           </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div class="modal fade" id="modal-edit">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Ubah Status</h4>
      </div>
      <div class="modal-body">
<form class="form-horizontal" role="form">
  <div class="form-group">
    <label class="col-sm-3 control-label">Kasus</label>
    <div class="col-sm-9">
      <p class="form-control-static">Korupsi Dana BOS SDN XIX Jember</p>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Status Sekarang</label>
    <div class="col-sm-9">
      <p class="form-control-static">SPDP</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-3 control-label">Ubah Ke</label>
    <div class="col-sm-9">
<select class="form-control">
  <option>Penyidik</option>
  <option>SPDP</option>
  <option selected="selected">Penuntutan</option>
  <option>Eksekusi</option>
</select>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Tanggal</label>
    <div class="col-sm-9">
        <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Catatan</label>
    <div class="col-sm-9">
        <textarea class="form-control" name="" id="" cols="30" rows="5"></textarea>
    </div>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-primary">Konfirmasi Perubahan</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="modal-add">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Tambah Kasus</h4>
      </div>
      <div class="modal-body">
<form class="form-horizontal" role="form">
  <div class="form-group">
    <label class="col-sm-3 control-label">Nama Kasus</label>
    <div class="col-sm-9">
        <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Tersangka</label>
    <div class="col-sm-9">
        <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Jaksa</label>
    <div class="col-sm-9">
        <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Penyidik</label>
    <div class="col-sm-9">
        <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Status</label>
    <div class="col-sm-9">
<select class="form-control">
  <option>Penyidik</option>
  <option>SPDP</option>
  <option selected="selected">Penuntutan</option>
  <option>Eksekusi</option>
</select>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label">Tanggal</label>
    <div class="col-sm-9">
        <input type="text" class="form-control"/>
    </div>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-primary">Simpan</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

@stop

@section('script-end')
    @parent
    <script>
    $(function(){
        $('[data-toggle="tooltip"]').tooltip({container:'body'})
    });
    </script>
@stop
