import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

const MoviesPage = ({ title, movieData, user }) => {
    const [search, setSearch] = useState('');
    const [filteredMovies, setFilteredMovies] = useState(movieData);

    useEffect(() => {
        setFilteredMovies(
            movieData.filter(movie =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, movieData]);

    const Layout = user.role === 'admin' ? AuthenticatedLayout : UserLayout;

    return (
        <Layout
            user={user}
            header={user.role === 'admin' ? <h2 className="font-semibold text-xl text-gray-600 leading-tight">{title}</h2> : null}
        >
        <Head title={title} />
            <div className="container mx-auto px-4 py-6">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {filteredMovies.length > 0 ? (
                    <div id="movie-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredMovies.map(movie => (
                            <div
                                key={movie.id}
                                className="movie-card bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:translate-y-[-10px]"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover mb-4 rounded"
                                />
                                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                                <p className="text-gray-600 mb-2">Release Date: {movie.release_date}</p>
                                <div className="rating text-yellow-500 flex mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span
                                            key={i}
                                            className={`star ${i < Math.round(movie.vote_average / 2) ? 'filled' : ''}`}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600">Rating: {movie.vote_average}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </Layout>
    );
};

export default MoviesPage;
