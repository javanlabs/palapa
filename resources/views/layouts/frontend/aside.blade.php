<aside>
<ul class="list-group">
    <a class="list-group-item {{ ($page == 'case')?'active':'' }}" href="{{ route('frontend.search') }}">Cari Kasus</a>
    <a class="list-group-item {{ ($page == 'organization')?'active':'' }}" href="{{ route('frontend.organization') }}">Struktur Organisasi</a>
    <a class="list-group-item {{ ($page == 'officer')?'active':'' }}" href="{{ route('frontend.officer') }}">Daftar Jaksa</a>
    <a class="list-group-item {{ ($page == 'profile')?'active':'' }}" href="{{ route('frontend.profile') }}">Profil Kejari Jember</a>
</ul>

<ul class="list-group">
@if(Auth::guest())
<a class="list-group-item" href="{{ route('gapura.login') }}">Login</a>
@else
<a class="list-group-item {{ ($page == 'backend-dashboard')?'active':'' }}" href="{{ route('dashboard.index') }}">Dashboard</a>
<a class="list-group-item {{ ($page == 'backend-officer')?'active':'' }}" href="{{ route('backend.officers.index') }}">Manajemen SDM</a>
<a class="list-group-item {{ ($page == 'backend-setting')?'active':'' }}" href="{{ route('setting.index') }}">Konfigurasi</a>
<a class="list-group-item" href="{{ route('gapura.logout') }}">Logout</a>
@endif
</ul>

</aside>
