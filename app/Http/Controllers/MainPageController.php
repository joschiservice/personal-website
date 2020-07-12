<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GrahamCampbell\GitHub\Facades\GitHub;

class MainPageController extends Controller
{
    public function index(){
        $VTCManagerOrg = GitHub::organization()->show("VTCManager");
        return view("main", ["VTCManagerOrg" => $VTCManagerOrg]);
    }
}
