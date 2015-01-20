<table>
<tbody>
<tr>
	<td width="250px">
		<strong><u data-redactor-tag="u">KEJAKSAAN NEGERI JEMBER</u><br>
		</strong>
	</td>
	<td style="text-align: right;">
		<strong>P-19</strong>
	</td>
</tr>
</tbody>
</table>
<p>
	<br>
</p>
<p>
	<span></span><br>
</p>
<table>
<tbody>
<tr>
	<td width="120px">
		Nomor
	</td>
	<td width="20px">
		:
	</td>
	<td width="220px">
	</td>
	<td rowspan="4">
		<p>
			Jember, {{date('d-m-Y')}}
		</p>
		<p>
			KEPADA YTH.
		</p>
		<p>
			KEPALA KEPOLISIAN {{$case->penyidik->name}}
		</p>
		<p>
			DI ...........
		</p>
	</td>
</tr>
<tr>
	<td>
		Sifat
	</td>
	<td>
		:
	</td>
	<td>
		Biasa
	</td>
</tr>
<tr>
	<td>
		Lampiran
	</td>
	<td>
		:
	</td>
	<td>
		-
	</td>
</tr>
<tr>
	<td>
		Sifat
	</td>
	<td>
		:
	</td>
	<td>
		Pengembalian perkara pidana atas nama {{$case->suspectNames()}} melanggar {{$case->pasal}}, untuk dilengkapi
	</td>
</tr>
</tbody>
</table>
<p>
	<br>
</p>
<p>
	<br>
</p>
<p style="text-align: justify;">
	    Sehubungan dengan surat kami nomor B- /0.5.12/…1/…/201… tanggal ……. 201… sesuai dengan pasal 110 ayat (2), (3) dan 138 ayat (2) KUHAP, bersama ini kami kembalikan Berkas Perkara Pidana atas nama tersangka {{$case->suspectNames()}}, Berkas Perkara Nomor: {{$case->spdp_number}} tanggal {{$case->tgl_spdp}} yang kami terima tanggal {{$case->tgl_spdp_received}} untuk saudara lengkapi dalam waktu 14 hari seterimanya berkas perkara ini, dengan petunjuk-petunjuk sebagai berikut:
	<ol>
		<li></li>
	</ol>
</p>
<p>
	<br>
</p>
<p>
	<br>
</p>
<table>
<tbody>
<tr>
	<td style='width:400px'>
		<p>
			Demikian untuk dilaksanakan.
		</p>
	</td>
	<td>
		<p>
			Dikeluarkan di : Jember
		</p>
		<p>
			Pada tanggal : {{date('d-m-Y')}}
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
