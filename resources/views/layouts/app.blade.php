<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Joschua Haß</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top transparent pt-4">
            <div class="container">
                <a class="navbar-brand" href="#">{{__('navbar.title')}}</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="{{__('navbar.toggler')}}">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <div class="navbar-nav mr-auto">
                        <a class="nav-item nav-link" href="#">{{__('navbar.software')}}</a>
                        <a class="nav-item nav-link" href="#">{{__('navbar.equipement')}}</a>
                        <a class="nav-item nav-link" href="#">{{__('navbar.photo_and_video')}}</a>
                    </div>
                    <div class="navbar-nav d-flex justify-content-end">
                            <a class="nav-item nav-link" href="#">{{__('navbar.contact')}}</a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="toast m-0" data-autohide="false" style="position: fixed; bottom: 15px; right: 15px;" data-autohide="false" id="web_repo_info">
            <div class="toast-header">
                <i class="fab fa-github-square pr-1"></i>
              <strong class="mr-auto">{{__('webrepoinfo.author')}}</strong>
              <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                {{__('webrepoinfo.content_p1')}} <a href="https://github.com/joschiservice/my-personal-website">{{__('webrepoinfo.content_p2')}}</a>
            </div>
        </div>
         @yield('content')
    </div>
</body>

</html>