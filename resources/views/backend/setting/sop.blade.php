@extends('layouts.frontend.frontend')
@section('content')
    <h2>Setting</h2>

    {{ BootForm::open()->get()->action(route('setting.sop')) }}
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

        {{BootForm::select('Kasus', 'kasus_id')->options($casesLookup)}}
        {{ BootForm::submit('Update', 'btn-primary') }}
    {{ BootForm::close() }}
    
    @foreach($phases as $phase)
            <div class="panel-heading"><strong>{{ $phase['name'] }}</strong></div>
            <ul class="list-group">
                @foreach($phase['checklist'] as $item)                
                        <li class="list-group-item item-checklist" data-id="{{ $item['id'] }}">
                            <div class="checkbox">
                                <label>
                                    {{ $item['name'] }}                                    
                                </label>
                            </div>
                        </li>
                @endforeach
            </ul>
            @endforeach
@stop

