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
            P-6
        </td>
    </tr>
    </tbody>
</table>

<p style="text-align: center"><strong>LAPORAN TERJADINYA TINDAK PIDANA</strong></p>
<?php $days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];?>
<p>Pada hari ini {{$days[date('w')]}} tanggal {{strftime("%e %B %Y")}}</p>
<p>Saya :</p>

<table>
    <tr>
        <td style="width: 150px">Nama</td>
        <td width='5px'>:</td>
        <td>{{($case->penyidikInternal)?$case->penyidikInternal->name:''}}</td>
    </tr>
    <tr>
        <td>Pangkat</td>
        <td>:</td>
        <td>{{$case->penyidikInternal?$case->penyidikInternal->pangkat->name:''}}</td>
    </tr>
    <tr>
        <td>NIP</td>
        <td>:</td>
        <td>{{$case->penyidikInternal?$case->penyidikInternal->nip:''}}</td>
    </tr>
    <tr>
        <td>Jabatan</td>
        <td>:</td>
        <td>Jaksa pada Kejaksaan</td>
    </tr>
</table>

<p>dengan ini melaporkan kepada .............. Bahwa saya telah menerima laporan dari ................ Tim Penyidik/KOMNAS HAM (dalam perkara pelanggaran HAM berat), tentang tindak pidana ............. yang diduga dilakukan oleh .......... dengan kasus posisi sebagai berikut: ..........</p>

<p>Demikian Laporan Terjadinya Tindak Pidana ini saya buat dengan sebenarnya atas kekuatan Sumpah Jabatan.</p>

<table>
    <tbody><tr>
        <td style="width: 400px"></td>
        <td style="text-align: center">
            YANG MELAPORKAN
            <br/>
            <br/>
            <br/>
            <br/>
            ........................
        </td>
    </tr>
    </tbody></table>
