@extends('layouts.admin.admin')

@section('content-admin')
<div class="container-fluid">
    <h2 class="page-title">Template Surat</h2>

    <table class="table table-condensed table-bordered">
        <tbody>
        @foreach($templates as $template)
        <tr>
            <td><h5><span class="badge">{{ $template->short_title }}</span> {{ $template->title }}</h5></td>
            <td>
                <a href="{{ route('backend.templates.edit', [$template->id]) }}" class="btn btn-default btn-sm">Edit</a>
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>
@stop
