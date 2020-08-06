<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PhotoController extends Controller
{
    public function index(){
        $InstagramRequestResponse = Http::get('https://instagram.com/_joschi03_/?__a=1');
        $InstaPhotos = $InstagramRequestResponse;
        return view("photos", ["InstaPhotos" => $InstaPhotos]);
    }
}
