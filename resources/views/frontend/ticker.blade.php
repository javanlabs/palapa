<div id="slider">
    <div id="items-slider">
        <ul>
            <li>
        <div class="item">
        <table class="table">
                    <thead>
                        <tr style='background-color: black'>
                            <td width='150px'>Nama Tersangka</td>
                            <td>Kasus/Pasal</td>
                            <td>Agenda</td>
                            <td>Jaksa Penuntut Umum</td>
                            <td>Tanggal</td>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse($items as $item)
                        <tr class='item'>
                            <td>
                                {{$item->cases->suspectNames()}}
                            </td>
                            <td>
                                {{$item->cases->kasus}}/{{$item->cases->pasal}}
                            </td>
                            <td>
                                {{ $item['agenda'] }}
                            </td>
                            <td>
                                {{$item->cases['jaksa_name']}}
                            </td>
                            <td style="padding-top: 20px">
                                {{$item['date_for_human']}}
                            </td>
                        </tr>
                    @empty
                        <tr><td><div class="empty text-center">Saat ini belum ada jadwal sidang.</div></td></tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
        </li>
    </ul>       
    </div>
</div>

@section('script-end')
    @parent
    <script src="{{ asset('vendor/jquery.vticker.js') }}"></script>

    <script>
        $(function(){
            $('#items-slider').vTicker({
                speed: 500,
                pause: {{ Config::get('slide.interval') }},
                animation: 'fade',
                mousePause: false,
                showItems: 8
            });
        });
    </script>
@stop