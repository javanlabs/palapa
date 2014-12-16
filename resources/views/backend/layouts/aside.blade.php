<aside>
<ul class="list-group">
    <a class="list-group-item {{ ($page == 'case')?'active':'' }}" href="{{ route('frontend.search') }}">Cari Kasus</a> 
    <a class="list-group-item {{ ($page == 'officer')?'active':'' }}" href="{{ route('frontend.officer') }}">Daftar Jaksa</a>   
</ul>

@if(Auth::guest())
<a class="btn btn-default btn-block" href="{{ route('gapura.login') }}">Login</a>
@else
<a class="btn btn-default btn-block" href="{{ route('gapura.home') }}">Dashboard</a>
<a class="btn btn-default btn-block" href="{{ route('gapura.home') }}">Manajemen SDM</a>
<a class="btn btn-default btn-block" href="{{ route('gapura.home') }}">Konfigurasi</a>
<a class="btn btn-default btn-block" href="{{ route('gapura.logout') }}">Logout</a>
@endif
</aside>
