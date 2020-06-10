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
                <a class="navbar-brand" href="#">Joschua Haß</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav mr-auto">
                        <a class="nav-item nav-link" href="#">Software</a>
                        <a class="nav-item nav-link" href="#">Equipement</a>
                        <a class="nav-item nav-link" href="#">Fotografie & Videoproduktion</a>
                    </div>
                    <div class="navbar-nav d-flex justify-content-end">
                            <a class="nav-item nav-link" href="#">Kontakt</a>
                    </div>
                </div>
            </div>
        </nav>
         @yield('content')
    </div>
</body>

</html>