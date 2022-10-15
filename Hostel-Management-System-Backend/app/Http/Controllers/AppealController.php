<?php

namespace App\Http\Controllers;

use App\Models\Appeal;
use App\Models\Message;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


class AppealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //show all appeals function start


    public function showappeals()
    {
        return Appeal::all();
    }

    //show all appeals function end

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */



    //appeal function start 

    public function appeal(Request $request)
    {
        $fields = $request->validate([

            'content' => 'required|string',

        ]);

        try {

            $student = $request->user();
            $student_index_number = $student->index_number;
            $student_email = $student->email;





            $appeal = $student->appeal()->create([

                'student_index_number' => $student_index_number,
                'content' => $fields['content'],
                'student_email' => $student_email,
                'status' => 0,

            ]);

            $response = [
                'message' => 'success',
                'appeal details' => $appeal,

            ];

            return response($response, 201);
        } catch (Exception $exception) {

            $response = [
                'message' => 'failed',
                'error' => $exception,

            ];
            return response($response);
        }
    }

    //appeal function end



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //yet to be implemented
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    //appeal accept function start

    public function accept($id)
    {


        try {

            $appeal = Appeal::find($id);

            $student_id = $appeal->student_id;

            $appeal->status = 1;

            $appeal->save();

            $student = Student::find($student_id);

            $message = $student->messages()->create([


                'content' => 'your appeal has been approved',


            ]);


            $response = [
                'message' => 'appeal accepted.request successful',
                'message sent to student' => $message,


            ];

            return response($response, 201);
        } catch (Exception $exception) {

            $response = [
                'message' => 'failed operation',
                'error' => $exception,

            ];
            return response($response);
        }
    }

    //appeal accept function end


    //appeal decline function start

    public function decline($id)
    {
        try {

            $appeal = Appeal::find($id);

            $student_id = $appeal->student_id;

            $student = Student::find($student_id);

            $appeal->status = 2;

            $appeal->save();

            $message = $student->messages()->create([


                'content' => 'your appeal has been declined',


            ]);

            $response = [
                'message' => 'appeal declined.request successful',
                'message sent to student' => $message,


            ];



            return response($response, 201);
        } catch (Exception $exception) {

            $response = [
                'message' => 'failed operation',
                'error' => $exception,

            ];
            return response($response);
        }
    }

    //appeal decline function end



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //yet to be implemented
    }
}
