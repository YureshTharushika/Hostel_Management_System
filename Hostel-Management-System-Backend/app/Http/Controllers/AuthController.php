<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\SubWarden;
use App\Models\Warden;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    //student login function start

    public function studentlogin(Request $request)
    {



        $fields = $request->validate([


            'email' => 'required|string',
            'password' => 'required|string',
        ]);


        try {

            $student = Student::where('email', $fields['email'])->first();

            if (!$student || !Hash::check($fields['password'], $student->password)) {
                return response([

                    'message' => 'wrong credentials',
                ], 401);
            }


            $token = $student->createToken('studentToken', ['student', 'all'])->plainTextToken;

            $response = [
                'student' => $student,
                'token' => $token
            ];

            return response($response, 201);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //student login function end



    //sub warden login function start

    public function subwardenlogin(Request $request)
    {

        $fields = $request->validate([


            'email' => 'required|string',
            'password' => 'required|string',
        ]);


        try {

            $subwarden = SubWarden::where('email', $fields['email'])->first();

            if (!$subwarden || !Hash::check($fields['password'], $subwarden->password)) {
                return response([

                    'message' => 'wrong credentials',
                ], 401);
            }


            $token = $subwarden->createToken('subwardenToken', ['subwarden', 'all'])->plainTextToken;

            $response = [
                'subwarden' => $subwarden,
                'token' => $token
            ];

            return response($response, 201);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //sub warden login function end



    //warden login function start

    public function wardenlogin(Request $request)
    {

        $fields = $request->validate([


            'email' => 'required|string',
            'password' => 'required|string',
        ]);


        try {

            $warden = Warden::where('email', $fields['email'])->first();

            if (!$warden || !Hash::check($fields['password'], $warden->password)) {
                return response([

                    'message' => 'wrong credentials',
                ], 401);
            }


            $token = $warden->createToken('wardenToken', ['warden', 'all'])->plainTextToken;

            $response = [
                'warden' => $warden,
                'token' => $token
            ];

            return response($response, 201);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //warden login function end



    //logout function start


    public function logout(Request $request)
    {

        try {

            $request->user()->currentAccessToken()->delete();

            return [
                'messsage' => 'logged out',
            ];
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //logout function end
}
