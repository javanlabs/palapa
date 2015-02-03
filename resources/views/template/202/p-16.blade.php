<table>
<tbody>
<tr>
	<td style="text-align: center;" width="300px">
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
	<?php
	$category = '';
	switch($case->category){
		case 'kamtibum':
		$category = 'Ep.1';
		break;
		case 'oharda':
		$category = 'Epp.1';
		break;
		case 'tpul':
		$category = 'Euh.1';
		break;
	}
	?>
	<strong>Nomor: Print - /0.5.12/{{$category}}/ /2015</strong>
</p>
<p style="text-align: center;">
	<br/><strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
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
		<table>
		<tbody>
		@foreach($case->suspects as $suspect)
		<tr>
			<td width="150px"  style="padding-left: 27px">
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
			<td width="150px"  style="padding-left: 27px">
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
			<td width="150px"  style="padding-left: 27px">
					Umur/Tanggal Lahir
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->age}} tahun/{{$suspect->dob?$suspect->dob_for_human:'-'}}
			</td>
		</tr>
		<tr>
			<td width="150px"  style="padding-left: 27px">
					Jenis Kelamin
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->sex}}
			</td>
		</tr>
		<tr>
			<td width="150px"  style="padding-left: 27px">
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
			<td width="150px"  style="padding-left: 27px">
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
			<td width="150px"  style="padding-left: 27px">
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
			<td width="150px"  style="padding-left: 27px">
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
			<td width="150px"  style="padding-left: 27px">
					Pendidikan
			</td>
			<td>
					:
			</td>
			<td>
					{{$suspect->education}}
			</td>
		</tr>
		<tr>
			<td colspan='3'></td>
		</tr>
		@endforeach
		<tr>
			<td colspan='3'>
				<br/>
				<p>
				Diduga melakukan tindak pidana sebagaimana diatur dalam {{$case->pasal}} yang diterima di Kejaksaan Negeri Jember pada tanggal {{$case->getChecklistDate(1)}} dari penyidik: {{$case->penyidik->name}}
				</p>
			</td>
		</tr>
		</tbody>
		</table>

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
				{{$case->jaksa_name}}
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
				{{$case->jaksa_pangkat}}/{{$case->jaksa_nip}}
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
				Jaksa Penuntut Umum
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
		<hr/>
		<br/>
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
<h1 style="text-align: center;">KEJAKSAAN NEGERI JEMBER</h1>
<HR/>
<table>
<tbody>
</tbody>
</table>
<p style="text-align: center;">
	<strong>SURAT PERINTAH</strong><b><br>
	<strong><U>PENUNJUKAN PETUGAS ADMINISTRASI</U><br>
	 Nomor: Print - /0.5.12/{{$category}}/ /2015
	</strong></b>
</p>
<p style="text-align: center;">
	<br/><strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
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
			<li>Peraturan Jaksa Agung Republik Indonesia Nomor: PERJA-036/A/JA/06/2011 tanggal 29 September 2011 Tentang Standar Operasional Prosedur (SOP) Penangangan Perkara Tindak Pidana Umum.</li>
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
			<li>Dengan diterbitkannya Surat Perintah Penunjukan Jaksa Penuntut Umum Untuk mengikuti Perkembangan Penyidikan Perkara Tindak Pidana Kepala Kejaksaan Negeri Jember Nomor: Print- /0.5.12/{{$category}}/ /2015 Tanggal {{$case->getChecklistDate(1)}}</li>
			<li>Dalam rangka melaksanakan fungsi administrasi perkara tindak pidana umum, dipandang perlu menunuk Pegawai Tata Usaha Kejaksaan</li>
			<li>Sebagai perwujudannya perlu menerbitkan Surat Perintah</li>
		</ol>
		<p style="text-align: center">
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
					1.
			</td>
			<td width="100px">
					Nama
			</td>
			<td width="10px">
					:
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
				Tata Usaha Kejaksaan Negeri Jember <br/>
			</td>
		</tr>
		</tbody>
		</table>
		<br/>
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
