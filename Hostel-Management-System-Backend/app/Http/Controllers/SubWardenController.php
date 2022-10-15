<?php

namespace App\Http\Controllers;

use App\Models\Bed;
use App\Models\SubWarden;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SubWardenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allsubwardnes()
    {


        try {

            $all_subwardens = SubWarden::all();
            $subwarden_count = $all_subwardens->count();

            if ($subwarden_count > 0) {

                $response = [
                    'subwardens' => $all_subwardens,

                ];
                return response($response);
            } else {

                $response = [
                    'message' => 'no subwardens have been created yet ',

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */



    //sub warden signup function start

    public function subwardensignup(Request $request)
    {
        $fields = $request->validate([

            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string|unique:sub_wardens,email',
            'password' => 'required|string|confirmed',
        ]);

        try {

            $subwarden = SubWarden::create([
                'first_name' => $fields['first_name'],
                'last_name' => $fields['last_name'],
                'gender' => $fields['gender'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'is_assigned' => 0
            ]);

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

    //sub warden signup function end



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */



    //show female student's hostel details function start


    public function showfemalestudenthosteldetails()
    {
        try {


            $occupied_femalestudent_beds_count = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                ->select('beds.*', 'hostels.name')
                ->where('availability', 0)
                ->where('availability', 0)
                ->where('reserved_for', 'student')
                ->where('hostels.type', 'female')
                ->count();

            if ($occupied_femalestudent_beds_count > 0) {

                $beds_details = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                    ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                    ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.student_index_number as student_index_number', 'beds.reserved_for as reserved_for', 'hostels.name as hostel_name', 'hostels.type as hostel_type', 'hostels.id as hostel_id')
                    ->where('availability', 0)
                    ->where('availability', 0)
                    ->where('reserved_for', 'student')
                    ->where('hostels.type', 'female')
                    ->get();

                $response = [
                    'bed_details' => $beds_details,

                ];

                return response($response, 200);
            } else {

                $response = [
                    'message' => 'there are no students assigned to hostels yet',

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

    //show female student's hostel details function end


    //show male student's hostel details function start


    public function showmalestudenthosteldetails()
    {
        try {


            $occupied_male_student_beds_count = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                ->select('beds.*', 'hostels.name')
                ->where('availability', 0)
                ->where('availability', 0)
                ->where('reserved_for', 'student')
                ->where('hostels.type', 'male')
                ->count();

            if ($occupied_male_student_beds_count > 0) {

                $beds_details = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                    ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                    ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.student_index_number as student_index_number', 'beds.reserved_for as reserved_for', 'hostels.name as hostel_name', 'hostels.type as hostel_type', 'hostels.id as hostel_id')
                    ->where('availability', 0)
                    ->where('availability', 0)
                    ->where('reserved_for', 'student')
                    ->where('hostels.type', 'male')
                    ->get();

                $response = [
                    'bed_details' => $beds_details,

                ];

                return response($response, 200);
            } else {

                $response = [
                    'message' => 'there are no students assigned to hostels yet',

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

    //show male student's hostel details function end


    //assign subwarden to hostel function start

    public function assignsubwarden(Request $request)
    {

        $fields = $request->validate([

            'subwarden_id' => 'required|integer',
            'bed_id' => 'required|integer',

        ]);

        try {

            $subwarden = SubWarden::find($fields['subwarden_id']);


            if (($subwarden->is_assigned) == 0) {


                //update bed

                $bed = Bed::find($fields['bed_id']);
                $subwarden = SubWarden::find($fields['subwarden_id']);

                $bed->update([

                    'student_index_number' => $fields['subwarden_id'],
                    'reserved_for' => 'subwarden',
                    'availability' => 0,

                ]);

                //update subwarden
                $subwarden->update([

                    'is_assigned' => 1,

                ]);

                $response = [
                    'message' => 'subwarden assigned successfully',

                ];

                return response($response, 200);
            } else {

                $response = [
                    'message' => 'subwarden is already assigned to a hostel',

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

    //assign subwarden to hostel function end


    //show subwarden hostel function start

    public function showmyhostel(Request $request)
    {
        try {
            $subwarden = $request->user();


            if (($subwarden->is_assigned) == 1) {


                $subwarden_id = $subwarden->id;

                $bed_detail = Bed::leftJoin('rooms', 'beds.room_id', '=', 'rooms.id')
                    ->join('hostels', 'rooms.hostel_id', '=', 'hostels.id')
                    ->select('beds.id as bed_id', 'beds.room_id as room_id', 'beds.student_index_number as subwarden_id', 'beds.reserved_for as reserved_for', 'hostels.name as hostel_name', 'hostels.type as hostel_type')
                    ->where('student_index_number', $subwarden_id)
                    ->where('reserved_for', 'subwarden')
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

    //show subwarden hostel function end

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


    //delete subwarden function start

    public function destroy($id)
    {



        try {

            $subwarden = SubWarden::find($id);


            if (($subwarden->is_assigned) == 1) {

                Bed::where('student_index_number', $subwarden->id)
                    ->where('availability', 0)->where('reserved_for', 'subwarden')
                    ->update(['student_index_number' => null, 'reserved_for' => null, 'availability' => 1]);
            }

            SubWarden::find($id)->delete();

            $response = [
                'message' => 'successfully deleted subwarden ' . $id,


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

    //delete subwarden function end
}
