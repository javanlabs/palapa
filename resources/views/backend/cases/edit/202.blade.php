{{ BootForm::text('Nomor SPDP', 'spdp_number')->value($case->spdp_number) }}
{{ BootForm::text('Tanggal SPDP', 'spdp_date')->addClass('datepicker')->data('provide', 'datepicker')->value($case->spdp_date) }}
{{ BootForm::text('Kasus Posisi', 'kasus')->value($case->kasus) }}
{{ BootForm::select('Kategori', 'category')->options($categories)->select($case->category) }}
{{ BootForm::text('Tempat Kejadian', 'crime_place')->value($case->crime_place) }}
{{ BootForm::text('Waktu Kejadian', 'crime_time')->addClass('datetimepicker')->value($case->crime_time) }}
{{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3)->value($case->pasal) }}
{{ BootForm::select('Penyidik', 'penyidik_id')->options($penyidikLookup)->select('e'.$case->penyidik_id) }}
{{ BootForm::select('Jaksa Penuntut Umum', 'jaksa_id')->options($jaksaLookup)->select($case->jaksa_id) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup)->select($case->staff_id) }}
