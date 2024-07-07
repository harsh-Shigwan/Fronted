// ComingSoonPage.js

import React from 'react';

const ComingSoonPage = () => {
    return (
        <div className=" h-[380px] flex items-center justify-center bg-white">
            <div className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Coming Soon...</h1>
                <p className="text-lg text-gray-700 mb-8">We're cooking up something awesome! Stay tuned.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-900 hover:text-blue-600 transition duration-300 ease-in-out">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            {/* Add your social media icon here */}
                        </svg>
                    </a>
                    {/* Add more social media icons as needed */}
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPage;
