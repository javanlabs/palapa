<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($officer == 'all')?'active':'' }}"><a href="{{ route('backend.cases.index', ['officer' => 'all']) }}">Semua Kasus <span class="badge">{{ $count['all'] }}</span></a></li>
    <li role="presentation" class="{{ ($officer == 'my')?'active':'' }}"><a href="{{ route('backend.cases.index', ['officer' => 'my']) }}">Kasus Saya <span class="badge">{{ $count['my'] }}</span></a></li>
</ul>