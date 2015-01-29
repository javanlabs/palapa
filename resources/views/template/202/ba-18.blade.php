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
			BA-18
		</strong>
	</td>
</tr>
</tbody>
</table>

<p style="text-align: center;">
	<strong>BERITA ACARA PENERIMAAN DAN PENELITIAN</strong>
</p>
<p style="text-align: center;">
	<strong>BENDA SITAAN/BARANG BUKTI</strong>
</p>
<p>

	<?php $days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];?>

	 Pada hari ini {{$days[date('w')]}} tanggal {{strftime("%e %B %Y")}} bertempat di…………………………..., kami :
</p>
<table>
<tr>
	<td width="15px">1.</td>
	<td width="200px">
	Nama </td><td width="10px">:</td><td>{{$case->jaksa->name}}</td>
</td></tr>
<tr>
	<td></td>
	<td>
	Pangkat/NIP </td><td width="10px">:</td><td>{{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}</td>
</td></tr>
<tr>
<td></td>
	<td>
	Jabatan </td><td width="10px">:</td><td>{{$case->jaksa->jabatan->name}}</td>
</td></tr>
<tr>
	<td width="15px">2.</td>
	<td width="200px">
	Nama </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
<td></td>
	<td>
	Pangkat/NIP </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
<td></td>
	<td>
	Jabatan </td><td width="10px">:</td><td></td>
</td></tr>
</table>

<p>
	dengan disaksikan oleh
</p>
<table>
	<tr>
	<td width="15px">1.</td>
	<td width="200px">
	Nama </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
<td></td>
	<td>
	Pangkat/NIP </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
<td></td>
	<td>
	Jabatan </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
	<td width="15px">2.</td>
	<td width="200px">
	Nama </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
<td></td>
	<td>
	Pangkat/NIP </td><td width="10px">:</td><td></td>
</td></tr>
<tr>
<td></td>
	<td>
	Jabatan </td><td width="10px">:</td><td></td>
</td></tr>
</table>

<p>
	berdasarkan Surat Perintah Kepala Kejaksaan…………………….Nomor…………………… tanggal ……………………telah menerima dan melakukan penelitian terhadap Benda Sitaan/Barang Bukti dalam perkara tersangka/terdakwa/terpidana*) ………………………….. melanggar Pasal…………………………….berupa……………….dan hasil penelitian kami ternyata barang‑barang tersebut sesuai/tidak sesuai *) dengan tercantum didalam daftar benda sitaan/barang bukti.
</p>
<p>
	Kemudian barang‑barang tersebut dimasukkan/disimpan di…………….dan disegel dengan segel Kejaksaan dan dicatat pada Reg. Barang Bukti No. : …………………………………. --------Demikian Berita Acara dibuat dengan sebenarnya atas kekuatan sumpah jabatan kemudian ditutup dan ditanda tangani pada hari dan tanggal tersebut di atas.---------------------
</p>
<p>
	Yang melakukan penelitian
</p>
<table>
<tbody>
<tr align='center'>
	<td>
		<p>
			2.……………………………………….
		</p>
		<p>
			.
		</p>
		<p>
			(
			<u> </u>)
		</p>
	</td>
	<td>
		<p>
			1. Penuntut Umum
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
<tr>
	<td colspan="2">
		<p>
			Saksi-saksi
		</p>
	</td>
</tr>
<tr align='center'>
	<td>
		<p>
			1. ……………………………………….
		</p>
		<p>
			(
			<u> </u>)
		</p>
	</td>
	<td>
		<p>
			2.……………………………………….
		</p>
		<p>
			(
			<u> </u>)
		</p>
	</td>
</tr>
</tbody>
</table>
<p>
	Catatan
</p>
<p>
	*) Coret yang tidak perlu
</p>