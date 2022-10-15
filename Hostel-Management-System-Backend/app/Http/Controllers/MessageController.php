<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Message;
use Illuminate\Http\Request;
use Exception;



class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Yet to be implemented
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    //showmessages function start 

    public function showmessages(Request $request)
    {
        try {


            $student = $request->user();


            if (Message::where('student_id', $student->id)->exists()) {

                $messages = Student::find($student->id)->messages;

                $response = [

                    'messages' => $messages,

                ];

                return response($response, 200);
            } else {
                $response = [

                    'messages' => 'you have no messages',

                ];

                return response($response, 200);
            }
        } catch (Exception $exception) {


            $response = [
                'message' => 'failed',
                'error' => $exception,

            ];
            return response($response);
        }
    }

    //showmessages function end 


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Yet to be implemented
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $message = Message::find($id);
            $message->delete();

            $response = [
                'message' => 'message successfully deleted',

            ];

            return response($response, 200);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception

            ];
        }
    }
}
