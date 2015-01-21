{{ BootForm::text('Kasus Posisi', 'kasus') }}
{{ BootForm::select('Kategori', 'category')->options($categories) }}
{{ BootForm::text('Tempat Kejadian', 'crime_place') }}
{{ BootForm::text('Waktu', 'crime_time')->addClass('datetimepicker') }}
{{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3) }}
{{ BootForm::select('Penyidik', 'penyidik_id')->options($penyidikLookup) }}
{{ BootForm::select('Jaksa Penuntut Umum', 'jaksa_id')->options($jaksaLookup) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}

