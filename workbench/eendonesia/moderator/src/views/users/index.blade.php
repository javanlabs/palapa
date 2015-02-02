@extends('layouts.admin.admin')

@section('content-admin')

<div class="container-fluid">
    <div class="panel panel-default">
        <div class="panel-heading">
            <span class="subtitle">{{ count($users) }} User Terdaftar</span>
            {{--<a class="btn btn-default" href="{{ route('moderator.users.create') }}"><i class="ion-plus"></i> Tambah User</a>--}}
        </div>
        <table class="table">
            <thead>
            <tr>
                <th>Nama</th>
                <th>Username/Email</th>
                <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td class="text-center">
                        <div class="btn-group">
                            <a href="{{ route('moderator.users.edit', [$user->id]) }}" class="btn btn-default btn-xs">Edit</a>
                            <a href="{{ route('moderator.users.reset_password', [$user->id]) }}" class="btn btn-xs btn-info btn-reset-password">Reset Password</a>
                            {{ Form::delete(route('moderator.users.destroy', [$user->id]), 'Delete', ['class' => 'form-delete'], ['class' => 'btn btn-danger btn-xs btn-delete']) }}
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>

@stop

@section('script-end')
    @parent
    <script>
        $(function(){
            $(document).on('click', '.btn-reset-password', function(e){
                e.preventDefault();
                var btn = $(e.currentTarget);

                bootbox.confirm("Password lama akan dihapus dan password baru akan digenerate secara otomatis oleh sistem. Anda yakin ingin melanjutkan?", function(result) {
                    if(result)
                    {
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
                    }
                });

            });
        });
    </script>
@stop