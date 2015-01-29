<div class="row" style="margin-top: 40px">
    <div class="col-md-4">
        <h2 class="page-title">Statistik</h2>
    </div>
    <div class="col-md-8 text-right">
        {{ Form::open(['id' => 'formYear', 'method' => 'GET']) }}
            <label for="">Pilih Tahun: </label>
            {{ Form::select('year', array_combine(range(date('Y'), date('Y') - 3), range(date('Y'), date('Y') - 3)), $year, ['id' => 'selectYear']) }}
            @if(isset($type))
            {{ Form::hidden('type', $type) }}
            @endif
        {{ Form::close() }}
    </div>
</div>

<ul class="nav nav-tabs" style="margin-bottom: 20px">
    <li role="presentation" class="{{ ($active == 'byPhase')?'active':'' }}"><a href="{{ route('dashboard.byPhase') }}">Berdasar Tahapan Kasus</a></li>
    <li role="presentation" class="{{ ($active == 'byStatus')?'active':'' }}"><a href="{{ route('dashboard.byStatus') }}">Perkara Baru - Perkara Ditutup</a></li>
    <li role="presentation" class="{{ ($active == 'byJaksa')?'active':'' }}"><a href="{{ route('dashboard.byJaksa') }}">Perkara per Jaksa</a></li>
</ul>

@section('script-end')
    @parent
    <script>
    $(function(){

        $(document).on('change', '#selectYear', function(e){
            $('#formYear').submit();
        });

    });
    </script>
@stop
