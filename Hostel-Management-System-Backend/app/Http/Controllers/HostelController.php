<?php

namespace App\Http\Controllers;

use App\Models\Hostel;
use App\Models\Room;
use App\Models\Bed;
use App\Models\Student;
use App\Models\SubWarden;
use App\Models\Warden;
use Exception;
use Illuminate\Http\Request;

class HostelController extends Controller
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

    //create new hostel function start


    public function createhostel(Request $request)
    {
        $fields = $request->validate([

            'name' => 'required|string',
            'type' => 'required|string',


        ]);

        try {

            $hostel = Hostel::create([
                'name' => $fields['name'],
                'type' => $fields['type'],


            ]);



            $response = [
                'message' => 'successfully created',
                'hostel' => $hostel
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

    //create new hostel function end

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    //show all hostels function start


    public function show()
    {

        try {

            $all_hostels = Hostel::all();
            $hostel_count = $all_hostels->count();

            if ($hostel_count > 0) {

                $response = [
                    'hostels' => $all_hostels,

                ];
                return response($response);
            } else {

                $response = [
                    'message' => 'no hostels have been created yet ',

                ];
                return response($response);
            }
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //show all hostels function end


    //show all potential hostels for change a student function start

    public function showpotentialhostelsforchange($id)
    {




        try {

            $potential_hostels = [];

            //get current hostel from id
            $current_hostel = Hostel::find($id);

            //get current hostel type from hostel
            $current_hostel_type = $current_hostel->type;

            $potential_hostel_count = Hostel::where('id', '!=', $id)->where('type', $current_hostel_type)->count();

            if ($potential_hostel_count > 0) {

                //show potential hostels
                foreach (Hostel::where('id', '!=', $id)->where('type', $current_hostel_type)->get() as $hostel) {



                    array_push($potential_hostels, $hostel);
                }

                $response = [
                    'potential_hostels' => $potential_hostels,

                ];

                return response($response);
            } else {
                $response = [
                    'message' => 'no potential hostels for change',

                ];

                return response($response);
            }
        } catch (Exception $exception) {

            $response = [
                'message' => 'something went wrong',
                'error' => $exception
            ];

            return response($response);
        }
    }

    //show all potential hostels for change a student function start

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


    //hostel delete function start


    public function destroy($id)
    {
        try {

            //get the hostel from id
            $hostel = Hostel::find($id);

            //check if that hostel has one or more rooms
            if ((Room::where('hostel_id', $id)->count()) > 0) {

                //get a room of that hostel
                foreach (Room::where('hostel_id', $id)->get() as $room) {

                    //check if any of the bed is occupied by a student
                    if ((Bed::where('room_id', $room->id)->where('availability', 0)->where('reserved_for', 'student')->count()) > 0) {


                        //get a occupied bed in that room
                        foreach (Bed::where('room_id', $room->id)->where('availability', 0)->where('reserved_for', 'student')->get() as $bed) {

                            //get the student index number in that bed
                            $student_index = $bed->student_index_number;


                            // //update student to unassigned
                            Student::where('index_number', $student_index)
                                ->update(['is_assigned' => 0]);
                        }
                    }

                    //check if any of the bed is occupied by a subwarden
                    if ((Bed::where('room_id', $room->id)->where('availability', 0)->where('reserved_for', 'subwarden')->count()) > 0) {

                        //get a occupied bed in that room
                        foreach (Bed::where('room_id', $room->id)->where('availability', 0)->where('reserved_for', 'subwarden')->get() as $bed) {

                            //get the subwarden id number in that bed
                            $subwarden_id = $bed->student_index_number;


                            // //update subwarden to unassigned
                            SubWarden::where('id', $subwarden_id)
                                ->update(['is_assigned' => 0]);
                        }
                    }

                    //check if any of the bed is occupied by a warden
                    if ((Bed::where('room_id', $room->id)->where('availability', 0)->where('reserved_for', 'warden')->count()) > 0) {

                        //get a occupied bed in that room
                        foreach (Bed::where('room_id', $room->id)->where('availability', 0)->where('reserved_for', 'warden')->get() as $bed) {

                            //get the subwarden id number in that bed
                            $warden_id = $bed->student_index_number;


                            // //update subwarden to unassigned
                            Warden::where('id', $warden_id)
                                ->update(['is_assigned' => 0]);
                        }
                    }
                }
            }




            $hostel->delete();

            $response = [

                'message' => 'successfully deleted hostel ' . $id,

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

    //hostel delete function end
}
