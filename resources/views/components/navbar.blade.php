<nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <img class="h-8 w-8" src="https://www.svgrepo.com/download/294201/coding-programming-language.svg" alt="Icon Logo">
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/" class="{{ Request::is('/') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                        <a href="/posts" class="{{ Request::is('posts') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} rounded-md px-3 py-2 text-sm font-medium">Posts</a>
                        <a href="/products" class="{{ Request::is('products') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} rounded-md px-3 py-2 text-sm font-medium">Product</a>
                        <a href="/movie" class="{{ Request::is('movie') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} rounded-md px-3 py-2 text-sm font-medium">Movie</a>
                    </div>
                </div>
            </div>
  
            <div class="hidden md:block">
                <div class="ml-4 flex items-center md:ml-6">
                    @auth
                    <span class="text-white px-3">Hello, {{ Auth::user()->name }}</span>
                    <form id="logout-form" method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="button" onclick="confirmLogout('logout-form')" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                            Logout
                        </button>
                    </form>
                    @endauth
                </div>
            </div>
  
            <div class="-mr-2 flex md:hidden">
                <button type="button" class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false" onclick="toggleMobileMenu()">
                    <span class="sr-only">Open main menu</span>
                    <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  
    <!-- Menu mobile -->
    <div class="md:hidden hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="/" class="{{ Request::is('/') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="/posts" class="{{ Request::is('posts') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} block rounded-md px-3 py-2 text-base font-medium">Posts</a>
            <a href="/products" class="{{ Request::is('products') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} block rounded-md px-3 py-2 text-base font-medium">Product</a>
            <a href="/movie" class="{{ Request::is('movie') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }} block rounded-md px-3 py-2 text-base font-medium">Movie</a>
  
            <!-- Menu Logout di Mobile -->
            @auth
            <span class="block text-white px-3">Hello, {{ Auth::user()->name }}</span>
            <form method="POST" action="{{ route('logout') }}" id="mobile-logout-form">
                @csrf
                <button type="button" onclick="confirmLogout('mobile-logout-form')" class="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
                    Logout
                </button>
            </form>
            @endauth
        </div>
    </div>
</nav>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    function confirmLogout(formId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4CAF50', 
            cancelButtonColor: '#FF5722',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById(formId).submit();
            }
        });
    }

    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !isHidden);
        mobileMenu.classList.toggle('block', isHidden);
    }
</script>
