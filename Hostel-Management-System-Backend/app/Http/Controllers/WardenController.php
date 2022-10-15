<?php

namespace App\Http\Controllers;

use App\Models\Warden;
use App\Models\Bed;
use App\Models\SubWarden;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WardenController extends Controller
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

    //warden signup function start

    public function wardensignup(Request $request)
    {
        $fields = $request->validate([

            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string|unique:wardens,email',
            'password' => 'required|string|confirmed',
        ]);


        try {

            $warden = Warden::create([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'gender' => $fields['gender'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'is_assigned' => 0
            ]);

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

    //warden signup function end




    //assign warden to hostel function start

    public function assignwarden(Request $request)
    {

        $fields = $request->validate([

            'warden_id' => 'required|integer',
            'bed_id' => 'required|integer',

        ]);

        try {

            $warden = Warden::find($fields['warden_id']);


            if (($warden->is_assigned) == 0) {


                //update bed

                $bed = Bed::find($fields['bed_id']);
                $warden = Warden::find($fields['warden_id']);

                $bed->update([

                    'student_index_number' => $fields['warden_id'],
                    'reserved_for' => 'warden',
                    'availability' => 0,

                ]);

                //update warden
                $warden->update([

                    'is_assigned' => 1,

                ]);

                $response = [
                    'message' => 'warden assigned successfully',

                ];

                return response($response, 200);
            } else {

                $response = [
                    'message' => 'warden is already assigned to a hostel',

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


    //assign warden to hostel function end




    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    //show warden hostel function start


    public function showmyhostel(Request $request)
    {
        try {
            $warden = $request->user();


            if (($warden->is_assigned) == 1) {


                $warden_id = $warden->id;

                $bed_detail = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                    ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                    ->select('beds.id as bed id', 'beds.room_id as room id', 'beds.student_index_number as warden id', 'beds.reserved_for as reserved for', 'hostels.name as hostel name', 'hostels.type as hostel type')
                    ->where('student_index_number', $warden_id)
                    ->where('reserved_for', 'warden')
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

    //show warden hostel function end

    // show potential beds to assign for subwarden function start

    public function showpotentialbedsforsubwarden($id)
    {
        try {

            //get subwarden from id
            $subwarden = SubWarden::find($id);

            if ($subwarden->is_assigned == 0) {


                if ($subwarden->gender == 'male') {

                    $beds = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                        ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                        ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.availability as availability', 'hostels.name as hostel_name', 'hostels.type as hostel_type')
                        ->where('availability', 1)
                        ->where('hostels.type', 'male')
                        ->get();

                    $response = [
                        'available_beds' => $beds,


                    ];


                    return response($response, 200);
                } elseif ($subwarden->gender == 'female') {

                    $beds = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                        ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                        ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.availability as availability', 'hostels.name as hostel_name', 'hostels.type as hostel_type')
                        ->where('availability', 1)
                        ->where('hostels.type', 'female')
                        ->get();

                    $response = [
                        'available_beds' => $beds,


                    ];


                    return response($response, 200);
                }
            } else {

                $response = [
                    'message' => 'subwarden is already assigned to a hostel',


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


    // show potential beds to assign for subwarden function end


    // show potential beds to assign for warden function start

    public function showpotentialbedsforwarden($id)
    {
        try {

            //get warden from id
            $warden = Warden::find($id);

            if ($warden->is_assigned == 0) {


                if ($warden->gender == 'male') {

                    $beds = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                        ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                        ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.availability as availability', 'hostels.name as hostel_name', 'hostels.type as hostel_type')
                        ->where('availability', 1)
                        ->where('hostels.type', 'male')
                        ->get();

                    $response = [
                        'available beds' => $beds,


                    ];


                    return response($response, 200);
                } elseif ($warden->gender == 'female') {

                    $beds = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                        ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                        ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.availability as availability', 'hostels.name as hostel_name', 'hostels.type as hostel_type')
                        ->where('availability', 1)
                        ->where('hostels.type', 'female')
                        ->get();

                    $response = [
                        'available beds' => $beds,


                    ];


                    return response($response, 200);
                }
            } else {

                $response = [
                    'message' => 'warden is already assigned to a hostel',


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


    // show potential beds to assign for warden function end



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
    public function destroy($id)
    {
        //yet to be implemented
    }
}
