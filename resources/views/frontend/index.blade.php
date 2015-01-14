@extends("layouts.base")

@section("body")

    @include('layouts.elements.header')

    <div class="section-menu-grid">
        <table class="table table-bordered">

            <tr>
                <td class="item-dark" style="padding: 20px">
                    <table width="100%">
                        <td class="counter counter-big">
                            <h4 class="caption">Kasus Aktif</h4>
                            <span class="number">{{ $stat['active'] }}</span>
                        </td>
                        <td>
                            <table width="100%">
                                <tr>
                                    <td colspan="3" class="counter"><h4 class="caption">Kasus Baru</h4></td>
                                </tr>
                                <tr>
                                    <td class="counter counter-small">
                                        <span class="number">{{ $stat['newToday'] }}</span>
                                        <span class="desc">Hari Ini</span>
                                    </td>
                                    <td class="counter counter-small">
                                        <span class="number">{{ $stat['newThisWeek'] }}</span>
                                        <span class="desc">Minggu Ini</span>
                                    </td>
                                    <td class="counter counter-small">
                                        <span class="number">{{ $stat['newThisMonth'] }}</span>
                                        <span class="desc">Bulan Ini</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </table>
                </td>
                <td colspan="2" class="jadwal-sidang animated fadeIn" style="padding: 10px 40px">
                    <h3 class="caption">Jadwal Sidang</h3>
                    <div class="inner">
                        @forelse($cases as $item)
                            <a href="{{ $item['permalink'] }}" class="court">{{ $item['name'] }}</a>
                        @empty
                            Tidak Ada
                        @endforelse
                    </div>
                </td>
            </tr>
            <tr>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.search') }}?type=201">
                            <small class="keymap">1</small>
                            <h3 class="title">Pidum</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.officer') }}">
                            <small class="keymap">4</small>
                            <h3 class="title">Jaksa</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('admin.home') }}">
                            <small class="keymap">7</small>
                            <h3 class="title">Admin</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
            </tr>

            <tr>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.search') }}?type=202">
                            <small class="keymap">2</small>
                            <h3 class="title">Pidsus</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.post', ['category' => 'pembinaan']) }}">
                            <small class="keymap">5</small>
                            <h3 class="title">Pembinaan</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                </td>
            </tr>

            <tr>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.search') }}">
                            <small class="keymap">3</small>
                            <h3 class="title">Datun</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.post', ['category' => 'intelijen']) }}">
                            <small class="keymap">6</small>
                            <h3 class="title">Intelijen</h3>
                            <i class="fa fa-chevron-right fa-3x icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                    </div>
                </td>
            </tr>

        </table>
    </div>
@stop
