@extends('layouts.frontend')
@section('content')
<div style="padding: 150px 0 100px" class="clearfix">
    <div class="container text-center">
        <h1 style="font-weight: 300">Pencarian Cepat</h1>

                    <div class="input-group">
                      <div class="input-group-btn">
                        <button type="button" class="btn btn-primary btn-lg" tabindex="-1">Pidana Umum</button>
                        <button type="button" class="btn btn-primary btn-lg dropdown-toggle" data-toggle="dropdown" tabindex="-1">
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a href="#">Semua</a></li>
                          <li><a href="#">Pidana Umum</a></li>
                          <li><a href="#">Pidana Khusus</a></li>
                          <li><a href="#">Intel</a></li>
                        </ul>
                      </div>
                      <input type="text" class="form-control input-lg" placeholder="Cari nama tersangka atau nama kasus...">
                    </div>
    </div>
</div>

<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">3.421 kasus ditemukan</div>
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th width="250px">Nama Kasus</th>
                <th>Tersangka</th>
                <th>Jaksa</th>
                <th>Penyidik</th>
                <th width="100px" class="text-center">SPDP</th>
                <th width="100px" class="text-center">Penuntutan</th>
                <th width="100px" class="text-center">Eksekusi</th>
                <th>Update Terakhir</th>
            </tr>
        </thead>
        @forelse($cases as $item)
        <tr>
            <td style="background-color: #fffcef"><h5>{{ $item['name'] }}</h5></td>
            <td>{{ $item['suspect_name'] }}</td>
            <td>{{ $item['prosecutor_name'] }}</td>
            <td>{{ $item['investigator_name'] }}</td>
            <td colspan="3">
                <div class="progress">
                    <div class="progress-bar progress-bar-{{ $item['status_spdp'] }}" role="progressbar" style="width: 33%"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_penuntutan'] }}" role="progressbar" style="width: 33%"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_intel'] }}" role="progressbar" style="width: 34%"></div>
                </div>
            </td>
            <td><small class="text-muted">{{ $item['last_update'] }}</small></td>
        </tr>
        @empty
        <tr><td colspan="8">Kasus tidak ditemukan</td></tr>
        @endforelse
    </table>
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

@section('style-head')
<style>
    table th {
    text-transform: uppercase;
    font-weight: 700;
    font-size: .9em;
    color: #999;
    background-color: #eef1f5;
    }
</style>
@stop

@section('script-end')
<script>
$(function(){
    $('table').on('click', 'tr', function(e){
        e.preventDefault();
        $('#modal-detail').modal('show');
    });
});
</script>
@stop
