<?php

namespace App\Http\Controllers;

use App\Models\Hostel;
use App\Models\Room;
use Exception;
use Illuminate\Http\Request;

class RoomController extends Controller
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


    //create new room fucntion start

    public function createroom(Request $request, $id)
    {
        $fields = $request->validate([

            'room_count' => 'required|integer|min:1',

        ]);

        try {



            if (Hostel::where('id', $id)->exists()) {

                $hostel = Hostel::find($id);

                //in default 2 beds will be created in a new room

                for ($i = 0; $i < $fields['room_count']; $i++) {



                    $room = $hostel->rooms()->create([]);


                    for ($j = 0; $j < 2; $j++) {

                        $room->beds()->create([


                            'student_index_number' => null,
                            'availability' => 1,
                        ]);
                    }
                }

                $response = [
                    'message' => 'successfully created ' . $fields['room_count'] . ' rooms with each includes 2 beds',
                    'hostel' => $hostel,



                ];

                return response($response, 201);
            } else {

                $response = [
                    'message' => 'no hostel exists with the provided id',


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

    //create new room fucntion start

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
        //Yet to be implemented
    }
}
