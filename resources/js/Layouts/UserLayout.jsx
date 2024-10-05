import React, { useEffect } from 'react';
import Navbar from '@/Components/NavUser';
import Footer from '@/Components/Footer';

const UserLayout = ({ user, header, children }) => {
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar user={user} />

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="flex-grow">{children}</main>
            <Footer/>
        </div>
    );
};

export default UserLayout;
