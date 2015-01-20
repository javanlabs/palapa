<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($active == 'jaksa')?'active':'' }}"><a href="{{ route('backend.officers.index', ['role' => 'jaksa']) }}">Jaksa</a></li>
    <li role="presentation" class="{{ ($active == 'staff')?'active':'' }}"><a href="{{ route('backend.officers.index', ['role' => 'staff']) }}">Staff</a></li>
</ul>