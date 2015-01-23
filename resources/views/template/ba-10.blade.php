@foreach($case->suspects as $suspect)
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
		<strong>
			BA-10
		</strong>
	</td>
</tr>
</tbody>
</table>

<p style="text-align: center;">
	<strong>BERITA ACARA</strong>
</p>
<p style="text-align: center;">
	<strong>PELAKSANAAN PERINTAH PENAHANAN</strong>
</p>
<p style="text-align: center;">
	<strong>PENAHANAN LANJUTAN *)</strong>
</p>
<p>
	<?php $days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];?>
	Pada hari ini {{$days[date('w')]}} tanggal {{date('d-m-Y')}} saya Jaksa Penyidik/Penuntut Umum *) dalam Perkara tersangka/terdakwa :
</p>
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
	Register Tahanan. Nomor </td><td>:</td><td></td>
</td></tr>
<tr><td>
	Register Perkara Nomor </td><td>:</td><td></td>
</td></tr>
</table>
<p>
	berdasarkan Surat Perintah Kepala Kejaksaan …………………Nomor ……………………… tanggal………………………….untuk melakukan Penahanan/penahanan lanjutan *) terhadap tersangka/terdakwa *) yang disangka/didakwa *) melanggar pasal…………….terhitung mulai tanggal …………..di Rumah Tahanan Negara / Rumah / Kota *) selama …………… Penahanan/penahanan lanjutan *) tersebut dilakukan, . karena tersangka/terdakwa *) dikhawatirkan akan melarikan diri, merusak atau menghilangkan barang bukti dan atau mengulangi tindak pidana *).
</p>
<p>
	-------------------Demikian Berita Acara ini dibuat dengan sebenar‑benarnya atas kekuatan sumpah jabatan dan untuk memperkuatnya tersangka/ terdakwa membubuhkan tanda tangannya
</p>
<p>
	------------Berita Acara ini ditutup dan ditanda tangani pada hari dan tanggal tersebut diatas ---
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
<tr align='center'>
	<td colspan='2'>
		<p>
	Kepala Rutan *)
</p>
<br/><br/>
<p>
	(<u> </u>)
</p>
	</td>
	</tr>
</tbody>
</table>

<footer></footer>
@endforeach