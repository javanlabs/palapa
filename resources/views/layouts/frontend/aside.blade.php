<aside>
<ul class="list-group">
    <a class="list-group-item {{ ($page == 'case')?'active':'' }}" href="{{ route('frontend.search') }}">Cari Kasus</a>
    <a class="list-group-item {{ ($page == 'organization')?'active':'' }}" href="{{ route('frontend.organization') }}">Struktur Organisasi</a>
    <a class="list-group-item {{ ($page == 'officer')?'active':'' }}" href="{{ route('frontend.officer') }}">Daftar Jaksa</a>
    <a class="list-group-item {{ ($page == 'profile')?'active':'' }}" href="{{ route('frontend.profile') }}">Profil Kejari Jember</a>
</ul>

@if(Auth::guest())
<a class="btn btn-default btn-block" href="{{ route('gapura.login') }}">Login</a>
@else
<a class="btn btn-default btn-block" href="{{ route('gapura.home') }}">Dashboard</a>
<a class="btn btn-default btn-block" href="{{ route('gapura.logout') }}">Logout</a>
@endif
</aside>
