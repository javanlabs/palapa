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
		<strong>P-16a</strong>
	</td>
</tr>
</tbody>
</table>
<p style="text-align: center;">
	<strong>SURAT PERINTAH</strong><b><br>
	<strong>PENUNJUKAN PETUGAS ADMINISTRASI<br>
	 Nomor: PRINT - /0.5.12/
	</strong></b>
</p>
<p style="text-align: center;">
	<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
</p>
<table>
<tbody>
<tr>
	<td width="100px">
Dasar
	</td>
	<td width="20px">
			:
	</td>
	<td>
		<ol>
			<li>Undang-Undang No. 16 Tahun 2004 tentang Kejaksaan Republik Indonesia</li>
			<li>Keputusan Presiden Republik Indonesia No. 86 Tahun 1999 tentang Susunan Organisasi Tata Kerja Kejaksaan Republik Indonesia</li>
			<li>Keputusan Jaksa Agung Republik Indonesia Nomor: KEP-115/JA/10/1999 Tentang Susuan Organisasi dan tata Kerja Kejaksaan Republik Indonesia beserta perubahannya.</li>
			<li>Peraturan Jaksa Agung Republik Indonesia Nomor: PERJA-036/A/JA/10/2011 tanggal 29 Oktober 2010 Tentang Standar Operasional Prosedur (SOP) Penangangan Perkara Tindak Pidana Umum.</li>
		</ol>
	</td>
</tr>
<tr>
	<td>
		<p>
			Pertimbangan
		</p>
	</td>
	<td>
		<p>
			:
		</p>
	</td>
	<td>
		<ol>
			<li>Dengan diterbitkannya Surat Perintah Penunjukan Jaksa Penuntut Umum Untuk mengikuti Perkembangan Penyidikan Perkara Tinda Pidana Kepala Kejaksaan Negeri Jember Nomor: </li>
			<li>Dalam rangka melaksanakan fungsi administrasi perkara tindak pidana umum, dipandang perlu menunuk Pegawai Tata Usaha Kejaksaan</li>
			<li>Sebagai perwujudannya perlu menerbitkan Surat Perintah</li>
		</ol>
		<p>
			<b>MEMERINTAHKAN:</b>
		</p>
	</td>
</tr>
<tr>
	<td>
		<p>
			Kepada
		</p>
	</td>
	<td>
		<p>
			:
		</p>
	</td>
	<td>
		<table>
		<tbody>
		<tr>
			<td width="20px">
				<p>
					1.
				</p>
			</td>
			<td width="100px">
				<p>
					Nama
				</p>
			</td>
			<td width="10px">
				<p>
					:
				</p>
			</td>
			<td>
				{{$case->staff->name}}
			</td>
		</tr>
		<tr>
			<td>
			</td>
			<td>
					Pangkat/NIP
			</td>
			<td>
					:
			</td>
			<td>
				{{$case->staff->pangkat->name}}/{{$case->staff->nip}}
			</td>
		</tr>
		<tr>
			<td>
			</td>
			<td>
					Jabatan
			</td>
			<td>
					:
			</td>
			<td>
				{{$case->staff->name}}
			</td>
		</tr>
		</tbody>
		</table>
	</td>
</tr>
<tr>
	<td>
		<p>
			Untuk
		</p>
	</td>
	<td>
		<p>
			:
		</p>
	</td>
	<td>
		<?php
			$suspects = array();
			foreach($case->suspects as $row){
				$suspects[] = $row->name;
			}
		?>
		<ol>
			<li>Membantu melaksanakan fungsi administrasi dalam perkara Tindak Pidana tersangka atas nama {{implode(', ', $suspects)}} diduga melakukan tindak pidana sebagaimana diatur dalam {{$case->pasal}}</li>
			<li>Melaksanakan Surat Perintah ini dengan penuh rasa tanggung jawab.</li>
			<li>Surat Perintah ini berlaku selama 60 hari.</li>
		</ol>
	</td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
	<td style:'width=60px'>
		<p>
			Kepada : Yang bersangkutan untuk dilaksanakan
		</p>
	</td>
	<td>
		<p>
			Dikeluarkan di : Jember
		</p>
		<p>
			Pada tanggal : {{$case->tgl_spdp}}
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