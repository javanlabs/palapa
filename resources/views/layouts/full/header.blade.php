<nav class="navbar navbar-back-home" role="navigation">
    <div class="container-fluid">
        <div class="col-md-4">
            <a href="{{ route('home') }}" class="home">
                <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-home fa-stack-1x fa-inverse"></i>
                </span>
            </a>
            <span class="trail"><i class="fa fa-angle-right"></i></span>
            <span class="trail">@yield('breadcrumb-title')</span>
        </div>
        <div class="col-md-4 text-center">
        </div>
        <div class="col-md-4"></div>
    </div>
</nav>
