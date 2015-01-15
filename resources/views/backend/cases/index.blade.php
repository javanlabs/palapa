@extends('layouts.admin.admin')

@section('content-admin')
    <div id="page-case-index">
        <h2 class="page-title">Manajemen Kasus</h2>


        {{--<ul class="nav nav-tabs mb">--}}
            {{--<li role="presentation" class="active"><a href=""><span class="badge">129</span> Kasus</a></li>--}}
            {{--<li role="presentation"><a href="">Active</a></li>--}}
            {{--<li role="presentation"><a href="">Suspended</a></li>--}}
            {{--<li role="presentation"><a href="">Finished</a></li>--}}
        {{--</ul>--}}

        <form action="" class="mb">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Cari Nama Kasus Atau Nomor SPDP..." value="{{ Input::get('q') }}">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="submit">Cari</button>
                </span>
            </div>
            <!-- /input-group -->
        </form>
        <table class="table table-case">
            <thead>
            <tr>
                <th>Kasus</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            @foreach($cases as $item)
                <tr>
                    <td>
                        <h4 class="mb-0">{{ $item['name'] }}</h4>
                        <small class="text-muted">{{ $item['spdp_number'] }}</small>

                    </td>
                    <td>
                        <span class="badge badge-status {{ $item['status'] }}">{{ $item['status'] }}</span>
                        <span class="badge badge-type {{ $item['type_name'] }}">{{ $item['type_name'] }}</span>
                    </td>
                    <td>
                        <a class="btn btn-default btn-xs" href="{{ $item['permalink_edit'] }}" target="_blank"><i
                                    class="fa fa-pencil"></i> Edit</a>
                        {{ Form::delete(route('backend.cases.delete', $item['id']), 'Hapus', ['class' => 'form-delete'], ['class' => 'btn btn-danger btn-xs']) }}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@stop
