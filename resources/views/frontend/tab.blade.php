<div class="list-group list-group-menu">
    <a href="{{ route('frontend.search') }}?type={{ $type }}" class="list-group-item ellipsis {{ ($active == 'perkara')?'active':''}}">
        <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
        Daftar Perkara
    </a>
    @if($type != App\Cases\Cases::TYPE_DATUN)
    <a href="{{ route('frontend.sidang') }}?type={{ $type }}" class="list-group-item ellipsis {{ ($active == 'sidang')?'active':''}}">
        <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
        Jadwal Sidang
    </a>
    @endif
    <a href="{{ route('statistic.index') }}?type={{ $type }}" class="list-group-item ellipsis {{ ($active == 'statistik')?'active':''}}">
        <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
        Statistik
    </a>

    @foreach($allPostInCategory as $item)
        <a href="{{ route('frontend.post.byCaseType', ['id' => $item['id']]) }}" class="list-group-item ellipsis {{ ($active == $item['id'])?'active':''}}">
            <span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span>
            {{ $item['title'] }}
        </a>
    @endforeach
</div>
