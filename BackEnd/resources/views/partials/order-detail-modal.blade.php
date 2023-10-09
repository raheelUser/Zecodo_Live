<div class="modal fade" id="products1{{$data->id}}" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                    <span><strong>Order No. {{$data->orderid}} Details</strong></span>
                 </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="text-align:center;">
                <div class="col-md-12">
                    <div class="col-md-2">
                        {{ $data->orderid }}
                    </div>
                    <div class="col-md-2">
                        Customer Name:{{ json_decode($data->Customer)->name }}
                    </div>
                    <a href="#">Details</a>
                </div>
            </div>
            <div class="modal-footer">
            <a href="#" class="btn btn-secondary" data-dismiss="modal">Details</a>
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close
                </button> -->
            </div>
        </div>
    </div>
</div>
