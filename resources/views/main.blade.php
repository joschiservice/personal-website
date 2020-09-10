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
                    <div class="pt-3">
                        <div class="row">
                            @if(!empty($VTCManagerOrg))
                            <div class="col-lg">
                                <div class="card card-custom shadow-lg rounded" style="width: 100%;">
                                    <img class="card-img-top" src="{{$VTCManagerOrg["avatar_url"]}}" alt="VTCManager avatar">
                                    <div class="card-body">
                                      <h5 class="card-title">{{$VTCManagerOrg["login"]}}</h5>
                                      <p class="card-text">{{$VTCManagerOrg["description"]}}</p>
                                      <a href="{{$VTCManagerOrg["html_url"]}}" class="btn btn-primary"><i class="fas fa-share-square"></i> Projekt auf Github ansehen</a>
                                    </div>
                                </div>
                            </div>
                            @endif
                            @if(!empty($MyWebsiteRepo))
                            <div class="col-lg">
                                <div class="card card-custom shadow-lg rounded" style="width: 100%;">
                                    <img class="card-img-top" src="https://repository-images.githubusercontent.com/271281822/00124f80-f398-11ea-95cd-0ba4c29195e1" alt="My websites' avatar">
                                    <div class="card-body">
                                      <h5 class="card-title">{{$MyWebsiteRepo["name"]}}</h5>
                                      <p class="card-text">{{$MyWebsiteRepo["description"]}}</p>
                                      <a href="{{$MyWebsiteRepo["html_url"]}}" class="btn btn-primary"><i class="fas fa-share-square"></i> Repository auf Github ansehen</a>
                                    </div>
                                </div>
                            </div>
                            @endif
                            <div class="col-lg">
                                <div class="card card-custom shadow-lg rounded" style="width: 100%;">
                                    <img class="card-img-top" src="https://images.hdqwalls.com/wallpapers/2019-tesla-model-y-4k-or.jpg" alt="Card image cap">
                                    <div class="card-body">
                                      <h5 class="card-title">Card title</h5>
                                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                      <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
