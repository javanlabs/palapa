<div class="nav nav-tabs">
    <li role="presentation" class="{{ ($active == 'byPhase')?'active':'' }}"><a  href="{{ route('statistic.byPhase', compact('year', 'type')) }}">Berdasar Tahapan Kasus</a></li>
    <li role="presentation" class="{{ ($active == 'byStatus')?'active':'' }}"><a href="{{ route('statistic.byStatus', compact('year', 'type')) }}">Perkara Baru - Perkara Ditutup</a></li>
    <li role="presentation" class="{{ ($active == 'byJaksa')?'active':'' }}"><a href="{{ route('statistic.byJaksa', compact('year', 'type')) }}">Perkara per Jaksa</a></li>
    <li role="presentation" class="{{ ($active == 'byCategory')?'active':'' }}"><a href="{{ route('statistic.byCategory', compact('year', 'type')) }}">Berdasar Kategori</a></li>
</div>