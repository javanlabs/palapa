<div class="case-tracking clearfix item panel panel-default">
    <div class="panel-body clearfix">
        <div class="col-md-6">
            @if($item['day_remaining'])
                {{ case_deadline($item['day_remaining']) }}
            @endif

            <h3 class="name mv-0">{{ $item['name'] }}</h3>
            <small class="text-muted">No SPDP {{ $item['spdp_number'] }}</small>

            @if($item['is_suspend'])
            <div class="label label-danger label-lg">Kasus Dihentikan</div>
            @endif

        </div>
        <div class="col-md-6">
            <dl>
                <dt>Pasal</dt>
                <dd>{{ nl2br($item['pasal']) }}</dd>
            </dl>
            <hr/>
            <dl>
                <dt>Tersangka</dt>
                <dd>{{ $item->suspectNames() }}</dd>
            </dl>
        </div>
    </div>

    <div class="panel-body box-progress">
        <div class="progress" style="margin-bottom: 0">
            @foreach($phases as $phase)
                <div class="progress-bar progress-bar-{{ $item->getPhaseHistoryStatus($phase->id) }}" role="progressbar" style="width: {{ 100/count($phases) }}%" data-toggle="popover" title="{{ $phase->name }}" data-content="{{ $item->getPhaseHistoryDescription($phase->id) }}"></div>
            @endforeach
        </div>

        <div><small class="text-muted"><strong><?php echo ($item->getLatestActivityAttribute()?$item->getLatestActivityAttribute()->name:'');?></strong> : {{ $item['last_update'] }}</small></div>

        <span class="label label-default">{{ $item['type_name'] }}</span>
        <span class="label label-default">{{ $item['category'] }}</span>
        <span class="label label-default">{{ $item['status_name'] }}</span>
        <span class="label label-default">
            @if($item['age'] !== false)
                {{ $item['age'] }} hari
            @else
                {{ $item['status'] }}
            @endif
        </span>
    </div>

    <div class="panel-footer clearfix">
        <div class="col-md-3">
            <div class="ell person"><i class="ion-person"></i> {{ $item['prosecutor_name'] }}</div>
        </div>
        <div class="col-md-3">
            <div class="ell person"><i class="ion-ios-people"></i> {{ $item['penyidik_name'] }}</div>
        </div>
        <div class="col-md-3">
            <div class="ell person"><i class="ion-ios-person-outline"></i> {{ $item['staff_name'] }}</div>
        </div>
        <div class="col-md-3 text-right">
            @if(Auth::user() && Auth::user()->canManage($item))
                <a class="btn btn-default btn-xs" href="{{ $item['permalink_edit'] }}">
                    Edit <i class="ion-ios-arrow-forward"></i>
                </a>
            @else
                <a class="btn btn-default btn-xs btn-detail" href="{{ $item['permalink'] }}">Info <i class="fa fa-chevron-right"></i></a>
            @endif
        </div>
    </div>
</div>