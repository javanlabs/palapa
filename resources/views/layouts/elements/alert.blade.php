@if ($errors->count() > 0)
    <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        Periksa kembali inputan Anda
    </div>
@endif

@include('flash::message')

@if (Session::has('flash.error'))
    <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        {{ Session::get('flash.error') }}
    </div>
@endif

@if (Session::has('flash.success'))
    <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        {{ Session::get('flash.success') }}
    </div>
@endif

@if (Session::has('flash.info'))
    <div class="alert alert-info">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        {{ Session::get('flash.info') }}
    </div>
@endif

@if (Session::has('flash.warning'))
    <div class="alert alert-warning">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        {{ Session::get('flash.warning') }}
    </div>
@endif
