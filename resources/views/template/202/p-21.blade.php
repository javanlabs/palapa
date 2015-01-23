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
			P‑21
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
			Perihal : Pemberitahuan hasil penyidikan perkara pidana a.n. tersangka {{$case->suspectNames()}} sudah lengkap
		</p>
	</td>
	<td>
		<p>
			……………………………………….
		</p>
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
	 Sehubungan dengan penyerahan berkas perkara pidana atas nama tersangka {{$case->suspectNames()}} Nomor ……………………………….. tanggal……………………… yang kami terima tanggal…………………..setelah dilakukan penelitian ternyata hasil penyidikannya. sudah lengkap,
</p>
<p>
	 Sesuai dengan ketentuan pasal 8 ayat (3) b, pasal 138 ayat (1) dan pasal 139 KUHAP supaya Saudara menyerahkan tanggung jawab tersangka dan barang bukti kepada kami, guna menentukan apakah perkara tersebut sudah memenuhi persyaratan untuk dapat atau tidak dilimpahkan ke Pengadilan
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