<!doctype html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">

    <head>
        <meta charset="utf-8" />
        <title>{{ $page->title . " | " . config("app.name") }}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="{{ $page->description }}" name="description">
        <meta content="Ahmad Zaki Alawi" name="author">

        <link rel="icon" type="image/png" href="/favicon.png" />

        <meta property="og:title" content="{{ $page->title . " | " . config("app.name") }}" />
        <meta property="og:type" content=""website" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:description" content="{{ $page->description . " | " . config("app.name") }}" />

        <meta name="robots" content="index,follow">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="shortcut icon" href="{{ asset("assets/img/favicon.png") }}" type="image/png">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css" integrity="sha512-MqL4+Io386IOPMKKyplKII0pVW5e+kb+PI/I3N87G3fHIfrgNNsRpzIXEi+0MQC0sR9xZNqZqCYVcC61fL5+Vg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/2.3.0/alpine-ie11.min.js" integrity="sha512-Atu8sttM7mNNMon28+GHxLdz4Xo2APm1WVHwiLW9gW4bmHpHc/E2IbXrj98SmefTmbqbUTOztKl5PDPiu0LD/A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- grapesjs -->
        <link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
        <script src="https://unpkg.com/grapesjs"></script>
        <script src="https://unpkg.com/grapesjs-blocks-basic"></script>
        <script src="https://unpkg.com/grapesjs-blocks-flexbox"></script>
        <script src="https://unpkg.com/grapesjs-navbar"></script>
        <script src="https://unpkg.com/grapesjs-style-gradient"></script>
        <script src="https://unpkg.com/grapesjs-component-countdown"></script>
        <script src="https://unpkg.com/grapesjs-plugin-forms"></script>
        <script src="https://unpkg.com/grapesjs-style-filter"></script>
        <script src="https://unpkg.com/grapesjs-tabs"></script>
        <script src="https://unpkg.com/grapesjs-tooltip"></script>
        <script src="https://unpkg.com/grapesjs-custom-code"></script>
        <script src="https://unpkg.com/grapesjs-touch"></script>
        <script src="https://unpkg.com/grapesjs-parser-postcss"></script>
        <script src="https://unpkg.com/grapesjs-typed"></script>
        <script src="https://unpkg.com/grapesjs-style-bg"></script>
        <script src="https://unpkg.com/grapesjs-tui-image-editor"></script>
        <script src="https://unpkg.com/grapesjs-ui-suggest-classes"></script>
        <script src="https://unpkg.com/grapesjs-tailwind"></script>
        <script src="https://unpkg.com/grapesjs-preset-webpage@1.0.2"></script>

        <!-- Scripts -->
        <script src="https://cdn.tailwindcss.com"></script>
        @if ($page->isFullWidth == 1)
            <link rel="stylesheet" href="/build/assets/app-e9e3c3dc.css" />
            @vite(["resources/css/app.css", "resources/js/bootstrap.js"])
        @endif

        <style>
            .lc {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(232, 232, 232);
                z-index: 1;
            }

            .spn {
                width: 50px;
                padding: 8px;
                aspect-ratio: 1;
                border-radius: 50%;
                background: #196cca;
                --_m:
                    conic-gradient(#0000 10%, #000),
                    linear-gradient(#000 0 0) content-box;
                -webkit-mask: var(--_m);
                mask: var(--_m);
                -webkit-mask-composite: source-out;
                mask-composite: subtract;
                animation: s3 1s infinite linear;
            }

            @keyframes s3 {
                to {
                    transform: rotate(1turn)
                }
            }
        </style>
    </head>

    <body>
        @if ($page->isFullWidth == 1)
            <!-- NAVBAR -->
            <header>
                <div x-data="{ isOpen: false }" class="z-10 flex items-center justify-between w-full px-6 min-h-20 md:px-14 bg-frontend-base-100">
                    <div id="logo-nav" class="max-w-[15rem] text-frontend-dark font-semibold uppercase">
                        <a href="{{ route("article.index") }}" class="inline-flex items-center text-xl ">
                            <img src="{{ asset("assets/img/logoo.png") }}" alt="Logo" class="w-8 h-8">
                            <span id="web_name" class="px-2 ">{{ config("app.name") }}</span>
                        </a>
                    </div>

                    <div @click="isOpen = !isOpen" @click.away="isOpen = false" class="text-xl font-medium md:hidden" id="hamburger">
                        <button id="ham-btn">
                            <i class="ri-close-line" x-show="isOpen"></i>
                            <i class="ri-menu-line" x-show="!isOpen"></i>
                        </button>
                    </div>


                    <nav :class="[isOpen ? 'block' : 'hidden md:flex']" id="nav-menu"
                        class="absolute items-start md:items-center left-0 right-0 flex flex-col p-3 text-[1.1rem] md:w-[50rem] md:flex-wrap lg:w-full md:justify-end font-semibold md:relative top-20 md:flex-row md:opacity-100 md:top-0 md:p-0 text-frontend-dark uppercase bg-frontend-base-100 md:bg-transparent z-10">
                        @foreach (\App\Models\MenuItem::whereNull("parent_id")->with("children")->where("class", "header")->orderBy("order")->get() as $menuItem)
                            @if ($menuItem->children->isNotEmpty())
                                <div class="relative py-2 group">
                                    <a class="p-2 duration-300 cursor-pointer hover:text-frontend-accent">{{ $menuItem->name }}</a>
                                    <div class="absolute hidden py-1 mt-2 bg-white rounded shadow-lg min-w-48 left-4 group-hover:block">
                                        @foreach ($menuItem->children as $child)
                                            <a class="block px-4 py-2 text-gray-800 hover:bg-frontend-base-100 hover:text-frontend-accent" href="{{ $child->url }}">{{ $child->name }}</a>
                                        @endforeach
                                    </div>
                                </div>
                            @else
                                <a class="p-2 duration-300 hover:text-frontend-accent" href="{{ $menuItem->url }}">{{ $menuItem->name }}</a>
                            @endif
                        @endforeach

                        <div class="flex flex-col items-start gap-2 ml-2 md:items-center md:flex-row">
                            @auth
                                <a class="p-1 px-4 text-white duration-300 border-2 bg-frontend-accent border-frontend-accent rounded-xl hover:bg-frontend-light hover:text-frontend-accent" title="Dashboard" href="{{ route("admin.dashboard") }}"><i class="ri-function-line"></i></a>
                                <a class="p-1 px-4 duration-300 border-2 text-frontend-secondary border-frontend-secondary rounded-xl hover:border-frontend-error hover:text-frontend-error" title="Logout" href="javascript:void(0)"
                                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="ri-logout-box-r-line"></i></a>
                                <form id="logout-form" action="{{ route("logout") }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            @else
                                <a class="inline-flex p-1 px-4 duration-300 border-2 text-frontend-primary border-frontend-primary rounded-xl hover:bg-frontend-info hover:border-frontend-info hover:text-frontend-light" title="Login" href="{{ route("login") }}"><i class="ri-lock-2-fill"></i> Login</a>
            @endif
            </div>
            </nav>
            </div>

            </header>

            @endif

            <!-- Loader -->
            <div id="lspn" class="lc">
                <div class="spn"></div>
            </div>

            <main class="@if ($page->isFullWidth == 1) container w-full p-6 md:p-10 @endif">

                <div id="gjs" class="min-h-[60vh]"></div>
                <div id="gjscss"></div>

            </main>

            @if ($page->isFullWidth == 1)
                <!-- Footer -->
                <footer id="footer" class="flex items-end justify-center bg-frontend-base-100">
                    <div class="w-full">
                        <div class="px-1 py-16">
                            <div class="container mx-auto">
                                <div class="grid grid-cols-1 gap-6 xl:grid-cols-6 md:grid-cols-4">
                                    <div class="md:col-span-2">
                                        <a class="block mb-6 navbar-brand" href="{{ route("article.index") }}">
                                            <h2 id="title_web" class="text-3xl font-bold text-frontend-primary"></h2>
                                        </a>
                                        <p id="tagline_web" class="max-w-xs text-base font-medium text-frontend-muted"></p>

                                        <h3 class="mt-5 text-xl font-bold text-frontend-dark">Follow Us:</h3>
                                        <div class="flex gap-3 mt-4 font-normal text-frontend-dark">
                                            <a id="sosial_facebook" href="#"
                                                class="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"><i class="ri-facebook-fill"
                                                    target="_blank"></i>
                                            </a>
                                            <a id="sosial_twitter" href="#" class="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                                target="_blank"><i class="ri-twitter-x-fill"></i>
                                            </a>
                                            <a id="sosial_linkedin" href="#" class="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                                target="_blank"><i class="ri-linkedin-box-fill"></i>
                                            </a>
                                            <a id="sosial_instagram" href="#" class="flex items-center justify-center w-10 h-10 text-xl transition-all duration-500 bg-transparent border border-gray-300 rounded-md hover:border-frontend-primary hover:bg-frontend-primary hover:text-frontend-light"
                                                target="_blank"><i class="ri-instagram-fill"></i>
                                            </a>
                                        </div>
                                    </div>

                                    @if (\App\Models\MenuItem::where("class", "footer-a")->exists())
                                        <div class="flex flex-col gap-5">
                                            <h5 class="text-2xl font-bold ">About</h5>
                                            <div class="space-y-1 text-frontend-dark">
                                                @foreach (\App\Models\MenuItem::where("class", "footer-a")->orderBy("order")->get() as $menuItem)
                                                    <div>
                                                        <a href="{{ $menuItem->url }}" class="text-lg transition-all duration-300 hover:text-frontend-primary">{{ $menuItem->name }}</a>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    @endif

                                    @if (\App\Models\MenuItem::where("class", "footer-b")->exists())
                                        <div class="flex flex-col gap-5">
                                            <h5 class="text-2xl font-bold ">Blog</h5>
                                            <div class="space-y-1 text-frontend-dark">
                                                @foreach (\App\Models\MenuItem::where("class", "footer-b")->orderBy("order")->get() as $menuItem)
                                                    <div>
                                                        <a href="{{ $menuItem->url }}" class="text-lg transition-all duration-300 hover:text-frontend-primary">{{ $menuItem->name }}</a>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    @endif

                                    <div class="md:col-span-2">
                                        <div class="flex flex-col">
                                            <h5 class="mb-6 text-2xl font-bold">
                                                Contact Us
                                            </h5>
                                            <p id="web_email" class="text-base font-medium text-frontend-muted mt-2s"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="p-6 border-t border-gray-300">
                            <div class="container">
                                <div class="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
                                    <p class="text-base font-semibold text-frontend-muted">
                                        Copyright &copy;
                                        <script>
                                            document.write(new Date().getFullYear())
                                        </script>. All rights reserved.
                                    </p>

                                    <div class="space-x-4">
                                        <a href="/p/terms" class="text-base hover:text-frontend-primary text-frontend-muted">Terms Conditions</a>

                                        <a href="/p/privacy" class="text-base text-frontend-muted hover:text-frontend-primary">Privacy Policy</a>

                                        <a href="/p/contact" class="text-base text-frontend-muted hover:text-frontend-primary">Contact</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            @endif

            <script>
                const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');
                const projectId = '{{ $page->id }}';
                const loadProjectEndpoint = `{{ url('/dashboard/pages/${projectId}/load-project') }}`;
                const storeProjectEndpoint = `{{ url('/dashboard/pages/${projectId}/store-project') }}`;
            </script>
            <script>
                $.ajax({
                    type: "get",
                    url: loadProjectEndpoint,
                    dataType: "json",
                    success: function(response) {
                        const projectData = response.data;
                        // console.log(projectData);

                        const editor = grapesjs.init({
                            headless: true,
                            plugins: [
                                'gjs-blocks-basic',
                                'grapesjs-plugin-forms',
                                'grapesjs-component-countdown',
                                'grapesjs-tabs',
                                'grapesjs-custom-code',
                                'grapesjs-touch',
                                'grapesjs-navbar',
                                'grapesjs-style-gradient',
                                'grapesjs-parser-postcss',
                                'grapesjs-tooltip',
                                'grapesjs-tui-image-editor',
                                'grapesjs-typed',
                                'grapesjs-style-bg',
                                'grapesjs-ui-suggest-classes',
                                'grapesjs-style-filter',
                                'grapesjs-tailwind',
                                'grapesjs-preset-webpage',
                            ],
                        })
                        editor.loadProjectData(projectData);
                        const html = editor.getHtml();
                        const css = editor.getCss();

                        // console.log('html:', html);
                        // console.log('css:', css);
                        $("#gjs").append(html);
                        const style = document.createElement('style');
                        style.type = 'text/css';
                        style.innerHTML = css;
                        document.getElementsByTagName('head')[0].appendChild(style);
                        // $("#gjscss").append(css);
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });
            </script>
            <script>
                $(document).ready(function() {
                    $('#lspn').remove();
                });
            </script>
            <script>
                $.ajax({
                    type: "get",
                    url: "/meta-web",
                    dataType: "json",
                    success: function(response) {
                        console.log(response);
                        $("#web_name").text(response.web_name);
                        $("#title_web").append(response.title);
                        $("#tagline_web").append(response.tagline);
                        $("#web_email").append(response.email);
                        $("#sosial_facebook").attr("href", response.link_fb);
                        $("#sosial_instagram").attr("href", response.link_ig);
                        $("#sosial_linkedin").attr("href", response.link_linkedin);
                        $("#sosial_youtube").attr("href", response.link_youtube);
                        $("#sosial_twitter").attr("href", response.link_twitter);
                    },
                    error: function(error) {
                        console.error(error);
                    }
                });
            </script>

        </body>

    </html>
