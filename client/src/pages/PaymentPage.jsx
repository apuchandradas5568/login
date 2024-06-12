import React from 'react';
import PaymentInfo from '../components/PaymentInfo';





const ShoppingCart = () => {

const user = JSON.parse(localStorage.getItem('user')) || null;

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());


    const paymentData = {
      ...formValues,
      user_username: user.username
    }
  
  
    console.log(paymentData);
  
  
  }





    return (
        <div className="flex flex-col lg:flex-row justify-between ">
            <div className="flex-1 bg-white p-6 rounded-lg ">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Shopping Cart.</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-center">
                        <thead>
                            <tr>
                                <th className="py-2">Product</th>
                                <th className="py-2">Size</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Total Price</th>
                                <th className="py-2">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: 1, name: 'Sandqvist', size: '35 L', quantity: 2, price: 110.99, image: 'https://tse3.mm.bing.net/th?id=OIP.boExPkWk5G0RnSDl_Dk0WwHaFK&pid=Api&P=0&h=180' },
                                { id: 2, name: 'Sandqvist', size: '30 L', quantity: 1, price: 159.99, image: 'https://tse3.mm.bing.net/th?id=OIP.boExPkWk5G0RnSDl_Dk0WwHaFK&pid=Api&P=0&h=180' },
                                { id: 3, name: 'Sandqvist', size: '25 L', quantity: 1, price: 89.99, image: 'https://www.pickfu.com/blog/wp-content/uploads/2019/09/test3-489x1024.jpeg' },
                            ].map(product => (
                                <tr key={product.id}>
                                    <td className="flex items-center py-2">
                                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                                        <span className="ml-4">{product.name}</span>
                                    </td>
                                    <td className="py-2">
                                        <select value={product.size} className="border border-gray-300 rounded px-2 py-1">
                                            <option>{product.size}</option>
                                            {/* Add more sizes if needed */}
                                        </select>
                                    </td>
                                    <td className="py-2 flex
                                    justify-center items-start
                                    ">
                                        <button className="px-2">-</button>
                                        <input type="number" value={product.quantity} className="w-12 text-center border border-gray-300 rounded" readOnly />
                                        <button className="px-2">+</button>
                                    </td>
                                    <td className="">${product.price.toFixed(2)}</td>
                                    <td className=" ">
                                        <button className="text-red-500">X</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center text-center  mt-6">
  
                    <div className="">
                        <div className="text-sm">Subtotal: <span className="font-bold">$470.98</span></div>
                        <div className="text-sm">Shipping: <span className="font-bold">Free</span></div>
                        <div className="text-lg font-bold">Total: $470.98</div>
                    </div>
                </div>
            </div>
            <PaymentInfo handleSubmit={handleSubmit} />
        </div>
    );
};



export default ShoppingCart;
