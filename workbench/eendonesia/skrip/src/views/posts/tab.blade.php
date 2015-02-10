<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($active == 'pembinaan')?'active':'' }}"><a href="{{ route('skrip.posts.index', ['position' => 'pembinaan']) }}"><span class="badge">{{ $count['pembinaan'] }}</span> Pembinaan</a></li>
    <li role="presentation" class="{{ ($active == 'intelijen')?'active':'' }}"><a href="{{ route('skrip.posts.index', ['position' => 'intelijen']) }}"><span class="badge">{{ $count['intelijen'] }}</span> Intelijen</a></li>
    <li role="presentation" class="{{ ($active == '201')?'active':'' }}"><a href="{{ route('skrip.posts.index', ['position' => '201']) }}"><span class="badge">{{ $count['pidum'] }}</span> Pidum (201)</a></li>
    <li role="presentation" class="{{ ($active == '202')?'active':'' }}"><a href="{{ route('skrip.posts.index', ['position' => '202']) }}"><span class="badge">{{ $count['pidsus'] }}</span> Pidsus (202)</a></li>
</ul>