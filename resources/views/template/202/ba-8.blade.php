@foreach($case->suspects as $suspect)
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
		<strong>
			BA-8
		</strong>
	</td>
</tr>
</tbody>
</table>
<br/>
<p style="text-align: center;">
	<b>BERITA ACARA</b><br/>
	<b>PELAKSANAAN PUTUSAN PENGADILAN</b>
</p>
<p>
	
	Pada hari ini {{strftime("%A")}} tanggal {{strftime("%e %B %Y")}} saya:
</p>
<table>
<tr><td width='150px'>
	<strong>Nama</strong></td><td width='5px'>:</td><td>{{$case->jaksa->name}}
</td></tr>
<tr><td>
	<strong>Pangkat / NIP</strong></td><td width='5px'>:</td><td>{{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}
</td></tr>
<tr><td>
	<strong>Jabatan</strong></td><td width='5px'>:</td><td>{{$case->jaksa->jabatan->name}}
</td></tr>
</table>

<p>
	(selaku Penuntut Umum)
</p>
<p class='indent'>
	berdasarkan Surat Perintah Kepala Kejaksaan : ....................tanggal ......................... No............................telah melaksanakan Putusan Pengadilan Negeri/Pengadilan Tinggi/MA *) ...............................tanggal.............................No.......................................dengan amar putusan .........................................dalam perkara atas nama terdakwa {{$suspect->name}} dengan cara memasukkan ke Rutan/Lembaga, Pemasyarakatan *) ...........
	untuk menjalani tahanan/pidana penjara/kurungan selama *) .....................................................
	atau membebaskan/mengeluarkan terdakwa/terpidana dari tahanan *)
</p>
<p class='indent'>
	Demikian Berita Acara Pelaksanaan Putusan Pengadilan ini dibuat dengan sebenarnya atas kekuatan sumpah jabatan, ditutup dan ditanda tangani pada hari dan tanggal tersebut dalam Berita Acara ini.
</p>
<table>
<tbody>
<tr align='center'>
	<td>

			Tersangka

				<br/><br/><br/>


			<strong>({{$suspect->name}})</strong>

	</td>
	<td>

			Jaksa Penyidik/Penuntut Umum

		<br/><br/><br/>

			<strong>({{$case->jaksa->name}})</strong><br/>

			{{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}

	</td>
</tr>
<tr>
	<td colspan='2' style='text-align: center'>
		<br/>
	KEPALA RUTAN

<br/><br/><br/>
	</td>
	</tr>
</tbody>
</table>

<p>
	<strong><u><strong>TEMBUSAN:</strong></u></strong>
</p>
<ol>
<li>
	Kajari
</li>
<li>
	Ketua Pengadilan Negeri
</li>
<li>
	Penyidik Polri
</li>
<li>
	Arsip
</li>
</ol>
<footer></footer>
@endforeach