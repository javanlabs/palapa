{{ Form::open(['url' => route('backend.cases.checklist', [$case['id'], $checklist['id']]), 'role' => 'form', 'id' => 'form-activity']) }}

<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <h4 class="modal-title">{{ $checklist['name'] }}</h4>
</div>

<div class="modal-body">

    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    <div class="form-group">
        <label for="">Tanggal</label>
        {{ Form::text('date', date('d-m-Y'), ['class' => 'form-control datepicker', 'id' => 'activity-date']) }}
    </div>
    <div class="form-group">
        <label for="">Catatan</label>
        {{ Form::textarea('note', '', ['class' => 'form-control']) }}
    </div>

</div>

<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
    <button type="submit" class="btn btn-primary" data-loading-text="Loading..." style="width: 100px">Simpan</button>
</div>

{{ Form::close() }}

<script>
$(function(){
    $('#activity-date').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        todayHighlight: true
    });

    $('#form-activity').on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        var btn = form.find('button[type=submit]');
        btn.button('loading');
        $.ajax({
            url: form.attr('action'),
            type:'post',
            dataType:'json',
            data: form.serialize()
        })
        .success(function(response){
            if (response.status == 1) {
                window.location.reload();
            } else {
                alert(response.message);
            }
        })
        .always(function(){

            btn.button('reset');
        });
    });
});
</script>
