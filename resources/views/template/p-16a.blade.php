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
		<strong>P-16A</strong>
	</td>
</tr>
</tbody>
</table>
<p style="text-align: center;">
	<strong>SURAT PERINTAH PENUNJUKAN</strong><br>
	<strong> JAKSA PENUNTUT UMUM UNTUK PENYELESAIAN</strong><br>
	<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PERKARA TINDAK PIDANA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong><br>
	</strong>
	<strong>Nomor: Print - ... /0.5.12/</strong>
</p>
<p style="text-align: center;">
	<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
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
			<li>Undang undang Republik Indonesia Nomor 8 Tahun 1981 tentang Kitab Undang Undang Hukum Acara Pidana (KUHAP) pasal 8 ayat (3), b, pasal 138, pasal 109, pasal 110 dan pasal 140 KUHAP.</li>
			<li>Undang Undang Republik Indonesia Nomor 5 tahun 1991 tentang Kejaksaan Republik Indonesia.</li>
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
					{{$suspect->age}}/{{$suspect->dob?$suspect->dob:'-'}}
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
			Diduga melakukan tindak pidana sebagaimana diatur dalam {{$case->pasal}} dari penyidik {{$case->penyidik->name}}<br>			
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
			<li>Bahwa dengan diterimanya berkas perkara, tersangka dan barang bukti, dipandang perlu untuk menugaskan seorang/beberapa orang Jaksa Penuntut Umum untuk melakukan penuntutan/penyelesaian perkara tindak pidana tersebut sesuai dengan peraturan perundang¬ undangan dan ketentuan administrasi perkara, tindak pidana.</li>
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
			<li>Melaksanakan penahanan / pengalihan jenis penahanan / penangguhan penahanan / pengeluaran dari tahanan / pencabutan penangguhan penahanan dan meneliti benda sitaan, / barang bukti</li>
			<li>Melakukan pemeriksaan tambahan terhadap perkara perkara tertentu.</li>
			<li>Melaksanakan penghentian penuntutan.</li>
			<li>Melakukan penuntutan perkara ke pengadilan.</li>
			<li>Melaksanakan penetapan Hakim/Ketua Pengadilan Negeri.</li>
			<li>Melakukan perlawanan terhadap penetapan Hakim/Ketua Pengadilan Negeri.</li>
			<li>Melakukan upaya hukum.</li>
			<li>Memberi pertimbangan atas permohonan grasi terpidana.</li>
			<li>Memberikan jawaban/tangkisan atas permohonan Peninjauan kembali putusan pengadilan yang sudah memperoleh kekuatan hukum tetap.</li>
			<li>Menandatangani berita acara perneriksaan PK</li>
			<li>Melaporkan setiap pelaksanaan tindakan hukum berdasarkan perintah penugasan ini dengan berita acara kepada pejabat pengendali penanganan perkara pidana yang bersangkutan.</li>			
		</ol>
	</td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
	<td width="60%" style='vertical-align:bottom'>
		
			<strong><u>TEMBUSAN:</u></strong>
		<br/>
		<ol>
			<li>Yth. Ketua Pengadilan Negeri Jember;</li>
			<li>Yth. Penyidik {{$case->penyidik->name}}</li>
			<li>Arsip.</li>
		</ol>
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
</tbody>
</table>
<footer></footer>