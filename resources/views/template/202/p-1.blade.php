<table>
    <tbody>
    <tr>
    </tr><tr>
        <td style="text-align: center;" width="300px">
            <strong>KEJAKSAAN NEGERI JEMBER</strong>
        </td>
        <td width="300px">
        </td>
        <td style="text-align: right;">
            <strong data-redactor-tag="strong">
                P-1
            </strong>
        </td>
    </tr>
    </tbody>
   
</table>
 
<p style="text-align: center;"><strong><u data-redactor-tag="u">PENERIMAAN LAPORAN</u></strong><br>NOMOR ................................</p><p><br></p><p>Pada hari ini {{strftime("%A")}} tanggal {{strftime("%e %B %Y")}} bertempat di Jember</p>
<p>Saya {{($case->penyidikInternal)?$case->penyidikInternal->name:''}}</p>
<p>Pangkat {{$case->penyidikInternal?$case->penyidikInternal->pangkat->name:''}} NIP {{$case->penyidikInternal?$case->penyidikInternal->nip:''}} Jabatan {{$case->penyidikInternal?$case->penyidikInternal->jabatan->name:''}} Pada Kejaksaan Negeri Jember telah menerima, laporan dari:</p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>yang bersangkutan telah melaporkan:</p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p>........................................................................................................................................................................<span></span></p><p{{$case['penyidik_internal']?$case->penyidikInternal->jabatan->name:''}}span></span></p><p>Demikianlah Surat Penerimaan Laporan ini saya buat dengan sebenarnya atas kekuatan sumpah jabatan kemudian ditutup dan ditandatangani pada hari, tanggal dan tempat seperti tersebut diatas.</p><p><br></p><table>
    <tbody><tr>
        <td style="width: 500px"></td>
        <td>
            <p style="text-align: center;">PENERIMA LAPORAN,</p><p style="text-align: right;"><br></p>
            <p style="text-align: center;"><strong>{{($case->penyidikInternal)?$case->penyidikInternal->name:''}}</strong></p>
        </td>
    </tr>
</tbody></table>