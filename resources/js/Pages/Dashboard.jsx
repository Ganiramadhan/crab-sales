import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const isAdmin = auth.user.role === 'admin';

    return (
        <>
            {isAdmin ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
                >
                    <Head title="Admin Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">Welcome Admin! You're logged in!</div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            ) : (
                <UserLayout>
                    <Head title="User Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">Welcome User! You're logged in!</div>
                            </div>
                        </div>
                    </div>
                </UserLayout>
            )}
        </>
    );
}
