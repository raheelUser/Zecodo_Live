@extends('adminlte::page')

@section('content')
    <div class="container">
        @if(session('success'))
            <div class="alert alert-success" role="alert">
                {{ session('success') }}
            </div>
        @endif
        <div class="row">
            <div class="col-md-8">
                <a href="{{route('product.show-attributes',$product->guid)}}" class="btn btn-primary">Add
                    Attributes</a>
            </div>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                {{--<th scope="col">Status</th>--}}
                <!-- <th scope="col">Type</th> -->
                <!-- <th scope="col">Created At</th> -->
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            @php
                $count = 1;
            @endphp
            @forelse($product->productAttributes as $item)
                <tr>
                    <td>{{$count++}}</td>
                    <td>{{$item->attribute->name}}</td>
                    <td>{{$item->value}}</td>
                    <!-- <td>{{--{{$item->unitType ? $item->unitType->name : null}}--}}</td> -->

                    <!-- <td>{{$item->created_at}}</td> -->
                    <td>
                        
                        <button type="button"
                                class="btn btn-danger"
                                data-toggle="modal" data-target="#products1{{$item->id}}">
                                <i class="fa fa-trash" style="color: white"></i></button>
                                @include('partials.delete-modal',['data' => $item,'route'=> "product-attributes"])
                    </td>
                </tr>
                
            @empty
                <p>No Active Properties</p>
            @endforelse
            </tbody>
        </table>

    </div>
@endsection


@section('js')
    <script>

    </script>
@stop
