<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($active == 'jaksa')?'active':'' }}"><a href="{{ route('backend.officers.index', ['role' => 'jaksa']) }}"><span class="badge">{{ $countJaksa }}</span> Jaksa</a></li>
    <li role="presentation" class="{{ ($active == 'staff')?'active':'' }}"><a href="{{ route('backend.officers.index', ['role' => 'staff']) }}"><span class="badge">{{ $countStaff }}</span> Staff</a></li>
</ul>