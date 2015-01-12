@extends("layouts.base")

@section("body")

    <div class="section-menu-grid">
        <table class="table table-bordered">

            <tr>
                <td class="item-dark" style="padding: 20px">
                    <table width="100%">
                        <td class="counter counter-big">
                            <h4 class="caption">Kasus Aktif</h4>
                            <span class="number">22</span>
                        </td>
                        <td>
                            <table width="100%">
                                <tr>
                                    <td colspan="3" class="counter"><h4 class="caption">Kasus Baru</h4></td>
                                </tr>
                                <tr>
                                    <td class="counter counter-small">
                                        <span class="number">2</span>
                                        <span class="desc">Hari Ini</span>
                                    </td>
                                    <td class="counter counter-small">
                                        <span class="number">12</span>
                                        <span class="desc">Minggu Ini</span>
                                    </td>
                                    <td class="counter counter-small">
                                        <span class="number">67</span>
                                        <span class="desc">Bulan Ini</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </table>
                </td>
                <td colspan="2" rowspan="2" class="jadwal-sidang" style="padding: 10px 40px">
                    <h3 class="caption">Jadwal Sidang</h3>
                    <div class="inner">
                        @foreach(range(1,4) as $item)
                            <a href="" class="court">Sidang Lanjuta Perkara Penyalahgunaan Wewenang</a>
                        @endforeach
                    </div>
                </td>
            </tr>
            <tr>
                <td class="item item-dark">
                    <div class="inner">
                        <a href="">
                            <?php $item = $menu->pull(0) ?>
                            <small class="keymap">{{ $item['keymap'] }}</small>
                            <h3 class="title">{{ $item['title'] }}</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
            </tr>

            @foreach($menu->chunk(3) as $chunk)
            <tr>
                @foreach($chunk as $item)
                    <td class="item">
                        <a href="">
                            <small class="keymap">{{ $item['keymap'] }}</small>
                            <h3 class="title">{{ $item['title'] }}</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </td>
                @endforeach
            </tr>
            @endforeach
        </table>
    </div>
@stop
