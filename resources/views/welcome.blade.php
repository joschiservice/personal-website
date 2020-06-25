@extends('layouts.app')
@section('content')
    <div class="parallax background-1 d-flex justify-content-center align-items-center">
        <div class="container animate__animated animate__fadeInDown">
            <h1 class="display-4 font-weight-bold">Joschua Haß</h1>
            <h3>{{__('home.hero_subtitle')}}</h3>
        </div>
    </div>
    <div class="about-me">
        <div class="container py-5 text-white">
            <h1 class="title">{{__('home.about_me_title')}}</h1>
            <p class="h5 text pt-3">{{__('home.about_me_text')}}</p>
        </div>
    </div>
@endsection