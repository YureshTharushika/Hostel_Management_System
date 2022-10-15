<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Bed;
use App\Models\Hostel;
use App\Models\Student;
use Exception;
use Illuminate\Http\Request;

class BedController extends Controller
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


    //create new bed function start

    public function createbed(Request $request, $id)
    {
        $fields = $request->validate([

            'bed_count' => 'required|integer|min:1',

        ]);

        try {

            if (Room::where('id', $id)->exists()) {

                //find the room with provided room id
                $room = Room::find($id);

                //genarating requested number of rooms
                for ($i = 0; $i < $fields['bed_count']; $i++) {

                    $room->beds()->create([


                        'student_index_number' => null,
                        'reserved_for' => null,
                        'availability' => 1,


                    ]);
                }



                $response = [
                    'message' => 'successfully created ' . $fields['bed_count'] . ' beds in room number ' . $id,
                    'room' => $room,

                ];

                return response($response, 201);
            } else {

                $response = [
                    'message' => 'no room exists with the given id',


                ];
                return response($response);
            }
        } catch (Exception $exception) {

            $response = [
                'message' => 'failed',
                'error' => $exception,

            ];
            return response($response);
        }
    }

    //create new bed function end


    //male student random assign function start

    public function malestudentrandomassign()
    {

        try {

            //get the male hostels
            $hostels = Hostel::where('type', 'male')->get();

            //get the male hostel rooms
            $rooms = Room::whereBelongsTo($hostels)->get();

            //get the total available female hostel room beds
            $available_male_bedcount = Bed::whereBelongsTo($rooms)->where('availability', 1)->count();



            //get the total unassigned male student count
            $unassigned_male_student_count = Student::where('is_assigned', 0)->where('gender', 'male')->count();

            //check if there are enough rooms for all available students
            if ($available_male_bedcount >= $unassigned_male_student_count) {


                //assigning males
                foreach (Student::where('is_assigned', 0)->where('gender', 'male')->get() as $student) {


                    //get a random availble bed
                    $hostels = Hostel::where('type', 'male')->get();
                    $rooms = Room::whereBelongsTo($hostels)->get();
                    $bed = Bed::whereBelongsTo($rooms)->where('availability', 1)->inRandomOrder()->first();



                    //update bed
                    $bed->update([

                        'student_index_number' => $student->index_number,
                        'reserved_for' => 'student',
                        'availability' => 0,

                    ]);


                    //update student
                    $student->update([

                        'is_assigned' => 1

                    ]);
                }


                $response = [
                    'message' => 'students assigned successfully',

                ];
            } else {
                $response = [
                    'message' => 'not enough rooms',

                ];
            }



            return response($response, 200);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong.try making more rooms in boys hostels',
                'error' => $exception,

            ];

            return response($response);
        }
    }

    //male student random assign function end


    //female student random assign function start

    public function femalestudentrandomassign()
    {


        try {




            //get the female hostels
            $hostels = Hostel::where('type', 'female')->get();

            //get the female hostel rooms
            $rooms = Room::whereBelongsTo($hostels)->get();

            //get the total available female hostel room beds
            $available_female_bedcount = Bed::whereBelongsTo($rooms)->where('availability', 1)->count();



            //get the total unassigned female student count
            $unassigned_female_student_count = Student::where('is_assigned', 0)->where('gender', 'female')->count();

            //check if there are enough rooms for all available students
            if ($available_female_bedcount >= $unassigned_female_student_count) {


                //assigning females
                foreach (Student::where('is_assigned', 0)->where('gender', 'female')->get() as $student) {


                    //get a random availble bed
                    $hostels = Hostel::where('type', 'female')->get();
                    $rooms = Room::whereBelongsTo($hostels)->get();
                    $bed = Bed::whereBelongsTo($rooms)->where('availability', 1)->inRandomOrder()->first();



                    //update bed
                    $bed->update([

                        'student_index_number' => $student->index_number,
                        'reserved_for' => 'student',
                        'availability' => 0,

                    ]);



                    //update student
                    $student->update([

                        'is_assigned' => 1

                    ]);
                }


                $response = [
                    'message' => 'students assigned successfully',

                ];
            } else {
                $response = [
                    'message' => 'not enough rooms',

                ];
            }



            return response($response, 200);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong.try making more rooms in girls hostels',
                'error' => $exception,

            ];

            return response($response);
        }
    }

    //female student random assign function end


    //change student hostel function start

    public function changestudenthostel(Request $request)
    {

        //get student id and hostel id from request
        $fields = $request->validate([

            'hostel_id' => 'required|integer',
            'student_index' => 'required|string',

        ]);

        try {


            //unassign the student from the current hostel bed
            $current_bed = Bed::where('student_index_number', $fields['student_index']);

            $current_bed->update([

                'student_index_number' => null,
                'reserved_for' => null,
                'availability' => 1,

            ]);



            //get the requested hostel from the hostel id
            $hostel = Hostel::find($fields['hostel_id']);

            //get a random available bed in the selected hostel 
            $bed = $hostel->beds()->where('availability', 1)->inRandomOrder()->first();

            //assign student into the new hostel bed
            $bed->update([

                'student_index_number' => $fields['student_index'],
                'reserved_for' => 'student',
                'availability' => 0,

            ]);

            $response = [

                'message' => 'hostel change successful',
                'new_bed' => $bed,

            ];

            return response($response, 200);
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong.try again later',
                'error' => $exception,

            ];

            return response($response);
        }
    }


    //change student hostel function end


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Yet to be implemented
    }

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


        //implement check for warden and subwarden+++

        try {

            $bed = Bed::find($id);

            if (($bed->value('availability')) == 0) {

                //get the student index number in that bed
                $student_index = $bed->value('student_index_number');

                //get the student 
                $student = Student::where('index_number', $student_index);

                //update student to unassigned
                $student->update([

                    'is_assigned' => 0,

                ]);
            }

            $bed->delete();

            $response = [
                'message' => 'successfully deleted bed' . $id,

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
}
