@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">File Manager</span>
@stop

@section('content-admin')
    <h2 class="page-title">File Manager</h2>
    <div class="panel panel-default">
        <div class="panel-heading">
            @foreach($paths as $url => $label)
                <a href="{{ $url }}">{{ $label }}</a>
                <i class="fa fa-angle-right"></i>
            @endforeach
        </div>
        <table class="table table-bordered">
            @foreach($items as $item)
                <tr>
                    <td>
                        @if($item['is_file'])
                            @if($item['is_image'])
                                <i class="fa fa-file-image-o"></i>
                            @elseif($item['is_video'])
                                <i class="fa fa-file-video-o"></i>
                            @else
                                <i class="fa fa-file-o"></i>
                            @endif
                        @else
                            <i class="fa fa-folder-o"></i>
                        @endif
                        <a href="{{ $item['permalink'] }}">{{ $item['name'] }}</a>
                    </td>
                    <td>
                        @if($item['is_directory'])
                            <small class="badge">{{ $item['file_count'] }} files</small>
                        @else
                            <small class="text-muted">{{ $item['extension'] }}</small>
                        @endif
                    </td>
                    <td>
                        {{ $item['size_for_human'] }}
                    </td>

                </tr>
            @endforeach
        </table>
    </div>
@stop

