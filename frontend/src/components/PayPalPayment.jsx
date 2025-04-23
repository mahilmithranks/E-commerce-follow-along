import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import axios from "axios";

const PayPalPayment = ({ amount, onSuccess, onError, onCancel }) => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();

      // Call your backend API to update order status
      await axios.post(
        "http://localhost:8080/api/orders/payment-success",
        {
          orderId: data.orderID,
          paymentId: order.id,
          paymentStatus: "COMPLETED",
        },
        { withCredentials: true }
      );

      onSuccess(order);
      toast.success("Payment completed successfully!");
    } catch (error) {
      console.error("Payment error:", error);
      onError(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={() => {
          onCancel();
          toast.error("Payment cancelled");
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
          toast.error("Payment failed. Please try again.");
        }}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
        }}
      />
    </div>
  );
};

export default PayPalPayment;
