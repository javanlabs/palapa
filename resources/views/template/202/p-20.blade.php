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
			P‑20
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
			Nomor : …………………………
		</p>
		<p>
			Sifat : …………………………
		</p>
		<p>
			Lampiran : …………………………
		</p>
		<p>
			Perihal : Pemberitahuan bahwa waktu Penyidikan Tambahan perkara atas nama {{$case->suspectNames()}} yang melanggar pasal {{$case->pasal}} sudah habis.
		</p>
	</td>
	<td>
		<p>
			KEPADA YTH.
		</p>
		<p>
			……………………………………….
		</p>
		<p>
			……………………………………….
		</p>
		<p>
			Di
		</p>
		<p>
			 <u>…………………………</u>
		</p>
	</td>
</tr>
</tbody>
</table>
<p>
	 Sehubungan dengan pengembalian berkas perkara pidana atas nama tersangka {{$case->suspectNames()}} Nomor ………………… tanggal……………….. dari kami kepada Saudara, dan telah Saudara terima pada tanggal... guna dilakukan penyidikan tambahan untuk waktu selama 14 hari sesuai ketentuan pasal 138 ayat (2) KUHAP.
</p>
<p>
	 Mengingat batas waktu 14 hari untuk melakukan penyidikan tambahan tersebut telah berakhir, bersama ini diminta agar Saudara menyerahkan kembali berkas perkara tersebut kepada kami setelah dilakukan pemeriksaan tambahan sesuai dengan petunjuk kami sebagaimana dimaksud dalam pasal I 10 ayat (3) KUHAP.
</p>
<table>
<tbody>
<tr>
	<td style='width:400px'>
		<p>
			Demikian untuk dimaklumi.
		</p>
	</td>
	<td>
		<p>
			Dikeluarkan di : Jember
		</p>
		<p>
			Pada tanggal : {{strftime("%e %B %Y")}}
		</p>
		<p style="text-align: center;">
			<strong data-redactor-tag="strong">
			KEPALA KEJAKSAAN NEGERI JEMBER
			</strong>
		</p>
		<p>
			<br>
		</p>
		<p style="text-align:center;">
				{{$setting['kajari_name']}}
		</p>
		<hr>
		<p style="text-align: center;">
			    {{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}
		</p>
	</td>
</tr>
<tr>
	<td>
		<p>
			Tembusan:
		</p>
		<ol>
			<li>Yth. Kepala Kejaksaan Tinggi Jawa Timur;</li>
			<li>Yth. Kepala {{$case->penyidik->name}}</li>
			<li>Arsip.</li>
		</ol>
	</td>
	<td>
	</td>
</tr>
</tbody>
</table>