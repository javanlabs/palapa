<footer class="text-center text-muted hidden-print">
    <a href="{{ (Auth::check())?route('admin.home'):route('gapura.login') }}" class="">
        <i class="ion-ios-locked"></i>
    </a>
    <a href="{{ route('slide') }}" class="">
        <i class="ion-ios-play"></i>
    </a>
    <br/>
    <small>&copy; {{ date('Y') }} Kejaksaan Negeri Jember</small>
</footer>
