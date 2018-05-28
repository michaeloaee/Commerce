<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name') }}</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>

<main>

    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <a href="{{ route('home') }}" class="navbar-item">{{ config('app.name') }}</a>
            </div>
        </div>
    </nav>

    <div class="section">
        <div class="container">
            <div class="columns">
                <div id="categories-menu" class="column is-one-third">
                    <categories-menu/>
                </div>
                <div id="app" class="column is-two-thirds"></div>
            </div>
        </div>
    </div>

</main>

<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
