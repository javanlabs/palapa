<tr class="case-tracking">
    <td>
        @if($item['day_remaining'])
        {{ case_deadline($item['day_remaining']) }}
        @endif

        <h4 class="name mb-0">{{ $item['name'] }}</h4>
        <small class="text-muted">No SPDP {{ $item['spdp_number'] }}
            <br/>
            <strong>{{$item->category}}:</strong>
            @foreach($item->suspects as $suspect)
                {{$suspect->name}}
            @endforeach
        </small>

    </td>
    <td style="padding: 20px 10px">
        <div><i class="ion-person"></i> {{ $item['prosecutor_name'] }}</div>
        <hr style="margin-top: 10px; margin-bottom:10px; border-style: dashed none none"/>
        <div><i class="ion-ios-people"></i> {{ $item['penyidik_name'] }}</div>
    </td>
    <td colspan="{{ count($phases) }}" style="padding: 20px 10px">
        <div class="progress" style="margin-bottom: 0">
            @foreach($phases as $phase)
                <div class="progress-bar progress-bar-{{ $item->getPhaseHistoryStatus($phase->id) }}" role="progressbar" style="width: {{ 100/count($phases) }}%" data-toggle="popover" title="{{ $phase->name }}" data-content="{{ $item->getPhaseHistoryDescription($phase->id) }}"></div>
            @endforeach
        </div>
        <small class="text-muted"><strong><?php echo ($item->getLatestActivityAttribute()?$item->getLatestActivityAttribute()->name:'');?></strong> : {{ $item['last_update'] }}</small>

        @if($item['is_suspend'])
            <div class="label label-danger label-lg">Kasus Dihentikan</div>
        @endif
    </td>
    <td class="text-center">

        <div class="btn-group">
            @if(Auth::user() && Auth::user()->canManage($item))
            <a class="btn btn-default btn-sm" href="{{ $item['permalink_edit'] }}">
            Edit <i class="ion-ios-arrow-forward"></i>
            </a>
            @else
            <a class="btn btn-default btn-sm btn-detail" href="{{ $item['permalink'] }}">Info <i class="fa fa-chevron-right"></i></a>
            @endif
        </div>
    </td>
</tr>