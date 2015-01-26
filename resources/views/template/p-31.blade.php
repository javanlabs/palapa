<table>
<tbody>
<tr>
	<td style="text-align: center;" width="250px">
		<strong><u data-redactor-tag="u">KEJAKSAAN NEGERI JEMBER</u><br>
		"UNTUK KEADILAN"
		</strong>
	</td>
	<td width="300px">
	</td>
	<td style="text-align: right;">
		<strong>
			P‑31
		</strong>
	</td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
	<td>
		<p>
			No. Reg. Perkara : <u> </u>
		</p>
		<p>
			No. Reg. Tahanan : <u> </u>
		</p>
		<p>
			No. Reg. Bukti : <u> </u>
		</p>
	</td>
</tr>
</tbody>
</table>
<p style="text-align: center;">
	<strong>
	SURAT PELIMPAHAN PERKARA
	</strong>
</p>
<p style="text-align: center;">
	<strong>
	ACARA PEMERIKSAAN BIASA
	</strong>
</p>
<p style="text-align: center;">
	<strong>
	NOMOR: ..................................................
	</strong>
</p>
<p style="text-align: center;">
	<strong>
	KEPALA KEJAKSAAN NEGERI JEMBER</strong>
</p>
<table border='1'>
<tbody>
<tr>
	<td width="100px">
		<p>
			Membaca :
		</p>
	</td>
	<td>
		<p>
			Berkas Perkara Reg. Nomor…….……. Tanggal……………tahun……… yang dibuat oleh‑Penyidik atas sumpah jabatan dalam perkara terdakwa.
		</p>
		<table>
		<tbody>
		<tr>
			<td width="5px">
					No.
			</td>
			<td width="150px">				
					Nama
					Terdakwa
				
			</td>
			<td width="150px">
				
					Ditahan Penyidik/ Penuntut Umum
				
			</td>
			<td>
				
					Jenis Tahanan
				<ol type='a'>
					<li>Rutan tgl.</li>				
					<li>Rutan tgl.</li>				
					<li>Kota Tgl.</li>
				</ol>
				
			</td>
			<td>				
					Keterangan				
			</td>
		</tr>

		<tr align='center'>
			<td>
				1
			</td>
			<td>
				2
			</td>
			<td>
				3
			</td>
			<td>
				4
			</td>
			<td>
				5
			</td>
		</tr>
		<?php $counter = 1;?>
		@foreach($case->suspects as $suspect)
		<tr>
			<td>
				{{$counter++}}
			</td>
			<td>
				{{$suspect->name}}
			</td>
			<td>
				{{$case->penyidik->name}}
			</td>
			<td>
				{{$suspect->tahanan}} / {{$suspect->tgl_penahanan}}
			</td>
			<td>

			</td>
		</tr>
		@endforeach
		</tbody>
		</table>
	</td>
</tr>
<tr>
	<td>
		<p>
			Menimbang :
		</p>
	</td>
	<td>
		<ol type='a'>
			<li>Bahwa Penuntut Umum berpendapat, dari hasil penyidikan dapat dilakukan penuntutan dengan dakwaan telah melakukan tindak pidana sebagaimana diuraikan dan diancam dengan pidana dalam pasal {{$case->pasal}}</li>
		<li>Bahwa pemeriksaan selanjutnya adalah masuk wewenang Pengadilan Negeri / Ekonomi *) ...................................</li>
		</ol>
	</td>
</tr>
<tr>
	<td>
		<p>
			Mengingat :
		</p>
	</td>
	<td>
		<p>
			Pasal 137 jis Pasal 143, pasal 152 KUHAP
		</p>
	</td>
</tr>
<tr>
	<td>
		<p>
			Menetapkan :
		</p>
	</td>
	<td>
		<p>
			Melimpahkan perkara terdakwa……………….. ke Pengadilan Negeri / Ekonomi / HAM *)……………….. dengan acara pemeriksaan biasa dan mohon segera mengadili perkara tersebut atas dakwaan sebagaimana dimaksud dalam surat dakwaan terlampir.
		</p>
	</td>
</tr>
<tr>
	<td>
		<p>
			Meminta :
		</p>
	</td>
	<td>
		<ol>
			<li>Agar Ketua Pengadilan Negeri / Ekonomi / HAM di *) ........................ menetapkan hari persidangan untuk mengadili perkara tersebut dan menetapkan pemanggilan terdakwa serta saksi‑saksi.</li>
		<li>Mengeluarkan penetapkan untuk tetap menahan terdakwa………………….. di …………………………</li>
		</ol>
	</td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
	<td style='width:400px'>
		
	</td>
	<td>
		<p>
			Dikeluarkan di    : Jember
			<br>
			Pada tanggal      : {{strftime("%e %B %Y")}}
		</p>
		<hr>
		<p style="text-align:center;">
			<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
		</p>
		<p>
			<br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p><p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
	</td>
</tr>
<tr>
	<td>
		<p>
			<u><strong>TEMBUSAN:</strong></u>
		</p>
		<ol>
			<li>Penyidik</li>
			<li>Terdakwa/Kuasa/Penasehat Hukum</li>
			<li>Kepala Rutan kalau ditahan*)</li>
			<li>Saksi Korban/keluarga</li>
			<li>Arsip.</li>
		</ol>
	</td>
	<td>
	</td>
</tr>
</tbody>
</table>