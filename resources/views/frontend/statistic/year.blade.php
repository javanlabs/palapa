{{ Form::open(['id' => 'formYear', 'method' => 'GET', 'style' => 'display:inline-block']) }}
{{ Form::select('year', array_combine(range(date('Y'), date('Y') - 3), range(date('Y'), date('Y') - 3)), $year, ['id' => 'selectYear']) }}
@if(isset($type))
    {{ Form::hidden('type', $type) }}
@endif
{{ Form::close() }}
