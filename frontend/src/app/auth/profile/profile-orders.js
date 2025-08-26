const ProfileOrders = ({ customerData }) => {
    return (
        <div className="w-[100%]">
            <div className="flex justify-between mb-6">
                <h5 className="text-gray-700 font-bold text-[24px]">Orders</h5>
            </div>
            {customerData.orders.map((order, index) => (
                <div key={index} className="border-1 border-gray-200 rounded-[4px] mb-6 rounded-[16px]">
                    <div className="p-6 border-b-1 border-gray-200">
                        <div className="flex justify-between pb-3"><span className="font-bold flex gap-6"><span>Order: #{order.id}</span> <span className="font-bold">Total Amount: {order.totalAmount}</span></span><span className="font-bold">Status: {order.orderStatus}</span></div>
                        <div className="flex text-[14px] text-gray-500">
                            <div className="flex-1">
                                <p>Payment Method: <span className="font-bold">{order.paymentMethod}</span></p>
                                <p>Payment Status: <span className="font-bold">{order.paymentStatus}</span></p>
                                <p>Order Placed: <span className="font-bold">{order.publishedAt}</span></p>
                            </div>
                            <div className="flex-1 text-right">
                                {order?.shippingAddress?.address}, {order?.shippingAddress?.landmark}, {order?.shippingAddress?.zipcode}
                                ,{order?.shippingAddress?.city},{order?.shippingAddress?.state}, {order?.shippingAddress?.country}
                            </div>
                        </div>
                    </div>
                    {order.products.map((item, index) => (
                        <div key={index} className={`flex gap-4 p-6 border-gray-200 ${order.products.length - 1 === index ? "" : "border-b-1"}`}>
                            <img className="h-18 w-18 border-1 border-gray-200 rounded-[8px]" src={item.product.images[0].url} />
                            <div>
                                <h4>{item.product.title}</h4>
                                <p className="flex gap-4 text-[14px] text-gray-500"><span>Quantity: {item.quantity}</span> <span>Price: {item.product.price}</span> <span>Total: {item.product.price * item.quantity}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
export default ProfileOrders;