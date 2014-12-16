<aside>
<ul class="list-group">
    <a class="list-group-item {{ (isset($page) && $page == 'case')?'active':'' }}" href="{{ route('frontend.search') }}">Cari Kasus</a>
    <a class="list-group-item {{ (isset($page) && $page == 'officer')?'active':'' }}" href="{{ route('frontend.officer') }}">Daftar Jaksa</a>
<?php
$posts = \Eendonesia\Skrip\Post\Post::where('position','=','main')->where('status','=','published')->get();
foreach ($posts as $val):		
?>
    <a class="list-group-item {{ (isset($page) && $page == $val->id)?'active':'' }}" href="{{ route('frontend.post',[$val->id]) }}">{{$val->title}}</a>
    <?php endforeach;?>
</ul>


@if(Auth::check())
<ul class="list-group">
    <a class="list-group-item list-group-item-success {{ (isset($page) && $page == 'backend-cases')?'active':'' }}" href="{{ route('backend.cases.create') }}"><i class="fa fa-plus"></i> Tambah Kasus</a>
</ul>
@endif

<ul class="list-group">
@if(Auth::guest())
<a class="list-group-item" href="{{ route('gapura.login') }}">Login</a>
@else
<a class="list-group-item {{ (isset($page) && $page == 'backend-dashboard')?'active':'' }}" href="{{ route('dashboard.index') }}">Dashboard</a>
<a class="list-group-item {{ (isset($page) && $page == 'backend-officer')?'active':'' }}" href="{{ route('backend.officers.index') }}">Manajemen SDM</a>
<a class="list-group-item {{ (isset($page) && $page == 'backend-posts')?'active':'' }}" href="/skrip/posts">Manajemen Informasi</a>
<a class="list-group-item {{ (isset($page) && $page == 'backend-template')?'active':'' }}" href="/backend/templates">Manajemen Template</a>
<a class="list-group-item {{ (isset($page) && $page == 'backend-setting')?'active':'' }}" href="{{ route('setting.index') }}">Konfigurasi</a>
<a class="list-group-item" href="{{ route('gapura.logout') }}">Logout</a>
@endif
</ul>

</aside>
