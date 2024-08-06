<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config("app.name", "Laravel") }}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="description" content="This is a page specific description" />
        {{-- <meta name="keywords" content="resume, personal, portfolio, cv, ahmad zaki alawi" /> --}}
        <meta name="author" content="Ahmad Zaki Alawi" />

        {{-- <meta property="og:title" content="Ahmad Zaki Alawi" /> --}}
        {{-- <meta property="og:type" content="website" /> --}}
        {{-- <meta property="og:url" content="https://ahmadzaki.me" /> --}}
        {{-- <meta property="og:image" content="https://ahmadzaki.me/favicon.png" /> --}}
        {{-- <meta property="og:description" content="This is a page specific description" /> --}}

        {{-- <meta name="robots" content="index, follow" /> --}}


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(["resources/js/app.jsx", "resources/js/Pages/{$page["component"]}.jsx"])
        @inertiaHead
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>

</html>
