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
		<strong>P-16</strong>
	</td>
</tr>
</tbody>
</table>
<p style="text-align: center;">
	<strong><br>
	</strong>
</p>
<p style="text-align: center;">
	<strong>SURAT PERINTAH</strong><b><br>
	<strong>PENUNJUKAN JAKSA PENUNTUT UMUM</strong><br>
	<strong>UNTUK MENGIKUTI PERKEMBANGAN</strong><br>
	<strong><u data-redactor-tag="u">PENYIDIKAN PERKARA TINDAK PIDANA</u><br>
	</strong></b>
	<strong>Nomor: Print - ... /0.5.12/</strong>
</p>
<p style="text-align: center;">
	<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
</p>
<p style="text-align: center;">
	<strong><br>
	</strong>
</p>
<table>
<tbody>
<tr>
	<td width="100px">
		<p>
			Dasar
		</p>
	</td>
	<td width="20px">
		<p>
			:
		</p>
	</td>
	<td>
		<ol>
			<li>Undang-Undang No. 8 Tahun 1981 tentang Hukum Acara Pidana (KUHAP) Pasal 8 ayat (3) a, Pasal 14 a, b, i, Pasal 109 dan pasal 138 KUHAP</li>
			<li>Undang-Undang Nomor: 16 Tahun 2004 tentang Kejaksaan Republik Indonesia.</li>
			<li>Surat Pemberitahuan dimulainya Penyidikan terhadap tersangka:</li>
		</ol>
		@foreach($case->suspects as $suspect)
		<table style="margin-left: 20px">
		<tbody>
		<tr>
			<td width="150px">
					Nama Lengkap
			</td>
			<td width="20px">
					:
			</td>
			<td>
					{{$suspect->name}}
			</td>
		</tr>
		<tr>
			<td>
					Tempat Lahir
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->pob?$suspect->pob->nama:''}}
			</td>
		</tr>
		<tr>
			<td>
					Umur/Tanggal Lahir
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->age}} tahun/{{$suspect->dob?$suspect->dob:'-'}}
			</td>
		</tr>
		<tr>
			<td>
					Kebangsaan/Kewarganegaraan
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->nationality}}
			</td>
		</tr>
		<tr>
			<td>
					Tempat Tinggal
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->address}}
			</td>
		</tr>
		<tr>
			<td>
					Agama
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->religion}}
			</td>
		</tr>
		<tr>
			<td>
					Pekerjaan
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->job}}
			</td>
		</tr>
		<tr>
			<td>
					Pendidikan
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->education}}
			</td>
		</tr>
		</tbody>
		</table>
		@endforeach
		<p>
			<br>
			Diduga melakukan tindak pidana sebagaimana diatur dalam {{$case->pasal}} yang diterima di Kejaksaan Negeri Jember pada {{$case->spdp_date}} dari penyidik {{$case->penyidik->name}}<br>
			<br>
		</p>
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
			<li>Bahwa dengan diterimanya Pemberitahuan Dimulainya Penyidikan, dipandang perlu untuk menugaskan seorang/beberapa orang Jaksa Penuntut Umum untuk mengikuti perkembangan penyidikan dan meniliti hasil penyidikan<strong> </strong>perkara tersebut sesuai dengan peraturan perundang-undangan dan ketentuan administrasi perkara tindak pidana.</li>
			<li>Bahwa sebagai pelaksanaannya perlu dikeluarkan Surat perintah Kepala Kejaksaan Negeri Jember</li>
		</ol>
		<p style="margin-left: 150px">
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
	<td width="20px">
		<p>
			:
		</p>
	</td>
	<td>
		<table>
		<tbody>
		<tr>
			<td width="20px">
					1.
			</td>
			<td width="100px">
					Nama
			</td>
			<td width="10px">
					:
			</td>
			<td>
				{{$case->jaksa->name}}
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
				{{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}
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
				{{$case->jaksa->jabatan->name}}
			</td>
		</tr>
		</tbody>
		</table>
		<br>
	</td>
</tr>
<tr>
	<td>
			Untuk
	</td>
	<td>
			:
	</td>
	<td>
		<ol>
			<li>Mengikuti perkembangan penyidikan.</li>
			<li>Melakukan penelitian hasil penyidikan atas nama tersangkat tersebut.</li>
			<li>Melakukan penelitian SP-3 dari penyidik.</li>
		</ol>
	</td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
	<td width="50%">
	</td>
	<td>
		<p>
			Dikeluarkan di    : Jember
			<br>
			Pada tanggal      : {{date('d-m-Y')}}
		</p>
		<hr>
		<p style="text-align:center;">
			<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong><br>
		</p>
		<p>
			<br/><br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p><p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
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
<footer></footer>
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
		<strong>P-16</strong>
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
				Tata Usaha Kejaksaan Negeri Jember
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
			Pada tanggal : {{date('d-m-Y')}}
		</p>
		<p style="text-align: center;">
			<strong data-redactor-tag="strong">
			KEPALA KEJAKSAAN NEGERI JEMBER
			</strong>
		</p>
		<p>
			<br/><br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p><p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
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
