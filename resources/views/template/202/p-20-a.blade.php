<table>
<tbody>
<tr>
	<td style="text-align: center;" width="250px">
		<strong><u data-redactor-tag="u">KEJAKSAAN NEGERI JEMBER</u><br>
		"UNTUK KEADILAN"
		</strong>
		<br/><br/>
	</td>
	<td width="300px">
	</td>
	<td style="text-align: right;">
		<strong>
		
		</strong>
	</td>
</tr>
</tbody>
</table>

		<table>
			<tr>
				<td width="100px">Nomor</td>
				<td width="15px">:</td>
				<td width="250px">B- /0.5.12/Ep.1/I/2015</td>
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
			Pengembalian SPDP atas nama {{implode(', ', $suspects)}} yang disangka melanggar pasal {{$case->pasal}}.
					<HR/></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td colspan='3'><br/><br/><br/>
<p class='indent'>
	 Sehubungan dengan penyerahan berkas perkara pidana atas nama tersangka {{$case->suspectNames()}} Nomor ………………… tanggal……………… yang kami terima tanggal ....... kami beritahukan
	 kepada saudara bahwa terharap berkas perkara tersebut telah kami kirimkan surat P-18 dengan Nomor: B-148/O.5.12/Ep.1/08/2014 tertanggal ....... dan ditindak lanjuti dengan 
	 P-19 Nomor: B-148.a/O.5.12/Ep.1/08/2014 tertanggal ....... yang pada isinya memberitahuan bahwa berkas belum lengkap. Dalam jangka waktu 14 hari penyidik belum mengirimkan kembali berkas tersebu sehingga penuntut umum mengirimkan Pemberitahuan bahwa waktu penyidikan tambahan sudah hasib (P-20)
	 dengan nomor: B-18 NomorB-148/O.5.12/Ep.1/08/2014 tertanggal ....., sampai saat ini sudah 30 hari lebih berkas perkara belum kami terima, sehubungan dengan hal tersebut di atas guna 
	 memperoleh kepastian hukum dalam penanganan perkara atas nama {{implode(', ', $suspects)}}, bersama ini kami kembalikan SPDP berkara tersebut kepada saudara.
	
</p>
<br/></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td colspan='3'>
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
		<br/><br/><br/><br/>
		<p style="text-align:center;">
			<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
		</p>
		<p>
			<br/><br/><br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p><p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
	</td>
</tr>
<tr>
	<td>
		<br/><br/><br/><br/>
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