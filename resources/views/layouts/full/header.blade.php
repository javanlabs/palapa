@if(Auth::check())
    <div class="navbar-user">
        <div class="container-fluid">
            Login sebagai
            <!-- Single button -->
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
    </div>
@endif

<nav class="navbar navbar-header" role="navigation">
    <div class="container-fluid">
        <div class="col-md-6 col-sm-10 col-xs-10 trails">
            <a href="{{ route('home') }}" class="home">
                <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa ion-monitor fa-stack-1x fa-inverse"></i>
                </span>
            </a>
            <span class="trail"><i class="fa fa-angle-right"></i></span>
            @yield('breadcrumb')
        </div>
        <div class="col-md-6 col-sm-2 col-xs-2 text-right">
            <img class="logo" src="{{ asset('images/logo-kejari.jpg') }}" alt=""/>
            <h1 class="hidden-xs hidden-sm">PROFIL KEJAKSAAN NEGERI JEMBER</h1>
            {{--<h3>Kejaksaan Negeri Jember</h3>--}}
        </div>
    </div>
</nav>

<div class="clearfix"></div>
