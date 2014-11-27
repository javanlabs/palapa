@extends('layouts.empty')
@section('content')
    <div class="container">
    <form class="form-signin" role="form" action="{{ url('login') }}" method="post">
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
        <div class="text-center" style="margin-bottom: 50px">
        <img src="{{ asset('images/logo-kejari.jpg') }}" width="100px" alt=""/>
        <h2 class="form-signin-heading">Sistem Informasi Monitoring SOP
        <small>Kejaksaan Negeri Jember</small>
        </h2>
        </div>
        <label for="inputEmail" class="sr-only">User ID</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="User ID" required autofocus>
        <label for="inputPassword" class="sr-only">Kata Sandi</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Kata Sandi" required>
        <div class="checkbox">
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="remember-me"> Ingat saya di komputer ini
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>

    </div>
@stop

@section('style-head')
<style>
body{
    background-color: #398676;
}

.form-signin {
  max-width: 380px;
  padding: 15px;
  margin: 100px auto 0;
  background-color: #fff;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
h2{
    font-size: 1.5em;
    line-height:1.25em;
    color: #345;
}
h2 small{color:#678; font-size: .7em; font-weight: 400; text-transform: uppercase}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
@stop
