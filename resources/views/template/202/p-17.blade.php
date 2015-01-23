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
		<strong>P‑17</strong>
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
			<?php
			$suspects = array();
			foreach($case->suspects as $row){
				$suspects[] = $row->name;
			}
		?>
			Perihal : Permintaan Perkembangan Hasil Penyidikan atas nama {{implode(', ', $suspects)}} yang disangka melanggar pasal {{$case->pasal}}
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
	 Sehubungan dengan Surat Pemberitahuan dimulainya Penyidikan atas nama tersangka {{implode(', ', $suspects)}} Nomor : {{$case->spdp_number?$case->spdp_number:'__________'}}. Tanggal {{$case->spdp_date?$case->spdp_date:'____________'}} yang kami terima pada tanggal {{$case->spdp_date_received?$case->spdp_date_received:'____________'}} hingga saat ini kami belum menerima hasil penyidikan perkara, tersebut.
</p>
<p>
	 Mengingat Surat Pemberitahuan dimulainya Penyidikan sudah kami terima cukup lama, dengan ini kami minta perkembangan penyidikan perkara tersebut.
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
			<li>Yth. Ketua Pengadilan Negeri Jember;</li>
			<li>Yth. Penyidik {{$case->penyidik->name}}</li>
			<li>Arsip.</li>
		</ol>
	</td>
	<td>
	</td>
</tr>
</tbody>
</table>