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
<p style="text-align: center;">
	<b>BERITA ACARA</b>
</p>
<p style="text-align: center;">
	<b>PELAKSANAAN PUTUSAN PENGADILAN</b>
</p>
<p>
	
	Pada hari ini {{strftime("%A")}} tanggal {{strftime("%e %B %Y")}} saya:
</p>
<p>
	<strong>Nama :</strong> {{$case->jaksa->name}}
</p>
<p>
	<strong>Pangkat / NIP :</strong> {{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}
</p>
<p>
	<strong>Jabatan :</strong> {{$case->jaksa->jabatan->name}}
</p>
<p>
	(selaku Penuntut Umum)
</p>
<p>
	berdasarkan Surat Perintah Kepala Kejaksaan : ....................tanggal ......................... No............................telah melaksanakan Putusan Pengadilan Negeri/Pengadilan Tinggi/MA *) ...............................tanggal.............................No.......................................dengan amar putusan .........................................dalam perkara atas nama terdakwa/terpidana *) ........................ dengan cara memasukkan ke Rutan/Lembaga, Pemasyarakatan *) .............................................
</p>
<p>
	untuk menjalani tahanan/pidana penjara/kurungan selama *) .....................................................
</p>
<p>
	atau membebaskan/mengeluarkan terdakwa/terpidana dari tahanan *)
</p>
<p>
	-------Demikian Berita Acara Pelaksanaan Putusan Pengadilan ini dibuat dengan sebenarnya atas kekuatan sumpah jabatan, ditutup dan ditanda tangani pada hari dan tanggal tersebut dalam Berita Acara ini.
</p>
<table>
<tbody>
<tr align='center'>
	<td>
		<p>
			Kepala Rutan
		</p>
		<br/><br/>
		<p>
			Kepala Lembaga Pemasyarakatan
		</p>
		<p>
			(<u> </u>)
		</p>
	</td>
	<td>
		<p>
			Jaksa Penuntut Umum,
		</p>
		<br/><br/>
		<p>
			<strong>({{$case->jaksa->name}})</strong>
		</p>
		<p>
			{{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}
		</p>
	</td>
</tr>
<tr align='center'>
	<td colspan='2'>
		<p>
			Terdakwa/Terpidana
		</p>
				<br/><br/>

		<p>
			<strong>({{$suspect->name}})</strong>
		</p>
	</td>
	</tr>
</tbody>
</table>
<footer>
<p>
	<strong><u><strong>TEMBUSAN:</strong></u></strong>
</p>
<p>
	1.Kajari
</p>
<p>
	2.Ketua Pengadilan Negeri
</p>
<p>
	3.Penyidik Polri
</p>
<p>
	4.Arsip
</p>
</footer>
@endforeach