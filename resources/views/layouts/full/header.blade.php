<nav class="navbar navbar-header" role="navigation">
    <div class="container-fluid">
        <div class="col-md-6 trails">
            <a href="{{ route('home') }}" class="home">
                <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-home fa-stack-1x fa-inverse"></i>
                </span>
            </a>
            <span class="trail"><i class="fa fa-angle-right"></i></span>
            @yield('breadcrumb')
        </div>
        <div class="col-md-6 text-right">
            <img class="logo" src="{{ asset('images/logo-kejari.jpg') }}" alt=""/>
            <h1>APLIKASI MONITORING KASUS</h1>
            <h3>Kejaksaan Negeri Jember</h3>
        </div>
    </div>
</nav>

<div class="clearfix"></div>
