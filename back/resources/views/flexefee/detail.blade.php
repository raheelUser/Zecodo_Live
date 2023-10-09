@extends('adminlte::page')

@section('content')
    <div class="container-lg">
        @if(session('success'))
                <div class="alert alert-success" role="alert">
                    {{ session('success') }}
                </div>
        @endif
    <form action="{{route('flexefee.update', $flexefee->id)}}" method="POST">
        <input type="hidden" name="_method" value="POST">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="form-group">
            <label>Fee</label>
            <input type="number" step=".01" name="fee" class="form-control"  value="{{ $flexefee->fee }}" />
        </div>
        <input type="submit" value="Submit" />
    </form>
    
    </div>
@endsection