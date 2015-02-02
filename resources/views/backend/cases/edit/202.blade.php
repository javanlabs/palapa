{{ BootForm::text('Kasus Posisi', 'kasus')->value($case->kasus) }}
{{ BootForm::select('Kategori', 'category')->options($categories)->select($case->category) }}
{{--{{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3)->value($case->pasal) }}--}}
{{ BootForm::select('Yang Ditugaskan', 'penyidik_id')->options($penyidikLookup)->select($case->penyidik_id_custom) }}
{{ BootForm::select('Jaksa Penuntut Umum', 'jaksa_id')->options($jaksaLookup)->select($case->jaksa_id) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup)->select($case->staff_id) }}

