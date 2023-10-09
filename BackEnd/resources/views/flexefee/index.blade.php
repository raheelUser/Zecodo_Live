@extends('adminlte::page')

@section('content')
    <h3 class="text-center mb-5">Flexe Fee</h3>

    <div class="container">
    @if(session('success'))
            <div class="alert alert-success" role="alert">
                {{ session('success') }}
            </div>
    @endif
    <table class="table">
            <br>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">fee</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            @php
                $count = 1;
            @endphp
            @forelse($flexefee as $item)
                <tr>
                    <td>{{$count++}}</td>
                    <td>{{$item->fee}} %</td>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <a style="margin-left: 3px" href="{{route('flexefee.show', $item->id)}}" class="btn btn-info"><i
                                        class="fa fa-pen"></i></a>
                        </div>
                    </td>
                </tr>   
              @empty
                <p>No In Flexe Fee</p>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection