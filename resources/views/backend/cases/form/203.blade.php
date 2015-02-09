{{ BootForm::text('Kasus Posisi', 'kasus') }}
{{ BootForm::select('Kategori', 'category')->options($categories) }}
{{ BootForm::select('Yang Ditugaskan', 'penyidik_id')->options($penyidikLookup) }}
{{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}

