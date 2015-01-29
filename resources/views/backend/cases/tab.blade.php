<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($owner == 'all')?'active':'' }}"><a href="{{ route('backend.cases.index', ['owner' => 'all']) }}">Semua Perkara <span class="badge">{{ $count['all'] }}</span></a></li>
    <li role="presentation" class="{{ ($owner == 'me')?'active':'' }}"><a href="{{ route('backend.cases.index', ['owner' => 'me']) }}">Perkara Saya <span class="badge">{{ $count['me'] }}</span></a></li>
</ul>