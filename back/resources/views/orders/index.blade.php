@extends('adminlte::page')

@section('content')
    <h3 class="text-center mb-5">Orders</h3>

    <div class="container">
        @if(session('success'))
            <div class="alert alert-success" role="alert">
                {{ session('success') }}
            </div>
        @endif
        <div class="row">
        <div class="col-md-8">
        </div>
            <div class="col-md-4 text-right">
                <form action="" method="GET">
                    <div class="input-group">
                        <input type="search" name="search" class="form-control" placeholder="Search"/>
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
        <table class="table">
            <br>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Order Id</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            @php
                $count = 1;
            @endphp
           
            @foreach($orders as $order)
                <tr>
                    <td>{{$count++}}</td>
                    <td>{{$order->orderid}}</td>
                    <td>{{$order->created_at}}</td>
                    <td><button type="button"
                                class="btn btn-success"
                                data-toggle="modal" data-target="#products1{{$order->id}}">
                               View
                        
                    </td>
                </tr>
                @include('partials.order-detail-modal',['data' => $order,'route'=> "products"])
            @endforeach
            </tbody>
        </table>
        {{$orders->links()}}
        
    </div>
@endsection
