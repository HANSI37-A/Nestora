import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slice/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <div className="text-center p-10 font-serif text-[#A8A29E] tracking-wide text-sm animate-pulse">
          Retrieving order specifications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <div className="text-center p-10 font-sans text-red-800 tracking-wide text-xs max-w-md border border-red-200/30 bg-red-50/50 rounded">
          Error rendering context: {error}
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <div className="text-center p-10 font-serif text-[#A8A29E] tracking-wide text-sm">
          No matching Order Found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9F7F2] min-h-screen text-[#1A1A1A] font-sans antialiased select-none">
      <div className="max-w-7xl mx-auto pt-36 sm:pt-40 pb-16 px-4 sm:px-8 lg:px-12">
        
        {/* Page Header */}
        <div className="border-b border-[#A8A29E]/20 pb-6 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase block mb-1">Acquisition Log</span>
            <h1 className="text-4xl font-serif tracking-wide text-[#1A1A1A]">Commission Details</h1>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A8A29E] hover:text-[#1A1A1A] transition-colors self-start sm:self-auto"
          >
            ← Back to Sanctuary Dashboard
          </button>
        </div>

        {/* Layout Block Container */}
        <div className="bg-transparent border border-[#A8A29E]/20 p-6 sm:p-10 space-y-12">
          
          {/* Header Block Reference Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-[#A8A29E]/10">
            <div>
              <h3 className="font-serif text-lg tracking-wide text-[#1A1A1A]">
                Reference: <span className="font-sans font-light text-sm text-[#A8A29E]">#{orderDetails._id}</span>
              </h3>
              <p className="text-xs text-[#A8A29E] font-light mt-1 tracking-wide">
                Allocation Date: {new Date(orderDetails.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(orderDetails.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 border transition-all ${
                orderDetails.isPaid 
                  ? "border-emerald-600/20 bg-emerald-500/5 text-emerald-700" 
                  : "border-amber-600/20 bg-amber-500/5 text-amber-700"
              }`}>
                {orderDetails.isPaid ? "Settled Complete" : "Awaiting Settlement"}
              </span>
              <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 border transition-all ${
                orderDetails.isDelivered 
                  ? "border-emerald-600/20 bg-emerald-500/5 text-emerald-700" 
                  : "border-[#1A1A1A]/10 bg-[#1A1A1A]/5 text-[#1A1A1A]"
              }`}>
                {orderDetails.isDelivered ? "Dispatched Portfolio" : "Processing Distribution"}
              </span>
            </div>
          </div>

          {/* Logistics Split Section info details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-4 pb-1.5 border-b border-[#A8A29E]/10">
                Payment Context
              </h4>
              <div className="space-y-1.5 text-xs font-light tracking-wide text-[#1A1A1A]/80">
                <p>Settlement Pipeline: <span className="font-normal text-[#1A1A1A]">{orderDetails.paymentMethod || "Stripe"}</span></p>
                <p>Audit Verification: <span className="font-normal text-[#1A1A1A]">{orderDetails.isPaid ? "System Verified" : "Pending Handshake Check"}</span></p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-4 pb-1.5 border-b border-[#A8A29E]/10">
                Logistics & Consignee
              </h4>
              <div className="space-y-1.5 text-xs font-light tracking-wide text-[#1A1A1A]/80">
                <p>Collector Link: <span className="font-normal text-[#1A1A1A]">{orderDetails.user?.name} ({orderDetails.user?.email})</span></p>
                <p className="leading-relaxed">
                  Destination Allocation:{" "}
                  <span className="font-normal text-[#1A1A1A]">
                    {orderDetails.shippingAddress
                      ? `${orderDetails.shippingAddress.address || orderDetails.shippingAddress.line1 || ""}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`
                      : "Digital Architectural Handshake Fulfillment"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Table Architectural Portfolio Design Pieces */}
          <div className="pt-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#A8A29E] uppercase mb-5">
              Curated Masterpiece Breakdown
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1A1A1A]/10 text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
                    <th className="pb-3 font-semibold">Design Piece</th>
                    <th className="pb-3 font-semibold text-right">Unit Capital</th>
                    <th className="pb-3 font-semibold text-center">Qty Allocation</th>
                    <th className="pb-3 font-semibold text-right">Aggregate Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#A8A29E]/10 text-xs font-light tracking-wide">
                  {orderDetails.orderItems?.map((item) => (
                    <tr key={item.productId || item._id} className="group">
                      <td className="py-5 pr-4 flex items-center gap-4">
                        <div className="w-14 aspect-[4/5] bg-[#1A1A1A]/5 overflow-hidden shrink-0 border border-[#1A1A1A]/5">
                          <img src={item.image} alt="" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="min-w-0">
                          <Link 
                            to={`/product/${item.productId || item._id}`} 
                            className="font-serif text-sm text-[#1A1A1A] hover:text-[#6B543D] transition-colors truncate block pr-2"
                          > 
                            {item.name}
                          </Link>
                          {item.color && (
                            <span className="text-[10px] text-[#A8A29E] tracking-wide block mt-0.5">
                              Finish Variant: <span className="text-[#1A1A1A] font-normal">{item.color}</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-5 text-right font-light text-[#1A1A1A]/90">
                        ${item.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-5 text-center text-[#1A1A1A]/70 font-mono">
                        {item.quantity}
                      </td>
                      <td className="py-5 text-right font-medium text-[#1A1A1A]">
                        ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Statement Aggregate Balance Summary Bottom Block */}
          <div className="pt-8 border-t border-[#A8A29E]/20 flex justify-end">
            <div className="text-right space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">Total Due Capital</span>
              <h3 className="text-3xl font-serif font-medium text-[#1A1A1A]">
                ${orderDetails.totalPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;