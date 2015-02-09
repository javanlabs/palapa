@foreach($case->suspects as $suspect)
<table>
<tbody>
<tr>
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
			BA-15
		</strong>
	</td>
</tr>
</tbody>
</table>

<p style="text-align: center;">
	<b>BERITA ACARA</b>
</p>
<p style="text-align: center;">
	<b>PENERIMAAN DAN PENELITIAN TERSANGKA</b>
</p>
<p>
		

	 Pada hari ini {{strftime("%A")}} tanggal {{strftime("%e %B %Y")}} berdasarkan pasal 141, 8 (3) dan 13 8 (penjelasan) KUHAP saya:
</p>
<table>
<tr><td width="200px">
	Nama </td><td width="10px">:</td><td>{{$case->jaksa->name}}</td>
</td></tr>
<tr><td>
	Pangkat </td><td width="10px">:</td><td>{{$case->jaksa->pangkat->name}}</td>
</td></tr>
<tr><td>
	NIP </td><td width="10px">:</td><td>{{$case->jaksa->nip}}</td>
</td></tr>
</table>

<table>
<tr><td width="200px">
	Nama </td><td width="10px">:</td><td>{{$suspect->name}}</td>
</td></tr>
<tr><td>
	Tempat lahir </td><td>:</td><td>{{$suspect->pob?$suspect->pob->nama:''}}</td>
</td></tr>
<tr><td>
	Umur/tanggal lahir </td><td>:</td><td>{{$suspect->age}} tahun/{{$suspect->dob}}</td>
</td></tr>
<tr><td>
	Jenis kelamin </td><td>:</td><td>{{$suspect->sex}}</td>
</td></tr>
<tr><td>
	Kebangsaan /Kewarganegaraan </td><td>:</td><td>{{$suspect->nationality}}</td>
</td></tr>
<tr><td>
	Tempat tinggal </td><td>:</td><td>{{$suspect->address}} {{$suspect->city?$suspect->city->nama:''}}</td>
</td></tr>
<tr><td>
	Agama </td><td>:</td><td>{{$suspect->religion}}</td>
</td></tr>
<tr><td>
	Pekerjaan </td><td>:</td><td>{{$suspect->job}}</td>
</td></tr>
<tr><td>
	Pendidikan </td><td>:</td><td>{{$suspect->education}}</td>
</td></tr>
<tr><td>
	Ditahan Sejak </td><td>:</td><td></td>
</td></tr>
<tr><td>
	Register Tahanan. Nomor </td><td>:</td><td></td>
</td></tr>
<tr><td>
	Register Perkara Nomor </td><td>:</td><td></td>
</td></tr>
</table>


<p>
	setelah menanyakan kebenaran identitas tersebut diatas, saya bertanya kepada tersangka dan tersangka menjawab sebagai berikut
</p>
<p>
	‑ Apa sebab Saudara dihadapkan di Kejaksaan ? Jawab:
</p>
<p>
	‑ Apakah untuk perkara ini Saudara ditahan ? Jawab:
</p>
<p>
	‑ Kalau ditahan sejak kapan ? Jawab :
</p>
<p>
	‑ Benarkah sangkaan terhadap Saudara seperti
</p>
<p>
	 tersebut dalam berkas perkara ini ? Jawab:
</p>
<p>
	‑ Apakah Saudara pernah dihukum ? Jawab:
</p>
<p>
	‑ Apakah ada hal‑hal lain yang akan Saudara jelaskan ? Jawab : ..................
</p>
<p>
	selanjutnya tersangka menerangkan sesuai/tidak sesuai *) dengan keterangan tersebut dalam Berita Acara yang dibuat oleh Penyidik di …………………….pada tanggal ……………. dengan alasan *) .................................................................................
</p>
<p>
	-------Demikianlah Berita Acara ini dibuat dengan sebenarnya atas kekuatan sumpah jabatan. Kemudian dibacakan dan dijelaskan kepada tersangka/terdakwa dan ia menyetujui keterangan tersebut dan untuk memperkuatnya tersangka/terdakwa membubuhkan tanda tangannya.
</p>
<p>
	-------Berita Acara Ini ditutup dan ditanda tangani pada hari dan tanggal tersebut diatas.­--------
</p>
<table>
<tbody>
<tr align='center'>
	<td>
		<p>
			Tersangka/Terdakwa *)
		</p>		
				<br/><br/>

		<p>
			<strong>({{$suspect->name}})</strong>
		</p>
	</td>
	<td>
		<p>
			Jaksa Penyidik/Penuntut Umum
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
</tbody>
</table>
<footer></footer>
@endforeach