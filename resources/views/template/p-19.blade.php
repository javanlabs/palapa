<table>
<tbody>
<tr>
	<td style="text-align: center;" width="300px">
		<strong><u data-redactor-tag="u">KEJAKSAAN NEGERI JEMBER</u><br>
		"UNTUK KEADILAN"
		</strong>
		<br/><br/>
	</td>
	<td width="300px">
	</td>
	<td style="text-align: right;">
		<strong>
		P-19
		</strong>
	</td>
</tr>
</tbody>
</table>
<p>
	<br>
</p>
<table>
<tbody>
<tr>
	<tr>
				<td width="100px">Nomor</td>
				<td width="15px">:</td>
				<td width="250px">B- /0.5.12/Ep.1/I/{{date('Y')}}</td>
				<td width="90px" rowspan='4'></td>
				<td>Jember, {{strftime("%e %B %Y")}}</td>
			</tr>
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
	<td rowspan='3'><p>
			KEPADA YTH.
		</p>

		<p>
			KEPALA KEPOLISIAN SEKTOR KALIWATES<BR/>

			DI - <BR/>

			 <CENTER><u>JEMBER</u></CENTER>
		</p></td>
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
<tr>
				<td></td>
				<td></td>
				<td colspan='3'><br/><br/><br/>
<p  class='indent'>
	    Sehubungan dengan surat kami nomor B- /0.5.12/…1/…/201… tanggal ……. 201… sesuai dengan pasal 110 ayat (2), (3) dan 138 ayat (2) KUHAP, bersama ini kami kembalikan Berkas Perkara Pidana atas nama tersangka {{$case->suspectNames()}}, Berkas Perkara Nomor: {{$case->spdp_number}} tanggal {{$case['spdp_date_for_human']}} yang kami terima tanggal {{$case->getChecklistDate(1)}} untuk saudara lengkapi dalam waktu 14 hari seterimanya berkas perkara ini, dengan petunjuk-petunjuk sebagai berikut:
	<ol>
		<li></li>
	</ol>
</p>
<br/>
<p class='indent'>
			Demikian untuk dilaksanakan.
		</p>
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

<table>
<tbody>
<tr>
	<td style='width:400px'>

	</td>
	<td>
		<br/>
		<table>
			<tr>
				<td width='140px' style='padding-left: 20px'>Dikeluarkan di</td>
				<td width='10px'>:</td>
				<td>Jember</td>
			</tr>
			<tr>
				<td style='padding-left: 20px'>Pada tanggal</td>
				<td>:</td>
				<td>{{$case->getChecklistDate(1)}}</td>
			</tr>
		</table>
		<hr>
		<p style="text-align:center;">
			<br/><strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
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
