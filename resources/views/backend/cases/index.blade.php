@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Manajamen Kasus</span>
@stop

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

        <div class="panel panel-default">
            <div class="panel-heading">Kasus</div>
            <table class="table table-case">
                @foreach($cases as $item)
                    <tr>
                        <td>
                            <h5 class="mb-0">{{ $item['name'] }}</h5>
                            <small class="text-muted">{{ $item['spdp_number'] }}</small>

                        </td>
                        <td>
                            <span class="badge badge-status {{ $item['status'] }}">{{ $item['status'] }}</span>
                            <span class="badge badge-type {{ $item['type_name'] }}">{{ $item['type_name'] }}</span>
                        </td>
                        <td class="text-right">
                            <a class="btn btn-default btn-sm" href="{{ $item['permalink_edit'] }}">
                                 Detil <i class="ion-ios-arrow-forward"></i>
                            </a>
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>
    </div>
@stop
