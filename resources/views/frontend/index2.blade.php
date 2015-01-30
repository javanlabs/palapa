@extends("layouts.base")

@section('body-class')
    home-simple frontend
@stop

@section("body")

    @include('layouts.elements.header')

    <div style="width: 80%; margin:100px auto">
        <div class="container-fluid">
            <div class="col-md-4"></div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <div class="list-group list-menu">
                    <a class="list-group-item item-1 hvr-sweep-to-right" href="{{ route('frontend.post', ['category' => 'pembinaan']) }}">Pembinaan <i class="ion-ios-arrow-forward icon"></i></a>
                    <a class="list-group-item item-2 hvr-sweep-to-right" href="{{ route('frontend.post', ['category' => 'intelijen']) }}">Intelijen <i class="ion-ios-arrow-forward icon"></i></a>
                    <a class="list-group-item item-3 hvr-sweep-to-right" href="{{ route('frontend.search') }}?type=201">Pidum <i class="ion-ios-arrow-forward icon"></i></a>
                    <a class="list-group-item item-4 hvr-sweep-to-right" href="{{ route('frontend.search') }}?type=202">Pidsus <i class="ion-ios-arrow-forward icon"></i></a>
                    <a class="list-group-item item-5 hvr-sweep-to-right" href="{{ route('frontend.search') }}?type=203">Datun <i class="ion-ios-arrow-forward icon"></i></a>
                </div>
            </div>
        </div>
    </div>

@stop

@section('script-end')
    @parent

    <script>
        $(function(){

            $(document).idle({
                onIdle: function(){
                    document.location = '{{ route('slide') }}';
                },
                idle: 1000 * 60 * 3 // 3 minute
            })

            $(document).keypress(function(e) {
                var key = String.fromCharCode(e.which);

                var menu = $('.section-menu-grid').find('[data-keymap=' + key + ']').first();

                if(menu.length > 0)
                {
                    document.location = menu.attr('href');
                }
            });

            $('.btn-detail').on('click', function(e){
                e.preventDefault();
                $.blockUI(BLOCKUI_STYLE);

                $.get($(this).attr('href'), '', function(response, status){
                    $.unblockUI();
                    $(response).modal('show');
                    $(response).on('hidden.bs.modal', function(e){
                        $(response).remove();
                    });
                });
            });
        });
    </script>
@stop