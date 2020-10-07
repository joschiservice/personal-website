<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GrahamCampbell\GitHub\Facades\GitHub;

class MainPageController extends Controller
{
    public function index(){
        $VTCManagerOrg = GitHub::organization()->show("VTCManager");
        $VCCOrg = GitHub::organization()->show("VisualCableCollective");
        $MyWebsiteRepo = GitHub::repository()->show("joschiservice", "personal-website");
        return view("main", ["VTCManagerOrg" => $VTCManagerOrg, "MyWebsiteRepo" => $MyWebsiteRepo, "VCCOrg" => $VCCOrg]);
    }
}
