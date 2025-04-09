"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary

export default function Navbar() {

    const {logout,user } = useAuth(); // Assuming you have a logout function in your auth context
    //if(user===null) return null; // If user is not logged in, don't render the navbar
    
    return (
        <nav className="bg-white shadow-lg py-4 px-6 fixed w-full top-0 z-50 ">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    MyApp
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/classify" className="text-gray-700 hover:text-blue-500 transition">
                            Classify
                        </Link>
                    </li>
                    <li>
                        <Link href="/history" className="text-gray-700 hover:text-blue-500 transition">
                            History
                        </Link>
                    </li>
                    <li>
                        <Link href="/analyze" className="text-gray-700 hover:text-blue-500 transition">
                            Analyze
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" className="text-gray-700 hover:text-blue-500 transition">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <div className="p-0 m-0 flex justify-center">
                            <button
                                onClick={logout}
                                className="py-1 px-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
