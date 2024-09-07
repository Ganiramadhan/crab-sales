<x-Layout>
    <!-- Hero Section -->
    <section class="bg-gray-100 text-center py-16">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
                @if(Auth::check())
                    Welcome back, {{ Auth::user()->name }}!
                @else
                    Welcome to GaniPedia
                @endif
            </h1>
            <p class="text-lg text-gray-600 mb-8">
                @if(Auth::check())
                    We are glad to see you again.
                @else
                    The best platform for all your information needs.
                @endif
            </p>
            <a href="#" class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">Explore Now</a>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Posts Feature -->
                <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <img class="h-12 w-12 mr-4" src="https://www.pngarts.com/files/6/Red-Post-Box-PNG-Photo.png" alt="Posts Icon">
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Posts</h2>
                        <p class="text-gray-600">Discover and read the latest posts. Share your thoughts and stay updated with the community.</p>
                    </div>
                </div>
                <!-- Product Feature -->
                <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <img class="h-12 w-12 mr-4" src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png" alt="Product Icon">
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Product</h2>
                        <p class="text-gray-600">Explore our product catalog. Find the best products tailored to your needs and preferences.</p>
                    </div>
                </div>
                <!-- Movie Feature -->
                <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <img class="h-12 w-12 mr-4" src="https://th.bing.com/th/id/OIP.GyvuS3boOdFcdfXQQcXl8QHaHa?rs=1&pid=ImgDetMain" alt="Movie Icon">
                    <div>
                        <h2 class="text-xl font-semibold mb-4">Movie</h2>
                        <p class="text-gray-600">Watch the latest movies. Enjoy a wide range of genres and stay entertained.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</x-Layout>
