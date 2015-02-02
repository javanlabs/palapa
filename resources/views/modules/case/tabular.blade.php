<table class="table table-bordered table-case-info">
    <tbody>
    <tr>
        <td colspan="3" width="50%">
            <h3 class="mb-0">{{ $case['name'] }}</h3>
            <small class="text-muted"><strong>No SPDP:</strong> {{ $case['spdp_number'] }}</small>
            <br/>
        </td>
        <td colspan="4" rowspan="2">
            <dl>
                <dt>Pasal</dt>
                <dd>{{ nl2br($case['pasal']) }}</dd>
            </dl>
            <hr/>
            <dl>
                <dt>Tersangka</dt>
                <dd>{{ $case->suspectNames() }}</dd>
            </dl>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <dl>
                <dt>Tempat Kejadian</dt>
                <dd>{{ $case['crime_place'] }}</dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Waktu Kejadian</dt>
                <dd>{{ $case['crime_time_for_human'] }}</dd>
            </dl>
        </td>
    </tr>
    <tr>
        <td>
            <dl>
                <dt>Penyidik</dt>
                <dd>{{ $case['penyidik_name'] }}</dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Jaksa</dt>
                <dd>{{ $case['prosecutor_name'] }}</dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Staff Administrasi</dt>
                <dd>{{ $case['staff_name'] }}</dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Kategori</dt>
                <dd><span class="label label-default">{{ $case['category'] }}</span></dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Jenis Kasus</dt>
                <dd><span class="label label-default">{{ $case['type_name'] }}</span></dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Status</dt>
                <dd><span class="label label-default">{{ $case['status_name'] }}</span></dd>
            </dl>
        </td>
        <td>
            <dl>
                <dt>Usia Kasus</dt>
                <dd>
                    @if($case['age'] !== false)
                        {{ $case['age'] }} hari
                    @else
                        <span class="label label-default">{{ $case['status'] }}</span>
                    @endif
                </dd>
            </dl>
        </td>
    </tr>
    </tbody>
</table>