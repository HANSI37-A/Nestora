import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import axiosInstance from "../utils/axiosInstance"; 

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  const { id: checkoutId } = useParams();

  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!checkoutId) {
        setError("Missing valid order confirmation tracking context references.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const localUserInfo = localStorage.getItem("userInfo");
        const token = localUserInfo ? JSON.parse(localUserInfo).token : null;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        const { data } = await axiosInstance.get(`/checkout/${checkoutId}`, config);
        setCheckoutData(data);
      } catch (err) {
        console.error("Order details mapping resolution crash:", err);
        setError(err.response?.data?.message || "Failed to retrieve order confirmation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [checkoutId]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    const options = { month: 'short', day: '2-digit' };
    
    const deliveryStart = orderDate.toLocaleDateString('en-US', options);
    orderDate.setDate(orderDate.getDate() + 6);
    const deliveryEnd = orderDate.toLocaleDateString('en-US', options);
    
    return `${deliveryStart} - ${deliveryEnd}`;
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-stone-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm uppercase tracking-widest text-stone-500 font-medium">Verifying Acquisition Clearance...</p>
        </div>
      </div>
    );
  }

  if (error || !checkoutData) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans px-4">
        <div className="max-w-md w-full bg-[#FAF7F2] border border-[#EFEAE2] p-8 text-center space-y-6">
          <h2 className="text-2xl font-serif text-gray-900">Verification Postponed</h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">{error || "The requested order verification footprint could not be parsed."}</p>
          <button 
            onClick={() => navigate("/")}
            className="w-full bg-black text-white text-xs font-medium uppercase tracking-widest py-4 hover:bg-stone-800 transition-colors"
          >
            Return to Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] print:bg-white pt-36 sm:pt-40 pb-16 px-4 font-sans select-none antialiased">
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Top Header */}
        <div className="text-center mb-16 print:hidden">
          <h1 className="text-5xl md:text-6xl font-serif font-normal text-gray-900 tracking-tight mb-4">
            Gratitude for your acquisition
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
            Your order is being curated by our artisans and will be prepared for white-glove delivery shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          
          {/* Left & Center Main Column: Details */}
          <div className="lg:col-span-2 space-y-8 w-full">
            
            {/* Primary Content Container */}
            <div className="p-6 md:p-10 bg-[#FAF7F2] print:bg-white border border-[#EFEAE2] print:border-0 rounded-none pb-12 w-full shadow-sm">
              
              {/* Meta details segment */}
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 border-b border-[#EFEAE2] pb-6 mb-8 w-full">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">
                    Order Identifier
                  </span>
                  <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 break-all">
                    #{checkoutData?._id}
                  </h2>
                </div>
                <div className="sm:text-right w-full sm:w-auto">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">
                    Acquisition Date
                  </span>
                  <p className="text-sm font-medium text-gray-800">
                    {checkoutData?.createdAt 
                      ? new Date(checkoutData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>

              {/* Checkout Line Items Segment */}
              <div className="space-y-6 mb-8 division-y division-[#EFEAE2]">
                {checkoutData?.checkoutItems?.map((item, index) => (
                  <div key={item.productId || item._id || index} className="flex flex-col sm:flex-row items-start gap-5 pb-6 border-b border-[#EFEAE2] last:border-0 last:pb-0 w-full">
                    <div className="w-24 h-24 shrink-0 bg-stone-100 overflow-hidden border border-[#EFEAE2]">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover filter brightness-95" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full space-y-1">
                      <h4 className="text-base font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Finish: <span className="text-gray-600 font-medium">{item.color || "Standard Choice"}</span>
                      </p>
                      <p className="text-xs font-semibold text-gray-400 pt-1 tracking-widest uppercase">
                        Quantity: <span className="text-gray-900 font-mono">{String(item.quantity || 1).padStart(2, '0')}</span>
                      </p>
                    </div>
                    
                    <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end w-full sm:w-auto shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-dashed border-[#EFEAE2]">
                      <p className="text-sm font-semibold text-gray-900 font-mono">
                        ${Number(item.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-2 py-1 rounded-none border border-emerald-600/10">
                        Status: Curating
                      </span>
                    </div>
                  </div>            
                ))}
              </div>

              {/* Logistics Status Indicator Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#EFEAE2] pt-6 pb-2 mb-10 text-[11px] uppercase tracking-widest font-medium text-stone-700 w-full">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-pulse inline-block"></span>
                  <span className="font-semibold text-stone-500">Awaiting Logistics</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <span className="tracking-wide">Estimated Arrival: <span className="font-bold text-stone-900">{typeof calculateEstimatedDelivery === 'function' ? calculateEstimatedDelivery(checkoutData?.createdAt) : "Pending"}</span></span>
                </div>
              </div>

              {/* Shipping Metadata Subgrid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#EFEAE2] w-full">
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Payment Architecture
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-6 bg-gray-900 text-white rounded-none flex items-center justify-center text-[8px] font-bold tracking-wider shrink-0 select-none">
                      CARD
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">Visa ending in 4242</p>
                      <p className="text-[10px] text-gray-400">Encrypted Transaction</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Delivery Recipient
                  </h4>
                  <p className="text-sm font-serif font-semibold text-gray-900">
                    {checkoutData?.shippingAddress?.firstName || "Customer"} {checkoutData?.shippingAddress?.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {checkoutData?.shippingAddress?.streetAddress || checkoutData?.shippingAddress?.address || "N/A"},<br />
                    {checkoutData?.shippingAddress?.city || ""}, {checkoutData?.shippingAddress?.postalCode || ""} {checkoutData?.shippingAddress?.country || ""}
                  </p>
                </div>
              </div>

            </div>

            {/* Actions Option Row */}
            <div className="flex items-center gap-x-8 gap-y-2 px-2 print:hidden text-xs font-medium tracking-wide">
              <button 
                onClick={handleDownloadReceipt}
                className="text-gray-900 underline underline-offset-4 hover:text-stone-500 transition-colors cursor-pointer"
              >
                Download Invoice
              </button>
            </div>

          </div>

          {/* Right Financial Sticky Summary Card */}
          <div className="space-y-4 lg:sticky lg:top-8 w-full print:w-full">
            <div className="bg-black text-white p-6 md:p-8 rounded-none shadow-xl print:shadow-none print:border print:border-gray-200 print:text-black print:bg-white w-full">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-6 pb-2 border-b border-stone-800 print:border-gray-200">
                Financial Summary
              </h3>
              
              <div className="space-y-4 text-xs font-light text-stone-300 print:text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-mono text-white print:text-black">
                    ${(() => {
                      const baseTotal = Number(checkoutData?.totalPrice || 0);
                      const calculatedSub = baseTotal - 245 - 465.10;
                      return (calculatedSub > 0 ? calculatedSub : baseTotal * 0.85).toFixed(2);
                    })()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping (White Glove)</span>
                  <span className="font-mono text-white print:text-black">$245.00</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-stone-800 print:border-gray-200">
                  <span>Tax</span>
                  <span className="font-mono text-white print:text-black">$465.10</span>
                </div>
                
                <div className="flex justify-between items-baseline pt-4 text-white print:text-black">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl md:text-3xl font-serif font-semibold tracking-tight font-mono">
                    ${Number(checkoutData?.totalPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;