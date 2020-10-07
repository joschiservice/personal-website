@extends('layouts.app')
@section('content')
    <div class="parallax background-1 d-flex justify-content-center align-items-center">
        <div class="container animate__animated animate__fadeInDown">
            <h1 class="display-4 font-weight-bold">Joschua Haß</h1>
            <h3>{{__('home.hero_subtitle')}}</h3>
        </div>
    </div>
    <section class="main-content">
        <div class="container">
            <div class="about-me">
                <div class="container py-5 text-white">
                    <h1>{{__('home.about_me_title')}}</h1>
                    <p class="h5 pt-3">{{__('home.about_me_text')}}</p>
                </div>
            </div>
            <hr>
            <div class="my-projects">
                <div class="container py-5 text-white">
                    <h1>{{__('home.my_projects_title')}}</h1>
                    <p class="h5 pt-3">{{__('home.my_projects_text')}}</p>
                    <p class="text-muted">{{__('home.my_projects_remark')}}</p>
                    <div class="row">
                        @if(!empty($VTCManagerOrg))
                        <div class="col-lg pt-3">
                            <div class="card card-custom shadow-lg rounded" style="width: 100%;">
                                <div class="card-img-top project-thumb" style="background-image: url('{{$VTCManagerOrg["avatar_url"]}}')"></div>
                                <div class="card-body">
                                  <h5 class="card-title">{{$VTCManagerOrg["login"]}}</h5>
                                  <p class="card-text">{{$VTCManagerOrg["description"]}}</p>
                                  <a href="{{$VTCManagerOrg["html_url"]}}" target="_blank" class="btn btn-primary"><i class="fas fa-share-square"></i> Projekt auf Github ansehen</a>
                                </div>
                            </div>
                        </div>
                        @endif
                        @if(!empty($MyWebsiteRepo))
                        <div class="col-lg pt-3">
                            <div class="card card-custom shadow-lg rounded" style="width: 100%;height: 100%;">
                                <div class="card-img-top project-thumb" style="background-image: url('https://repository-images.githubusercontent.com/271281822/00124f80-f398-11ea-95cd-0ba4c29195e1')"></div>
                                <div class="card-body">
                                  <h5 class="card-title">{{$MyWebsiteRepo["name"]}}</h5>
                                  <p class="card-text">{{$MyWebsiteRepo["description"]}}</p>
                                  <a href="{{$MyWebsiteRepo["html_url"]}}" class="btn btn-primary"><i class="fas fa-share-square"></i> Repository auf Github ansehen</a>
                                </div>
                            </div>
                        </div>
                        @endif
                        @if(!empty($VCCOrg))
                        <div class="col-lg pt-3">
                            <div class="card card-custom shadow-lg rounded" style="width: 100%;">
                                <div class="card-img-top project-thumb" style="background-image: url('{{$VCCOrg["avatar_url"]}}')"></div>
                                <div class="card-body">
                                  <h5 class="card-title">{{$VCCOrg["login"]}}</h5>
                                  <p class="card-text">{{$VCCOrg["description"]}}</p>
                                  <a href="{{$VCCOrg["html_url"]}}" target="_blank" class="btn btn-primary"><i class="fas fa-share-square"></i> Projekt auf Github ansehen</a>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
