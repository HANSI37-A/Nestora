import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{"client-id": "AXTFXmPWS2vA57BMCVbE4Y_G-L2m7T6SVLMZRwrKgO52qyaHIEQrvgY1NE4GePfyVv2STLxAFBzxQ316"}}>
      <PayPalButtons
        style={{layout: "vertical"}}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{amount: {value: amount}}]
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton;