import React from 'react';

const PayPalForm = ({handleSubmit}) => {
    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">PayPal Information</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label htmlFor="paypalEmail" className="block text-gray-700">PayPal Email</label>
                    <input
                        id="paypalEmail"
                        name="paypalEmail"
                        type="email"
                        placeholder="Enter your PayPal email"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="paypalAccountName" className="block text-gray-700">Account Holder Name</label>
                    <input
                        id="paypalAccountName"
                        name="paypalAccountName"
                        type="text"
                        placeholder="Enter account holder's name"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PayPalForm;
