@if ($errors->count() > 0)
    <div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        Periksa kembali inputan Anda
    </div>
@endif

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

