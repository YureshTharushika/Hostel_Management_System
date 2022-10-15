<?php


use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppealController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubWardenController;
use App\Http\Controllers\WardenController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\HostelController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//public routes can be accessed by unauthenticated users


Route::post('/studentlogin', [AuthController::class, 'studentlogin']);
Route::post('/subwardenlogin', [AuthController::class, 'subwardenlogin']);
Route::post('/wardenlogin', [AuthController::class, 'wardenlogin']);



Route::post('/wardensignup', [WardenController::class, 'wardensignup']);
Route::post('/subwardensignup', [SubWardenController::class, 'subwardensignup']);
Route::post('/studentsignup', [StudentController::class, 'studentsignup']);


Route::get('/availablehostelsforsubwarden/{id}', [WardenController::class, 'showpotentialbedsforsubwarden']);
Route::get('/availablehostelsforwarden/{id}', [WardenController::class, 'showpotentialbedsforwarden']);

Route::put('/assignsubwarden', [SubWardenController::class, 'assignsubwarden']);
Route::put('/assignwarden', [WardenController::class, 'assignwarden']);

Route::get('/showappeals', [AppealController::class, 'showappeals']);
Route::put('/acceptappeal/{id}', [AppealController::class, 'accept']);
Route::put('/declineappeal/{id}', [AppealController::class, 'decline']);


Route::get('/students', [StudentController::class, 'showallstudents']);
Route::delete('/deletestudent/{id}', [StudentController::class, 'destroy']);
Route::get('/showmalestudenthosteldetails', [SubWardenController::class, 'showmalestudenthosteldetails']);
Route::get('/showfemalestudenthosteldetails', [SubWardenController::class, 'showfemalestudenthosteldetails']);
Route::put('/changestudenthostel', [BedController::class, 'changestudenthostel']);

Route::get('/showwardenhostel', [WardenController::class, 'showmyhostel']);
Route::get('/showallsubwardens', [SubWardenController::class, 'allsubwardnes']);
Route::delete('/deletesubwarden/{id}', [SubWardenController::class, 'destroy']);

Route::put('/malerandom', [BedController::class, 'malestudentrandomassign']);
Route::put('/femalerandom', [BedController::class, 'femalestudentrandomassign']);
Route::put('/changehostel', [BedController::class, 'changestudenthostel']);
Route::get('/potentialhostels/{id}', [HostelController::class, 'showpotentialhostelsforchange']);

Route::get('/showallhostels', [HostelController::class, 'show']);
Route::post('/newhostel', [HostelController::class, 'createhostel']);
Route::delete('/deletehostel/{id}', [HostelController::class, 'destroy']);

Route::post('/newroom/{id}', [RoomController::class, 'createroom']);

Route::post('/newbed/{id}', [BedController::class, 'createbed']);
Route::delete('/deletebed/{id}', [BedController::class, 'destroy']);


//protected routes can be accessed by all authenticated users

Route::group(['middleware' => ['auth:sanctum', 'ability:all']], function () {


    Route::post('/logout', [AuthController::class, 'logout']);
});


//protected routes can be accessed by  authenticated users who has student authorization

Route::group(['middleware' => ['auth:sanctum', 'ability:student']], function () {


    //Route::get('/showhostel/{id}', [StudentController::class, 'showhostel']);
    Route::post('/appeal', [AppealController::class, 'appeal']);
    Route::get('/showmyappeals', [StudentController::class, 'showstudentappeals']);
    Route::post('/changestudentpassword', [ChangePasswordController::class, 'changepassword']);
    Route::get('/messages', [MessageController::class, 'showmessages']);
    Route::delete('/deletemessage/{id}', [MessageController::class, 'destroy']);

    Route::get('/showmyhostel', [StudentController::class, 'showhostelinfo']);
});


//protected routes can be accessed by  authenticated users who has subwarden authorization

Route::group(['middleware' => ['auth:sanctum', 'ability:subwarden']], function () {


    Route::get('/showstudenthosteldetails', [SubWardenController::class, 'showstudenthosteldetails']);
    Route::post('/changesubwardenpassword', [ChangePasswordController::class, 'changepassword']);
    Route::get('/showsubwardenhostel', [SubWardenController::class, 'showmyhostel']);
});


//protected routes can be accessed by  authenticated users who has warden authorization

Route::group(['middleware' => ['auth:sanctum', 'ability:warden']], function () {




    Route::post('/changewardenpassword', [ChangePasswordController::class, 'changepassword']);
});







Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
