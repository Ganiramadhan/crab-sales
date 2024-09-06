<x-Layout>
    <h1 class="text-3xl font-bold mb-4">{{ $title }}</h1>

    <input type="text" id="search" placeholder="Search movies..." class="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">

    @if(!empty($movieData) && count($movieData) > 0)
        <div id="movie-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            @foreach($movieData as $movie)
                <div class="movie-card bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:translate-y-[-10px]">
                    <img src="https://image.tmdb.org/t/p/w500{{ $movie['poster_path'] }}" alt="{{ $movie['title'] }}" class="w-full h-64 object-cover mb-4 rounded">
                    <h2 class="text-xl font-semibold mb-2">{{ $movie['title'] }}</h2>
                    <p class="text-gray-600 mb-2">Release Date: {{ $movie['release_date'] }}</p>
                    <div class="rating text-yellow-500 flex mb-2">
                        @php
                            $rating = round($movie['vote_average'] / 2); // Convert to scale of 5 stars
                        @endphp
                        @for($i = 1; $i <= 5; $i++)
                            <span class="star {{ $i <= $rating ? 'filled' : '' }}">&#9733;</span>
                        @endfor
                    </div>
                    <p class="text-gray-600">Rating: {{ $movie['vote_average'] }}</p>
                </div>
            @endforeach
        </div>
    @else
        <p>No movies found.</p>
    @endif

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#search').on('input', function() {
                var query = $(this).val().toLowerCase();
                $('.movie-card').each(function() {
                    var title = $(this).find('h2').text().toLowerCase();
                    $(this).toggle(title.indexOf(query) !== -1);
                });
            });
        });
    </script>

</x-Layout>
