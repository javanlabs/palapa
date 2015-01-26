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
	<strong>SURAT PERINTAH PENAHANAN/</strong><b><br>
	<strong>PENGALIHAN JENIS PENAHANAN</strong><br>	
	<strong><u data-redactor-tag="u">(TINGKAT PENUNTUTAN)</u><br>
	</strong></b>
	<strong>Nomor: Print - /0.5.12/Ep.1/ /2015</strong>
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
			<li>Undang-Undang No. 8 Tahun 1981 tentang Hukum Acara Pidana Pasal 14c, 20 (2), 21, 22, 23, 25</li>
			<li>Undang-Undang Nomor: 16 Tahun 2004 tentang Kejaksaan Republik Indonesia.</li>
			<li>Undang-Undang No. 1 Tahun 1964 Tentang KUHP</li>
			<li>Berkas Perkara dari Penyidik Nomer BP/13/IX/2014/Polsek. Tgl. 23 September 2014 dalam perkara atas nama tersangka {{$case->suspectNames()}}, Nomor: SPP/16/IX/2014/Reskrim tanggal ..... 2015		
			<li>Saran dari Jaksa Penuntut Umum {{$case->jaksa->name}}, NIP. {{$case->jaksa->nip}} Pangkat {{$case->jaksa->pangkat->name}} pada Kejaksan Negeri Jember.</li>
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
			<li>
				<strong>Uraian singkat perkara:</strong><br/>
				Bahwa tersangka melakukan tindak pidana {{$case->kasus}} yang terjadi pada hari tanggal {{$case->crime_time}} bertempat di {{$case->crime_place}}.
			</li>
			<li>Melanggar pasal: {{$case->pasal}}</li>
			<li>Dari Penyidik, diperoleh bukti yang cukup, terdakwa diduga keras melakukan tinda pidana yang dapat dikenakan penahanan dan dikhawatirkan akan melarikan diri, merusak atau menghilangkan barang bukti, dan atau mengulangi tindak pidana.
			<li>Oleh karena itu dianggap perlu untuk mengeluarkan Surat Perintah.</li>
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
			<li>
				Menahan/Melanjutkan Penahanan/Pengalihan Jenis Penahanan terdakwa:
<table style="margin-left: 20px">
		<tbody>
		@foreach($case->suspects as $suspect)		
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
		<tr>
			<td colspan='3'></td>
		</tr>
		@endforeach
		<tr>
			<td colspan='3'>
				<br/>
				<p>
					Dengan Ketentuan Bahwa ia ditahan di <strong>RUTAN/RUMAH/KOTA</strong> JEMBER selama 20 hari terhitung mulai tanggal _____ sampai dengan tanggal _____
				</p>
			</td>
		</tr>
		</tbody>
		</table>
			</li>
			<li>Membaca Berita Acara Penahanan/Pengalihan Jenis Tahanan</li>			
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
			Pada tanggal      : {{strftime("%e %B %Y")}}
		</p>
		<hr>
		<p style="text-align:center;">
			<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
		</p>
		<p>
			<br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p><p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
	</td>
</tr>
<tr>
	<td>
		Kepada : yang bersangkutan <u>untuk dilaksanakan</u>
		<p>
			<u><strong>TEMBUSAN:</strong></u>
		</p>
		<ol>
			<li>Yth. Bapak Kejati Jatim.</li>
			<li>Yth. Ketua Pengadilan Negeri Jember.</li>
			<li>Yth. Keluarga Terdakwa</li>
			<li>Yth. Penyidik</li>
			<li>Yth. Bapak Kepala Rutan Jember.</li>
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
	 Nomor: Print - /0.5.12/Ep.1/ /2015
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
			<li>Dengan diterbitkannya Surat Perintah Penunjukan Jaksa Penuntut Umum Untuk mengikuti Perkembangan Penyidikan Perkara Tindak Pidana Kepala Kejaksaan Negeri Jember Nomor: Print- /0.5.12/Ep.1/ /2015 Tanggal </li>
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
		<p>
			Dikeluarkan di    : Jember
			<br>
			Pada tanggal      : {{strftime("%e %B %Y")}}
		</p>
		<hr>
		<p style="text-align:center;">
			<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
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
