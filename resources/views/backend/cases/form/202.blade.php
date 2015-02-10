{{ BootForm::textarea('Kasus Posisi', 'kasus')->rows(4) }}
{{ BootForm::select('Kategori', 'category')->options($categories) }}
{{--{{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3) }}--}}
{{ BootForm::select('Yang Ditugaskan', 'penyidik_id')->options($penyidikLookup) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}

