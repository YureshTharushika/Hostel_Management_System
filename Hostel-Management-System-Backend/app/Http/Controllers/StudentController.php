<?php

namespace App\Http\Controllers;

use App\Models\Appeal;
use App\Models\Student;
use App\Models\Hostel;
use App\Models\Room;
use App\Models\Bed;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //show all students function start

    public function showallstudents()
    {
        return Student::all();
    }

    //show all students function end


    //show student appeals function start

    public function showstudentappeals(Request $request)
    {


        //$student_id = $request->user()->value('id');
        $student = $request->user();

        try {

            $appeal_count = Appeal::where('student_id', $student->id)->count();

            if ($appeal_count > 0) {

                $appeals = Appeal::where('student_id', $student->id)
                    ->select('id', 'student_index_number', 'content', 'status')
                    ->get();

                $response = [
                    'appeals' => $appeals,

                ];
            } else {

                $response = [
                    'message' => 'you have no appeals',

                ];
            }



            return response($response, 200);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //show student appeals function end

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    //student signup function start

    public function studentsignup(Request $request)
    {

        //input validation
        $fields = $request->validate([

            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'index_number' => 'required|string',
            'gender' => 'required|string',
            'academic_year' => 'required|string',
            'email' => 'required|string|unique:students,email',
            'password' => 'required|string|confirmed',
        ]);

        try {

            //create new student
            $student = Student::create([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'index_number' => $fields['index_number'],
                'gender' => $fields['gender'],
                'academic_year' => $fields['academic_year'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'is_assigned' => 0,
            ]);

            //issue authentication token
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

    //student signup function end

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    //show students hostel details function start

    public function showhostelinfo(Request $request)
    {


        try {


            $student = $request->user();



            if (($student->is_assigned) == 1) {


                $student_index_number = $student->index_number;

                $bed_detail = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                    ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                    ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.student_index_number as student_index_number', 'beds.reserved_for as reserved_for', 'hostels.name as hostel_name', 'hostels.type as hostel_type')
                    ->where('student_index_number', $student_index_number)
                    ->where('reserved_for', 'student')
                    ->get();


                $response = [

                    'bed_details' => $bed_detail,
                ];

                return response($response, 200);
            } else {
                $response = [
                    'message' => 'you have not yet assigned to a hostel',

                ];

                return response($response, 200);
            }
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //show students hostel details function end



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //yet to be implemented
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    //delete student function start


    public function destroy($id)
    {
        try {

            $student = Student::where('id', $id)->get();


            if (($student->value('is_assigned')) == 1) {


                $student_index_number = $student->value('index_number');

                //$bed = Bed::where('student_index_number', $student_index_number)->where('availability', 0)->get();



                Bed::where('student_index_number', $student_index_number)
                    ->where('availability', 0)->where('reserved_for', 'student')
                    ->update(['student_index_number' => null, 'reserved_for' => null, 'availability' => 1]);
            }

            Student::find($id)->delete();

            $response = [
                'message' => 'successfully deleted student ' . $id,


            ];


            return response($response, 200);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception

            ];
            return response($response);
        }
    }


    //delete student function end
}
