<h2>Statistik Kasus</h2>
<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($active == 'byPhase')?'active':'' }}"><a href="{{ route('dashboard.byPhase') }}">Berdasar Status</a></li>
    <li role="presentation" class="{{ ($active == 'byStatus')?'active':'' }}"><a href="{{ route('dashboard.byStatus') }}">Kasus Baru - Kasus Ditutup</a></li>
    <li role="presentation" class="{{ ($active == 'byJaksa')?'active':'' }}"><a href="{{ route('dashboard.byJaksa') }}">Kasus per Jaksa</a></li>
</ul>
