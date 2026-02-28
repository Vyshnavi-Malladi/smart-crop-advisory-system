// import { ShoppingBag, Plus, Check } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import { useState } from 'react';

// export default function Store() {
//     const { t } = useTranslation();
//     const [cartCount, setCartCount] = useState(0);

//     const products = [
//         { id: 1, name: 'Premium Urea', price: '₹450', category: t('farm_store'), image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=400' },
//         { id: 2, name: 'DAP Fertilizer', price: '₹1200', category: t('farm_store'), image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400' },
//         { id: 3, name: 'Hybrid Rice Seeds', price: '₹800/kg', category: t('category_seeds'), image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400' },
//         { id: 4, name: 'Organic Pest Control', price: '₹350', category: t('category_pesticide'), image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&w=400' },
//         { id: 5, name: 'Potash 50kg', price: '₹950', category: t('category_fertilizer'), image: 'https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&w=400' },
//         { id: 6, name: 'Wheat Seeds High Yield', price: '₹60/kg', category: t('category_seeds'), image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400' },
//     ];

//     const addToCart = (name) => {
//         setCartCount(prev => prev + 1);
//         toast.success(`${name} ${t('added_to_cart')}`);
//     };

//     return (
//         <div className="space-y-8">
//             <div className="flex justify-between items-end">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800">{t('farm_store')}</h1>
//                     <p className="text-gray-500">{t('farm_store_desc')}</p>
//                 </div>
//                 <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 px-4">
//                     <ShoppingBag size={18} className="text-primary" />
//                     <span className="font-bold text-gray-700">{t('cart_items', { count: cartCount })}</span>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map(p => (
//                     <div key={p.id} className="glass-card bg-white p-0 overflow-hidden group">
//                         <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center relative">
//                             <img
//                                 src={p.image}
//                                 alt={p.name}
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
//                         </div>
//                         <div className="p-6">
//                             <span className="text-xs font-bold text-primary uppercase tracking-wider">{p.category}</span>
//                             <h3 className="text-lg font-bold text-gray-800 mt-1">{p.name}</h3>
//                             <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                                 <span className="text-xl font-bold text-gray-900">{p.price}</span>
//                                 <button
//                                     onClick={() => addToCart(p.name)}
//                                     className="p-2 bg-gray-900 text-white rounded-lg hover:bg-primary transition-colors active:scale-95"
//                                 >
//                                     <Plus size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }











import { useEffect, useState, useMemo } from "react";
import api from "../api";

export default function Store() {

    const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        api.get('/store/products')
            .then(res => setAllProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const addToCart = (item) => {
        setCart(prev => [...prev, item]);
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const handlePayment = async () => {

        const { data: order } = await api.post('/payment/create-order', {
            amount: totalAmount
        });

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Agri Store",
            description: "Fertilizer Purchase",
            order_id: order.id,

            handler: async function (response) {

                const verify = await api.post('/payment/verify-payment', response);

                if (verify.data.success) {
                    alert("Payment Successful 🎉");
                    setCart([]);
                    setShowCheckout(false);
                } else {
                    alert("Payment Failed ❌");
                }
            },

            prefill: {
                name: customer.name,
                email: customer.email,
                contact: customer.phone
            },

            theme: {
                color: "#16a34a"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="flex">

            {/* PRODUCTS */}
            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Agri Fertilizer Store
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allProducts.map(item => (
                        <div key={item._id}
                             className="border rounded-lg shadow p-4 hover:shadow-lg transition">

                            <img
                                src={`/assets/products/${item.image}`}
                                alt={item.name}
                                className="h-40 w-full object-cover rounded"
                            />

                            <h3 className="font-bold mt-3">{item.name}</h3>
                            <p className="text-green-600 font-bold">
                                ₹{item.price}
                            </p>

                            <button
                                onClick={() => addToCart(item)}
                                className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* CART */}
            <div className="w-80 bg-white shadow-lg p-6">
                <h2 className="text-xl font-bold">
                    Cart ({cart.length})
                </h2>

                {cart.map((item,i)=>(
                    <div key={i} className="border-b py-2">
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                    </div>
                ))}

                <p className="mt-4 font-bold">
                    Total: ₹{totalAmount}
                </p>

                {cart.length > 0 && (
                    <button
                        onClick={() => setShowCheckout(true)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                        Buy Now
                    </button>
                )}
            </div>

            {/* CHECKOUT MODAL */}
            {showCheckout && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96">

                        <h2 className="text-xl font-bold mb-4">Checkout</h2>

                        <input
                            placeholder="Name"
                            className="border p-2 w-full mb-2"
                            onChange={(e)=>setCustomer({...customer,name:e.target.value})}
                        />

                        <input
                            placeholder="Email"
                            className="border p-2 w-full mb-2"
                            onChange={(e)=>setCustomer({...customer,email:e.target.value})}
                        />

                        <input
                            placeholder="Phone"
                            className="border p-2 w-full mb-2"
                            onChange={(e)=>setCustomer({...customer,phone:e.target.value})}
                        />

                        <textarea
                            placeholder="Address"
                            className="border p-2 w-full mb-3"
                            onChange={(e)=>setCustomer({...customer,address:e.target.value})}
                        />

                        <button
                            onClick={handlePayment}
                            className="bg-green-600 text-white px-4 py-2 rounded w-full"
                        >
                            Proceed to Payment
                        </button>

                        <button
                            onClick={()=>setShowCheckout(false)}
                            className="mt-2 text-red-500 w-full"
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}