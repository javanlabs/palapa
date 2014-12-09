@extends('layouts.frontend')
@section('content')

@stop

@section('style-head')
<style>
    table th {
    text-transform: uppercase;
    font-weight: 700;
    font-size: .9em;
    color: #999;
    background-color: #eef1f5;
    }
    table tbody tr td{cursor: pointer}
    .progress .progress-bar{
        margin-right: 2px;
    }
</style>
@stop

@section('script-end')
<script>
$(function(){
    $('table').on('click', 'tr', function(e){
        e.preventDefault();
        $('#modal-detail').modal('show');
    });

    $(function () {
        $('.progress .progress-bar').popover({
            trigger: 'hover',
            placement: 'top',
            html: true,
            content: "<h6>9 September 2014</h6><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque esse et nulla obcaecati optio quis vero vitae voluptas</p>"
        });
    })
});
</script>
@stop
