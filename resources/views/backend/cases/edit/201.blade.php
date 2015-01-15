<fieldset>
    {{--{{ BootForm::text('Tanggal', 'start_date')->addClass('datepicker')->data('provide', 'datepicker')->data('orientation', 'bottom auto')->data('date-today-highlight', 'true')->value($case['start_date']) }}--}}
    {{ BootForm::text('Kasus Posisi', 'kasus')->value($case->kasus) }}
    {{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3)->value($case->pasal) }}
    {{ BootForm::select('Penyidik', 'penyidik_id')->options($penyidikLookup)->select($case->penyidik_id) }}
    {{ BootForm::select('Jaksa Penuntut Umum', 'jaksa_id')->options($jaksaLookup)->select($case->jaksa_id) }}
    {{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup)->select($case->staff_id) }}
</fieldset>

