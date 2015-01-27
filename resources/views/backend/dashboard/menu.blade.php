<div class="list-group list-group-menu">
    <a class="list-group-item {{ ($active == 'byPhase')?'active':'' }}" href="{{ route('dashboard.byPhase', compact('year')) }}"><span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span> Berdasar Tahapan Kasus</a>
    <a class="list-group-item {{ ($active == 'byStatus')?'active':'' }}" href="{{ route('dashboard.byStatus', compact('year')) }}"><span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span> Kasus Baru - Kasus Ditutup</a>
    <a class="list-group-item {{ ($active == 'byJaksa')?'active':'' }}" href="{{ route('dashboard.byJaksa', compact('year')) }}"><span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span> Kasus per Jaksa</a>
    <a class="list-group-item {{ ($active == 'pidumByCategory')?'active':'' }}" href="{{ route('dashboard.pidumByCategory', compact('year')) }}"><span class="badge"><i class="fa-2x ion-ios-arrow-forward"></i></span> Pidum</a>
</div>