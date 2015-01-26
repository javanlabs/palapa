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
			P‑18
		</strong>
	</td>
</tr>
</tbody>
</table>
<?php
			$suspects = array();
			foreach($case->suspects as $row){
				$suspects[] = $row->name;
			}

			$pasals = $case->pasal;
		?>
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
			Perihal : Hasil Penyidikan atas nama {{implode(', ', $suspects)}} yang disangka melanggar pasal {{$pasals}} belum lengkap
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
	 Sehubungan penyerahan berkas perkara pidana atas nama tersangka {{implode(', ', $suspects)}} Nomor : {{$case->spdp_number?$case->spdp_number:'__________'}}. Tanggal {{$case->spdp_date?$case->spdp_date:'____________'}} yang kami terima pada tanggal {{$case->spdp_date_received?$case->spdp_date_received:'____________'}} setelah kami lakukan penelitian sesuai dengan pasal 110 dan 138 (1) KUHAP, ternyata hasil penyidikannya belum lengkap.
</p>
<p>
	 Pengembalian berkas beserta petunjuknya menyusul.
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