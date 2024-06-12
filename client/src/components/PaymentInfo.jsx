import { useState } from "react";
import CardInformationForm from "./CardInformationForm";
import PayPalForm from "./PaypalForm";

const PaymentInfo = ({ handleSubmit }) => {
  const [isCardSelect, setIsCardSelect] = useState(true);
  const [isPaypalSelect, setIsPaypalSelect] = useState(false);

  const handleOption = (e) => {
    if (e.target.id === "card") {
      setIsCardSelect(true);
      setIsPaypalSelect(false);
    }

    if (e.target.id === "paypal") {
      setIsPaypalSelect(true);
      setIsCardSelect(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded shadow-md w-full lg:w-1/3 lg:ml-6 mt-6 lg:mt-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Payment Info.</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Payment Method</label>
        <div>
          <input
            onChange={handleOption}
            type="radio"
            id="card"
            name="paymentMethod"
            className="mr-2 cursor-pointer"
            defaultChecked
          />
          <label className="cursor-pointer" htmlFor="card">
            Card Payment
          </label>
        </div>
        <div>
          <input
            onChange={handleOption}
            type="radio"
            id="paypal"
            name="paymentMethod"
            className="mr-2 cursor-pointer"
          />
          <label className="cursor-pointer" htmlFor="paypal">
            PayPal
          </label>
        </div>
      </div>

      {isCardSelect && <CardInformationForm handleSubmit={handleSubmit} />}

      {isPaypalSelect && <PayPalForm handleSubmit={handleSubmit} />}
    </div>
  );
};

export default PaymentInfo;
