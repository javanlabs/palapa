@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('moderator.users.index') }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->put()->action(route('moderator.users.update', [$user->id])) }}
    <div class="panel-default panel">
        <div class="panel-heading">
            <h4>Edit User</h4>
        </div>
        <div class="panel-body">
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="hidden" name="id" value="{{ $user->id }}"/>
            {{ BootForm::text('Nama', 'name')->value($user->name) }}
            {{ BootForm::text('Username/Email', 'email')->value($user->email) }}

            <label for="">Group</label>
            @foreach($groups as $key => $group)
                <div class="checkbox">
                    <label class="control-label">
                        {{ Form::checkbox('groups[' . $key . ']', $group->id, Input::old('groups[' . $key . ']', in_array($group->id, $userGroups))) }}
                        {{ $group->name }}
                    </label>
                </div>
            @endforeach
        </div>
        <div class="panel-footer">
            {{ BootForm::submit('Simpan', 'btn-primary') }}
            <a class="btn btn-default" href="{{ route('moderator.users.index') }}">Batal</a>
        </div>
    </div>
    {{ BootForm::close() }}
@stop


@section('script-end')
    @parent
    <script>
        $(function(){
            $(document).on('click', '.btn-reset-password', function(e){
                e.preventDefault();
                var btn = $(e.currentTarget);

                btn.button('loading');
                $.ajax({
                    url: btn.attr('href'),
                    type: 'get',
                    dataType: 'json'
                }).done(function(response){
                    bootbox.alert("Password baru: " + response.password);
                }).fail(function(){
                    alert('Oops, tidak bisa melakukan perubahan password saati ini. Coba lagi beberapa saat atau hubungi admin.');
                }).always(function(){
                    btn.button('reset');
                });
            });
        });
    </script>
@stop