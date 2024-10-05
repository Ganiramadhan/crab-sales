import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import { FaNewspaper, FaFilm, FaBox, FaShoppingCart, FaUsers, FaChartLine, FaListUl } from 'react-icons/fa';

export default function Dashboard({ auth }) {
    const isAdmin = auth.user.role === 'admin';
    
    const Layout = isAdmin ? AuthenticatedLayout : UserLayout;
    const headerText = isAdmin ? 'Admin Dashboard' : 'User Dashboard';

    // useEffect(() => {
    //     console.log('Data User:', auth);
    // }, [])

    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-600 leading-tight">{headerText}</h2>}
        >
            <Head title={headerText} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {isAdmin ? 'Welcome Admin! You\'re logged in!' : 'Welcome User! You\'re logged in!'}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {isAdmin ? (
                                <>
                                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 p-4 flex items-center">
                                        <FaBox className="text-2xl text-gray-500 mr-4" />
                                        <div>
                                            <h3 className="text-xl font-semibold">Product</h3>
                                            <p className="text-gray-600">Manage and view products.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 p-4 flex items-center">
                                        <FaUsers className="text-2xl text-gray-500 mr-4" />
                                        <div>
                                            <h3 className="text-xl font-semibold">User</h3>
                                            <p className="text-gray-600">Manage and view user accounts.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 p-4 flex items-center">
                                        <FaShoppingCart className="text-2xl text-gray-500 mr-4" />
                                        <div>
                                            <h3 className="text-xl font-semibold">Transaction</h3>
                                            <p className="text-gray-600">View and manage transactions.</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 p-4 flex items-center">
                                        <FaNewspaper className="text-2xl text-gray-500 mr-4" />
                                        <div>
                                            <h3 className="text-xl font-semibold">Post</h3>
                                            <p className="text-gray-600">Manage and view blog posts.</p>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 p-4 flex items-center">
                                        <FaFilm className="text-2xl text-gray-500 mr-4" />
                                        <div>
                                            <h3 className="text-xl font-semibold">Movie</h3>
                                            <p className="text-gray-600">Explore and manage movies.</p>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200 p-4 flex items-center">
                                        <FaBox className="text-2xl text-gray-500 mr-4" />
                                        <div>
                                            <h3 className="text-xl font-semibold">Product</h3>
                                            <p className="text-gray-600">View and manage products.</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {isAdmin && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Sales Chart */}
                                    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center mb-4">
                                            <FaChartLine className="text-2xl text-gray-500 mr-4" />
                                            <h4 className="text-xl font-semibold">Sales Overview</h4>
                                        </div>
                                        <div className="h-40 bg-gray-200 rounded-lg"></div>
                                    </div>
                                    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center mb-4">
                                            <FaUsers className="text-2xl text-gray-500 mr-4" />
                                            <h4 className="text-xl font-semibold">User Statistics</h4>
                                        </div>
                                        <div className="h-40 bg-gray-200 rounded-lg"></div>
                                    </div>
                                    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center mb-4">
                                            <FaListUl className="text-2xl text-gray-500 mr-4" />
                                            <h4 className="text-xl font-semibold">Recent Orders</h4>
                                        </div>
                                        <ul className="list-disc pl-5">
                                            <li className="text-gray-600">Order #12345 - $250</li>
                                            <li className="text-gray-600">Order #12346 - $125</li>
                                            <li className="text-gray-600">Order #12347 - $75</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isAdmin && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">User Dashboard Overview</h3>
                                <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
                                    <div className="flex items-center mb-4">
                                        <FaBox className="text-2xl text-gray-500 mr-4" />
                                        <h4 className="text-xl font-semibold">Product Details</h4>
                                    </div>
                                    <div className="h-40 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
