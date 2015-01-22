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
                            <a href="{{ $item['permalink'] }}" class="btn-detail court">
                                <small class="date">
                                    {{$item['persidangan_date_for_human']}} <span class="badge">{{ $item['schedule_for_human'] }}</span>
                                </small>
                                {{ $item['name'] }}
                            </a>
                        @empty
                            Tidak Ada
                        @endforelse
                    </div>
                </td>
            </tr>
            <tr>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.search') }}?type=201" data-keymap="1">
                            <small class="keymap">1</small>
                            <h3 class="title">Pidum</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.officer') }}" data-keymap="4">
                            <small class="keymap">4</small>
                            <h3 class="title">Jaksa</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('dashboard.index') }}" data-keymap="7">
                            <small class="keymap">7</small>
                            <h3 class="title">Statistik</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
                        </a>
                    </div>
                </td>
            </tr>

            <tr>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.search') }}?type=202" data-keymap="2">
                            <small class="keymap">2</small>
                            <h3 class="title">Pidsus</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.post', ['category' => 'pembinaan']) }}" data-keymap="5">
                            <small class="keymap">5</small>
                            <h3 class="title">Pembinaan</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                </td>
            </tr>

            <tr>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.search') }}" data-keymap="3">
                            <small class="keymap">3</small>
                            <h3 class="title">Datun</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
                        </a>
                    </div>
                </td>
                <td class="item">
                    <div class="inner">
                        <a href="{{ route('frontend.post', ['category' => 'intelijen']) }}" data-keymap="6">
                            <small class="keymap">6</small>
                            <h3 class="title">Intelijen</h3>
                            <i class="ion-ios-arrow-forward icon"></i>
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

@section('script-end')
    @parent

    <script type="text/javascript" src="{{ asset('vendor/jquery.idle.min.js') }}"></script>

    <script>
        $(function(){

            $(document).idle({
                onIdle: function(){
                    document.location = '{{ route('slide') }}';
                },
                idle: 1000 * 60 * 3 // 3 minute
            })

            $(document).keypress(function(e) {
                var key = String.fromCharCode(e.which);

                var menu = $('.section-menu-grid').find('[data-keymap=' + key + ']').first();

                if(menu.length > 0)
                {
                    document.location = menu.attr('href');
                }
            });

            $('.btn-detail').on('click', function(e){
                e.preventDefault();
                $.blockUI(BLOCKUI_STYLE);

                $.get($(this).attr('href'), '', function(response, status){
                    $.unblockUI();
                    $(response).modal('show');
                    $(response).on('hidden.bs.modal', function(e){
                        $(response).remove();
                    });
                });
            });
        });
    </script>
@stop