@if(Auth::check())

<?php
    $caseAlertCount = App::make('App\Cases\RepositoryInterface')->countAlert(Auth::user());
?>
    <div class="navbar-user">
        <div class="container-fluid">
            <div class="col-md-4"></div>
            <div class="col-md-4 text-center">
                Login sebagai
                <div class="btn-group">
                    <button type="button" class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <strong>{{ Auth::user()->name }}</strong> <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ route('admin.home') }}"><i class="ion-navicon"></i> Backend</a></li>
                        <li><a href="{{ route('me.profile') }}"><i class="ion-person"></i> Ganti Password</a></li>
                        <li class="divider"></li>
                        <li><a href="{{ route('gapura.logout') }}"><i class="fa fa-circle-o-notch"></i> Logout</a></li>
                    </ul>
                </div>

            </div>
            <div class="col-md-4">
                <div class="notification">
                    <a href="{{ route('backend.cases.alert') }}"><span>{{ $caseAlertCount }} Perkara Perlu Penanganan</span></a>
                </div>
            </div>
        </div>
    </div>
@endif
