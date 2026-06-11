import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 

const PayPalButton = ({ amount, checkoutId, onSuccess, onError }) => {
  const navigate = useNavigate(); 

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toFixed(2), 
          },
        },
      ],
    });
  };

  const handleOnApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      
      const userInfo = localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo")) 
        : null;
      const token = userInfo?.token;
      if (!token) throw new Error("Authentication token missing. Please sign back in.");

      const paymentData = {
        paymentStatus: "paid",
        paymentDetails: {
          transactionId: details.id,
          paymentGateway: "PayPal_Card",
          amount: parseFloat(details.purchase_units[0].amount.value),
          currency: details.purchase_units[0].amount.currency_code || "USD",
        },
      };

      
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        paymentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

     
      const finalizeResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (finalizeResponse.status === 201 || finalizeResponse.status === 200) {
     
        if (onSuccess) onSuccess(finalizeResponse.data);
        
       
        navigate("/profile"); 
      }
    } catch (error) {
      console.error("Payment pipeline sync failure:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to log transaction processing logs.";
      onError(errorMessage);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
        onError={(err) => {
          console.error("PayPal Script Gateway Trigger Failure:", err);
          onError("Gateway collection failure. Check account limits or currency formatting options.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;