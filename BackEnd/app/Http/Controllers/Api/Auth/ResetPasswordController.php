<?php


namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ResetPasswordController extends Controller
{
     use ResetsPasswords;
     
    public function reset(Request $request)
    {
        $validator = $this->validator($request->all());
        if ($validator->fails()) {
            throw ValidationException::withMessages(['message' => 'Password Must Be Strong.']);           
        }
        $user = User::where('email', $request->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();
        // return $this->genericResponse(200, 'Password Has Been Changed.');
        return 'Password Has Been Changed.';
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => ['required'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    }
}
