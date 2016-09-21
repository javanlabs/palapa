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
			P‑17
		</strong>
	</td>
</tr>
</tbody>
</table>
<p>
	<br>
</p>
		<table>
			<tr>
				<td width="100px">Nomor</td>
				<td width="15px">:</td>
				<td width="250px">B- /0.5.12/Ep.1/I/{{date('Y')}}</td>
				<td width="90px" rowspan='4'></td>
				<td>Jember, {{strftime("%e %B %Y")}}</td>
			</tr>
			<tr>
				<td>Sifat</td>
				<td>:</td>
				<td>Biasa</td>
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
				<td>Lampiran</td>
				<td>:</td>
				<td></td>
			</tr>
			<tr>
				<td>Perihal</td>
				<td>:</td>
				<td style="text-align: justify">
					<?php
			$suspects = array();
			foreach($case->suspects as $row){
				$suspects[] = $row->name;
			}
		?>
			Permintaan Perkembangan Hasil Penyidikan atas nama {{implode(', ', $suspects)}} yang disangka melanggar pasal {{$case->pasal}}
					<HR/></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td colspan='3'><br/><br/><br/>
<p class='indent'>
	 Sehubungan dengan Surat Pemberitahuan dimulainya Penyidikan atas nama tersangka {{implode(', ', $suspects)}} Nomor : {{$case->spdp_number?$case->spdp_number:'__________'}}. Tanggal {{$case->spdp_date_for_human?$case->spdp_date_for_human:'____________'}} yang kami terima pada tanggal {{$case->getChecklistDate(1)}} hingga saat ini kami belum menerima hasil penyidikan perkara, tersebut.
</p>
<p class='indent'>
	 Mengingat Surat Pemberitahuan dimulainya Penyidikan sudah kami terima cukup lama, dengan ini kami minta perkembangan penyidikan perkara tersebut.
</p></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td colspan='3'><br/>
<p class='indent'>Demikian untuk dimaklumi.</p>
				</td>
			</tr>

		</table>

<table>
<tbody>
<tr>
	<td style='width:400px'>

	</td>
	<td>
		<br/><br/><br/>
		<p style="text-align:center;">
			<br/><strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
		</p>
		<p>
			<br/><br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p><p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
	</td>
</tr>
<tr>
	<td>
		<br/><br/><br/>
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
