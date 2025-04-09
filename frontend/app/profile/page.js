import React from 'react';

const ProfilePage = () => {
    return (
        <div className="p-6 font-sans bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile Page</h1>
            <p className="text-lg text-gray-600 mb-6">Welcome to your profile page!</p>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Details</h2>
                <ul className="space-y-2">
                    <li>
                        <strong className="text-gray-800">Name:</strong> <span className="text-gray-600">John Doe</span>
                    </li>
                    <li>
                        <strong className="text-gray-800">Email:</strong> <span className="text-gray-600">john.doe@example.com</span>
                    </li>
                    <li>
                        <strong className="text-gray-800">Joined:</strong> <span className="text-gray-600">January 1, 2023</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfilePage;