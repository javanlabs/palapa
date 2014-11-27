<nav class="navbar navbar-fixed-top navbar-home" role="navigation">
  <img style="height:50px; float: left; margin:0 25px 0 50px" src="{{ asset('images/logo-kejari.jpg') }}" alt=""/>

  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-7">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <span class="navbar-brand">SIMSOP</span>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-7">
      <p class="navbar-text navbar-left">
        <a class="navbar-link" href="{{ url('/kasus') }}">Cari Kasus</a>
        <a class="navbar-link" href="{{ url('/statistik') }}">Statistik</a>
        <a class="navbar-link add" href="" data-toggle="modal" data-target="#modal-add">Tambah Kasus</a>
      </p>
      <p class="navbar-text navbar-right">
        <a class="navbar-link" href="">Bayu Hendra</a>
        <a class="navbar-link" href="{{ url('logout') }}">Logout</a>
      </p>
    </div>
  </div>
</nav>

<style>
    .navbar-home {
        background-color: #fff;
        opacity: .95;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
    }
    .navbar-home a{color: #3bafda; padding: 5px 20px; text-transform: uppercase; font-weight: 700; font-size: .9em}
    .navbar-home a.add{color: #fff; background-color: #3bafda; border: 1px solid #3bafda; border-radius: 50px;}
</style>
