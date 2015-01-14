<fieldset class="pad">
    {{--{{ BootForm::text('Tanggal', 'start_date')->addClass('datepicker')->data('provide', 'datepicker')->data('orientation', 'bottom auto')->data('date-today-highlight', 'true')->value(date('d-m-Y')) }}--}}
    {{ BootForm::text('Kasus Posisi', 'kasus') }}
    {{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3) }}
    {{ BootForm::select('Penyidik', 'penyidik_id')->options($penyidikLookup) }}
    {{ BootForm::select('Jaksa Penuntut Umum', 'jaksa_id')->options($jaksaLookup) }}
    {{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}
</fieldset>

