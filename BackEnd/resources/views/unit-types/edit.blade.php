@extends('adminlte::page')

@section('content')
    <div class="container">
        @if(session('success'))
            <div class="alert alert-success" role="alert">
                {{ session('success') }}
            </div>
        @endif
        <form action="{{route('unit-type.update',$unitType->id)}}" method="POST">
            <input type="hidden" name="_method" value="PUT">
            @csrf
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" value="{{$unitType->name}}" class="form-control"
                       placeholder="Enter Category Name" required>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select name="active" class="form-control" required>
                    <option value="" selected>Please select...</option>
                    <option value="1" {{$unitType->active == 1 ? 'selected' : ''}}>Active</option>
                    <option value="0" {{$unitType->active == 0 ? 'selected': ''}}>In-Active</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <br>
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>

@endsection
