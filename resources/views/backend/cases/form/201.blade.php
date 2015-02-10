{{ BootForm::text('Tanggal SPDP Diterima', 'spdp_diterima_date')->addClass('datepicker')->data('provide', 'datepicker')->value(date('d-m-Y')) }}
{{ BootForm::text('Nomor SPDP', 'spdp_number') }}
{{ BootForm::text('Tanggal SPDP', 'spdp_date')->addClass('datepicker')->data('provide', 'datepicker') }}
{{ BootForm::textarea('Kasus Posisi', 'kasus')->rows(4) }}
{{ BootForm::select('Kategori', 'category')->options($categories) }}
{{ BootForm::text('Tempat Kejadian', 'crime_place') }}
{{ BootForm::text('Waktu Kejadian', 'crime_time')->addClass('datetimepicker') }}
{{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3) }}
{{ BootForm::select('Penyidik', 'penyidik_id')->options($penyidikLookup) }}
{{ BootForm::select('Jaksa Penuntut Umum', 'jaksa_id')->options($jaksaLookup) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}