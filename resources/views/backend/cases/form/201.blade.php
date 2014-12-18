<fieldset>
<h4>Penerimaan SPDP</h4>
<hr />
{{ BootForm::text('Nomor SPDP', 'spdp_number') }}
{{ BootForm::text('Tanggal', 'start_date')->addClass('datepicker')->data('provide', 'datepicker')->data('orientation', 'bottom auto')->data('date-today-highlight', 'true')->value(date('Y-m-d')) }}
{{ BootForm::text('Kasus', 'kasus') }}
{{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3) }}
{{ BootForm::text('Penyidik', 'penyidik') }}
</fieldset>

<fieldset>
<h4>Data Diri Tersangka</h4>
<hr />
{{ BootForm::text('Nama Lengkap', 'suspect_name') }}
{{ BootForm::select('Tempat Lahir', 'suspect_pob')->options($cities) }}
{{ BootForm::text('Tanggal Lahir', 'suspect_dob')->addClass('datepicker')->data('provide', 'datepicker')->data('date-start-view', 2) }}
{{ BootForm::select('Agama', 'suspect_religion')->options($religions) }}
{{ BootForm::textarea('Alamat', 'suspect_address') }}
{{ BootForm::select('Kota', 'suspect_city_id')->options($cities) }}
{{ BootForm::text('Kewarganegaraan', 'suspect_nationality') }}
{{ BootForm::text('Pendidikan', 'suspect_education') }}
{{ BootForm::text('Pekerjaan', 'suspect_job') }}
</fieldset>

<fieldset>
<h4>Penugasan</h4>
<hr />
{{ BootForm::select('Jaksa/Penuntut Umum', 'jaksa_id')->options($jaksaLookup) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}
</fieldset>
