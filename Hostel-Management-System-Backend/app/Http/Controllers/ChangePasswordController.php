<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ChangePasswordController extends Controller
{

    //change password function start

    public function changepassword(Request $request)
    {


        //input validation
        $validator = validator::make($request->all(), [

            'old_password' => 'required|string',
            'password' => 'required|string|min:8|max:12',
            'password_confirmation' => 'required|same:password',

        ]);

        if ($validator->fails()) {

            $response = [
                'message' => 'validation failed',
                'errors' => $validator->errors(),
            ];
            return response($response, 422);
        }

        //fetching requested user
        $user = $request->user();

        //validating input with database records and update database
        if (Hash::check($request->old_password, $user->password)) {

            $user->update([

                'password' => bcrypt($request->password)
            ]);

            $response = [
                'message' => 'password successfully updated',

            ];
            return response($response, 200);
        } else {
            $response = [
                'message' => 'old password is incorrect',

            ];
            return response($response, 400);
        }
    }

    //change password function end
}
