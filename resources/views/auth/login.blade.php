<x-login-layout>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('');">
        <div class="max-w-md w-full">
            <div class="bg-white shadow-md rounded-lg px-8 py-6">
                <div class="flex justify-center mb-6" role="tablist">
                    <button id="login-tab" aria-controls="login-form" onclick="toggleForm('login')" class="w-1/2 text-center bg-gray-300 hover:bg-green-500 hover:text-white text-gray-800 font-bold py-2 px-4 rounded-t-lg" aria-selected="{{ session('form') !== 'register' ? 'true' : 'false' }}">Login</button>
                    <button id="register-tab" aria-controls="register-form" onclick="toggleForm('register')" class="w-1/2 text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-t-lg" aria-selected="{{ session('form') === 'register' ? 'true' : 'false' }}">Register</button>
                </div>

                <!-- Login Form -->
                <div id="login-form" class="{{ session('form') === 'register' ? 'hidden' : '' }}">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-500">Login</h2>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="login-email">Email</label>
                            <input id="login-email" type="email" name="email" value="{{ old('email') }}" placeholder="Enter your email" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="login-password">Password</label>
                            <input id="login-password" type="password" name="password" placeholder="Enter your password" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div>
                            <button type="submit" class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Register Form -->
                <div id="register-form" class="{{ session('form') === 'login' ? 'hidden' : '' }}">
                    <h2 class="text-2xl font-bold mb-6 text-center text-green-500">Register</h2>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="register-name">Name</label>
                            <input id="register-name" type="text" name="name" value="{{ old('name') }}" placeholder="Enter your name" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="register-email">Email</label>
                            <input id="register-email" type="email" name="email" value="{{ old('email') }}" placeholder="Enter your email" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="register-password">Password</label>
                            <input id="register-password" type="password" name="password" placeholder="Enter your password" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="register-password_confirmation">Confirm Password</label>
                            <input id="register-password_confirmation" type="password" name="password_confirmation" placeholder="Confirm your password" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div>
                            <button type="submit" class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function toggleForm(form) {
            const loginTab = $('#login-tab');
            const registerTab = $('#register-tab');
            const loginForm = $('#login-form');
            const registerForm = $('#register-form');

            if (form === 'login') {
                loginForm.removeClass('hidden');
                registerForm.addClass('hidden');
                toggleTabStyles(loginTab, registerTab);
            } else {
                loginForm.addClass('hidden');
                registerForm.removeClass('hidden');
                toggleTabStyles(registerTab, loginTab);
            }
        }

        function toggleTabStyles(activeTab, inactiveTab) {
            activeTab.addClass('bg-green-500').removeClass('bg-gray-300');
            inactiveTab.addClass('bg-gray-300').removeClass('bg-green-500');
        }

        $(document).ready(function() {
            @if(session('form') === 'register')
                toggleForm('register');
            @else
                toggleForm('login');
            @endif
        });
    </script>
</x-login-layout>
