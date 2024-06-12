import React from 'react';
import InputMask from 'react-input-mask';


const CardInformationForm = ({handleSubmit}) => {
    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Card Information</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label htmlFor="cardName" className="block text-gray-700">Name on Card</label>
                    <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        placeholder="Enter name on card"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
                    <input
                        id="cardNumber"
                        name="cardNumber"
                        type="number"
                        placeholder="Enter card number"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="expiryDate" className="block text-gray-700">Expiry Date</label>
                    <InputMask
                        mask="99/99"
                        maskChar=""
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cvv" className="block text-gray-700">CVV</label>
                    <input
                        id="cvv"
                        name="cvv"
                        type="number"
                        placeholder="Enter CVV"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CardInformationForm;
