<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($active == 'pembinaan')?'active':'' }}"><a href="{{ route('skrip.posts.index', ['position' => 'pembinaan']) }}"><span class="badge">{{ $countPembinaan }}</span> Pembinaan</a></li>
    <li role="presentation" class="{{ ($active == 'intelijen')?'active':'' }}"><a href="{{ route('skrip.posts.index', ['position' => 'intelijen']) }}"><span class="badge">{{ $countIntelijen }}</span> Intelijen</a></li>
</ul>