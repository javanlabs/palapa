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
			P‑44
		</strong>
	</td>
</tr>
</tbody>
</table>
<table>
	<tr>
<td width='65%'>
	<strong>LAPORAN JAKSA PENUNTUT UMUM SEGERA SETELAH PUTUSAN PN</strong>
</td>
<td width='300px'>
	TANGGAL TUNTUTAN PIDANA
</td>
<td width='5px'>:</td>
<td>Januari 2015</td>
	</tr>
	<tr>
		<td>
	NAMA JAKSA PU : {{$case->jaksa->name}}
</td>
<td>
	TANGAL PUTUSAN
</td>

<td width='5px'>:</td>
<td>Januari 2015</td>
</tr>
</table>



<table class="table table-bordered">
<tbody>
<tr style='font-weight: bold'>
	<td rowspan="2">
		
			No.
		
	</td>
	<td rowspan="2">
		
			Reg. Perkara
		
	</td>
	<td rowspan="2">
		
			Nama Lengkap Terdakwa
		
	</td>
	<td rowspan="2">
		
			Pasal dakwaan
		
	</td>
	<td rowspan="2">
		
			Dakwaan Yang dapat dibuktikan
		
	</td>
	<td colspan="4">
		
			Tuntuan Jaksa Penuntut Umum
		
	</td>
	<td colspan="5">
		
			Putusan Hakim Pengadilan Negeri
		
	</td>
	<td rowspan="2">
		
			Sikap JPU /terdakwa
		
	</td>
	<td rowspan="2">
		
			KET
		
	</td>
</tr>
<tr style='font-weight: bold'>
	<td>
		
			Pidana Badan
		
	</td>
	<td>
		
			Denda
		
	</td>
	<td>
		
			Barang Bukti
		
	</td>
	<td>
		
			Biaya Perkara
		
	</td>
	<td>
		
			Dakwaan Yang Terbukti
		
	</td>
	<td>
		
			Pidanan Badan
		
	</td>
	<td>
		
			Denda
		
	</td>
	<td>
		
			Barang Bukti
		
	</td>
	<td>
		
			Biaya Perkara
		
	</td>
</tr>
<tr align='center' style='font-weight: bold'>
	<td  width='2%'>
		
			1
		
	</td>
	<td  width='5%'>
		
			2
		
	</td>
	<td  width='5%'>
		
			3
		
	</td>
	<td  width='5%'>
		
			4
		
	</td>
	<td  width='10%'>
		
			5
		
	</td>
	<td  width='10%'>
		
			6
		
	</td>
	<td  width='5%'>
		
			7
		
	</td>
	<td  width='10%'>
		
			8
		
	</td>
	<td  width='5%'>
		
			9
		
	</td>
	<td  width='5%'>
		
			10
		
	</td>
	<td  width='5%'>
		
			11
		
	</td>
	<td  width='5%'>
		
			12
		
	</td>
	<td  width='10%'>
		
			13
		
	</td>
	<td  width='5%'>
		
			14
		
	</td>
	<td  width='5%'>
		
			15
		
	</td>
	<td  width='5%'>
		
			16
		
	</td>	
</tr>
<tr>
	<td>1.
	</td>
	<td>
	</td>
	<td>
		{{$case->suspectNames()}}
	</td>
	<td>
		{{$case->pasal}}
	</td>
	<td>
		{{$case->pasal}}
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>	
</tr>
</tbody>
</table>
<table>
<tbody>
	<tr align='center'>
		<td></td>
		<td><strong>Mengetahui:</strong></td>
		<td>
			<strong>Jember, {{strftime("%e %B %Y")}}</strong>
		</td>
	</tr>
<tr align='center'>
	<td>
		<p style="text-align:center;">
			<strong>KASI TINDAK PIDANA UMUM</strong>		
		</p>
		<p>
		<br/>
		<br/>		
	</p>
		<p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">BUDI HARTONO, SH. MHum
		</p>
		<p style="text-align: center">
			Jaksa Muda/Nip. 19730508 199031003
		</p>
	</td>
	<td>
<p style="text-align:center;">
			<strong>KEPALA KEJAKSAAN NEGERI JEMBER</strong>
		</p>
		<p>
			<br/><br/>
		</p>
        <p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">{{$setting['kajari_name']}}</u></p>
        <p style="text-align: center">{{$setting['kajari_jabatan']}} NIP.{{$setting['kajari_nip']}}</p>
	</td>
	<td>
		
		<p style="text-align:center;">
			<strong>JAKSA PENUNTUT UMUM</strong>
		</p>
		<p>
		<br/>
		<br/>		
	</p>
		<p style="border-bottom: 1px solid #000; font-weight: bold; text-align: center; margin-bottom:0">({{$case->jaksa->name}})
		</p>
		<p style="text-align: center">
			{{$case->jaksa->pangkat->name}}/{{$case->jaksa->nip}}
		</p>
	</td>
</tr>
</tbody>
</table>