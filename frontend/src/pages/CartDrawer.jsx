








// import { useState } from "react";
// import { X } from "lucide-react";
// import api from "../api";
// import { useTranslation } from "react-i18next";

// export default function CartDrawer({ cart, setCart, isOpen, onClose }) {

// const { t } = useTranslation();

// const [showCheckout, setShowCheckout] = useState(false);

// const [customer, setCustomer] = useState({
// name: "",
// email: "",
// phone: "",
// address: "",
// city: "",
// state: "",
// pincode: ""
// });

// const [errors, setErrors] = useState({});

// const total = cart.reduce((sum, item) => {
// const price = Number(item.price) || 0;
// const qty = Number(item.quantity) || 1;
// return sum + price * qty;
// }, 0);

// const closeDrawer = () => {
// setShowCheckout(false);
// onClose();
// };

// const refreshCart = async () => {
// const { data } = await api.get("/cart");

// const cleaned = data.items
// .filter(i => i.productId)
// .map(i => ({
// _id: i.productId._id,
// name: i.productId.name,
// price: i.productId.price,
// quantity: i.quantity
// }));

// setCart(cleaned);
// };

// const increaseQty = async (item) => {
// await api.post("/cart/add", { productId: item._id });
// refreshCart();
// };

// const decreaseQty = async (item) => {
// await api.post("/cart/decrease", { productId: item._id });
// refreshCart();
// };

// const removeItem = async (item) => {
// await api.post("/cart/remove", { productId: item._id });
// refreshCart();
// };

// const validateForm = () => {

// let newErrors = {};

// if (!customer.name.trim())
// newErrors.name = t("name_required");

// if (!customer.email.trim())
// newErrors.email = t("email_required");
// else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
// newErrors.email = t("invalid_email");

// if (!customer.phone.trim())
// newErrors.phone = t("phone_required");
// else if (!/^\d{10}$/.test(customer.phone))
// newErrors.phone = t("phone_digits");

// if (!customer.address.trim())
// newErrors.address = t("address_required");

// if (!customer.city.trim())
// newErrors.city = t("city_required");

// if (!customer.state.trim())
// newErrors.state = t("state_required");

// if (!customer.pincode.trim())
// newErrors.pincode = t("pincode_required");
// else if (!/^\d{6}$/.test(customer.pincode))
// newErrors.pincode = t("pincode_digits");

// setErrors(newErrors);
// return Object.keys(newErrors).length === 0;

// };

// const handlePayment = async () => {

// if (!validateForm()) return;

// try {

// const { data: order } = await api.post("/payment/create-order", {
// amount: total
// });

// const options = {
// key: import.meta.env.VITE_RAZORPAY_KEY_ID,
// amount: order.amount,
// currency: "INR",
// name: "SmartCrop Store",
// description: "Agri Products",
// order_id: order.id,
// prefill: {
// name: customer.name,
// email: customer.email,
// contact: customer.phone
// },
// theme: { color: "#16a34a" },

// handler: async function (response) {

// const verify = await api.post("/payment/verify-payment", response);

// if (verify.data.success) {

// await api.post("/orders", {
// customer,
// cart,
// total,
// razorpay_order_id: verify.data.razorpay_order_id,
// razorpay_payment_id: verify.data.razorpay_payment_id
// });

// alert(t("payment_success"));

// setCart([]);
// await api.post("/cart/clear");
// await refreshCart();

// setCustomer({
// name: "",
// email: "",
// phone: "",
// address: "",
// city: "",
// state: "",
// pincode: ""
// });

// setShowCheckout(false);
// onClose();

// } else {
// alert(t("payment_failed"));
// }

// }
// };

// const rzp = new window.Razorpay(options);
// rzp.open();

// } catch (err) {
// console.error(err);
// alert(t("payment_error"));
// }

// };

// return (
// <>

// {/* {isOpen && (
// <div
// className="fixed top-16 left-0 right-0 bottom-0 bg-black/40 z-30"
// onClick={closeDrawer}
// />
// )} */}


// {/* {isOpen && (
// <div
//     className="fixed inset-0 bg-black/20 z-50"
//     onClick={closeDrawer}
// />
// )} */}

// <div
// className={`fixed top-0 right-0 h-screen w-[420px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${
// isOpen ? "translate-x-0" : "translate-x-full"
// }`}
// >

// {/* <div className="flex justify-between items-center px-6 py-4 border-b"> */}



// <div className="flex items-center justify-between px-6 py-5 border-b bg-white sticky top-0 z-10">

// <h2 className="text-lg font-semibold">
// 🛒 {t("cart")} ({cart.length})
// </h2>

// <button onClick={closeDrawer}>
// <X size={22} />
// </button>

// </div>

// {/* <div className="p-5 overflow-y-auto h-[55%]"> */}


// <div className="flex-1 overflow-y-auto p-6">

// {cart.length === 0 && (
// <p className="text-center text-gray-500 mt-10">
// {t("cart_empty")}
// </p>
// )}

// {cart.map((item) => (

// <div key={item._id} className="border-b py-4">

// <p className="font-medium">{item.name}</p>

// <div className="flex justify-between items-center mt-2">

// <div className="flex items-center gap-3">

// <button
// onClick={() => decreaseQty(item)}
// className="px-2 bg-gray-200 rounded hover:bg-gray-300"
// >
// -
// </button>

// <span className="font-semibold text-lg">
// {item.quantity}
// </span>

// <button
// onClick={() => increaseQty(item)}
// className="px-2 bg-gray-200 rounded hover:bg-gray-300"
// >
// +
// </button>

// </div>

// <div className="text-right">

// <p className="text-green-600 font-semibold">
// ₹{item.price * item.quantity}
// </p>

// <button
// onClick={() => removeItem(item)}
// className="text-red-500 text-xs"
// >
// {t("remove")}
// </button>

// </div>

// </div>

// </div>

// ))}

// </div>

// {cart.length > 0 && (

// <div className="border-t bg-white p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">

// <div className="flex justify-between mb-4">

// <p className="font-semibold">
// {t("total")}
// </p>

// <p className="text-xl font-bold text-green-600">
// ₹{total}
// </p>

// </div>

// {/* <button
// onClick={() => setShowCheckout(true)}
// className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl w-full"
// >

// {t("proceed_payment")}

// </button> */}




// <button
//     onClick={() => {
//         onClose();
//         setShowCheckout(true);
//     }}
//     className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl w-full"
// >
//     {t("proceed_payment")}
// </button>
// </div>

// )}

// </div>

// {showCheckout && (

// <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">


// <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8">

// <button
// className="absolute top-4 right-4"
// onClick={() => setShowCheckout(false)}
// >
// <X size={22}/>
// </button>

// <h2 className="text-2xl font-bold mb-6 text-green-600">
// {t("delivery_details")}
// </h2>

// <div className="grid gap-4">

// {Object.keys(customer).map(field => (

// <div key={field}>

// <input
// placeholder={t(field)}
// className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
// value={customer[field]}
// onChange={(e)=>
// setCustomer({
// ...customer,
// [field]: e.target.value
// })
// }
// />

// {errors[field] && (
// <p className="text-red-500 text-xs mt-1">
// {errors[field]}
// </p>
// )}

// </div>

// ))}

// <button
// onClick={handlePayment}
// className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-2"
// >

// {t("pay")} ₹{total}

// </button>

// </div>

// </div>

// </div>

// )}

// </>

// );

// }











// src/pages/CartDrawer.jsx

import { useEffect, useState } from "react";

import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Building2,
  MapPinned,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import api from "../api";
import { useTranslation } from "react-i18next";


export default function CartDrawer({
  cart,
  setCart,
  isOpen,
  onClose,
}) {

  const { t } = useTranslation();

  const [showCheckout, setShowCheckout] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});


  /* ============================================================
     TOTAL
  ============================================================ */

  const total = cart.reduce(
    (sum, item) => {

      const price =
        Number(item.price) || 0;

      const qty =
        Number(item.quantity) || 1;

      return sum + price * qty;

    },
    0
  );


  /* ============================================================
     CART COUNT
  ============================================================ */

  const cartCount = cart.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );


  /* ============================================================
     BROADCAST CART IMMEDIATELY
  ============================================================ */

  const broadcastCartUpdate = (
    latestCart
  ) => {

    window.dispatchEvent(
      new CustomEvent(
        "cart-updated",
        {
          detail: {
            cart: latestCart,
          },
        }
      )
    );

  };


  /* ============================================================
     CLOSE
  ============================================================ */

  const closeDrawer = () => {

    setShowCheckout(false);

    setErrors({});

    onClose();

  };


  /* ============================================================
     REFRESH CART
  ============================================================ */

  const refreshCart = async () => {

    try {

      const { data } =
        await api.get("/cart");

      const cleaned =
        (data?.items || [])
          .filter(
            (item) =>
              item.productId
          )
          .map((item) => ({
            _id:
              item.productId._id,

            name:
              item.productId.name,

            price:
              item.productId.price,

            quantity:
              item.quantity,
          }));

      setCart(cleaned);

      /*
        IMPORTANT:
        Send the latest cart directly to
        DashboardTopbar.
      */

      broadcastCartUpdate(
        cleaned
      );

      return cleaned;

    } catch (error) {

      console.error(
        "Failed to refresh cart:",
        error
      );

      return [];

    }

  };


  /* ============================================================
     INCREASE
  ============================================================ */

  const increaseQty = async (
    item
  ) => {

    try {

      await api.post(
        "/cart/add",
        {
          productId: item._id,
        }
      );

      await refreshCart();

    } catch (error) {

      console.error(error);

    }

  };


  /* ============================================================
     DECREASE
  ============================================================ */

  const decreaseQty = async (
    item
  ) => {

    try {

      await api.post(
        "/cart/decrease",
        {
          productId: item._id,
        }
      );

      await refreshCart();

    } catch (error) {

      console.error(error);

    }

  };


  /* ============================================================
     REMOVE
  ============================================================ */

  const removeItem = async (
    item
  ) => {

    try {

      await api.post(
        "/cart/remove",
        {
          productId: item._id,
        }
      );

      await refreshCart();

    } catch (error) {

      console.error(error);

    }

  };


  /* ============================================================
     VALIDATE
  ============================================================ */

  const validateForm = () => {

    let newErrors = {};


    if (!customer.name.trim()) {

      newErrors.name =
        t("name_required");

    }


    if (!customer.email.trim()) {

      newErrors.email =
        t("email_required");

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        customer.email
      )
    ) {

      newErrors.email =
        t("invalid_email");

    }


    if (!customer.phone.trim()) {

      newErrors.phone =
        t("phone_required");

    } else if (
      !/^\d{10}$/.test(
        customer.phone
      )
    ) {

      newErrors.phone =
        t("phone_digits");

    }


    if (!customer.address.trim()) {

      newErrors.address =
        t("address_required");

    }


    if (!customer.city.trim()) {

      newErrors.city =
        t("city_required");

    }


    if (!customer.state.trim()) {

      newErrors.state =
        t("state_required");

    }


    if (!customer.pincode.trim()) {

      newErrors.pincode =
        t("pincode_required");

    } else if (
      !/^\d{6}$/.test(
        customer.pincode
      )
    ) {

      newErrors.pincode =
        t("pincode_digits");

    }


    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );

  };


  /* ============================================================
     INPUT
  ============================================================ */

  const handleInputChange = (
    field,
    value
  ) => {

    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {

      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));

    }

  };


  /* ============================================================
     PAYMENT
  ============================================================ */

  const handlePayment = async () => {

    if (!validateForm()) {
      return;
    }

    try {

      setProcessing(true);

      const {
        data: order,
      } = await api.post(
        "/payment/create-order",
        {
          amount: total,
        }
      );


      if (!window.Razorpay) {

        alert(
          "Payment gateway is not available. Please try again."
        );

        setProcessing(false);

        return;

      }


      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          order.amount,

        currency:
          "INR",

        name:
          "SmartCrop Store",

        description:
          "Agri Products",

        order_id:
          order.id,

        prefill: {

          name:
            customer.name,

          email:
            customer.email,

          contact:
            customer.phone,

        },

        theme: {
          color: "#159447",
        },


        handler:
          async function (
            response
          ) {

            try {

              const verify =
                await api.post(
                  "/payment/verify-payment",
                  response
                );


              if (
                verify.data.success
              ) {

                await api.post(
                  "/orders",
                  {
                    customer,
                    cart,
                    total,

                    razorpay_order_id:
                      verify.data
                        .razorpay_order_id,

                    razorpay_payment_id:
                      verify.data
                        .razorpay_payment_id,
                  }
                );


                alert(
                  t("payment_success")
                );


                await api.post(
                  "/cart/clear"
                );


                setCart([]);

                /*
                  Immediately reset
                  topbar badge to 0.
                */

                broadcastCartUpdate(
                  []
                );


                setCustomer({
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  pincode: "",
                });

                setErrors({});

                setShowCheckout(false);

                onClose();

              } else {

                alert(
                  t("payment_failed")
                );

              }

            } catch (error) {

              console.error(
                "Payment verification error:",
                error
              );

              alert(
                t("payment_error")
              );

            } finally {

              setProcessing(false);

            }

          },

      };


      const rzp =
        new window.Razorpay(
          options
        );


      rzp.on(
        "payment.failed",
        () => {

          alert(
            t("payment_failed")
          );

          setProcessing(false);

        }
      );


      rzp.open();

    } catch (error) {

      console.error(
        "Payment error:",
        error
      );

      alert(
        t("payment_error")
      );

      setProcessing(false);

    }

  };


  /* ============================================================
     LOCK SCROLL
  ============================================================ */

  useEffect(() => {

    if (
      isOpen ||
      showCheckout
    ) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }

    return () => {
      document.body.style.overflow =
        "";
    };

  }, [
    isOpen,
    showCheckout,
  ]);


  /* ============================================================
     ESCAPE
  ============================================================ */

  useEffect(() => {

    const handleEscape = (
      event
    ) => {

      if (
        event.key === "Escape"
      ) {

        if (showCheckout) {

          setShowCheckout(false);

        } else if (isOpen) {

          closeDrawer();

        }

      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [
    isOpen,
    showCheckout,
  ]);


  /* ============================================================
     FIELDS
  ============================================================ */

  const fields = [
    {
      key: "name",
      label: t("name"),
      placeholder: t("name"),
      icon: User,
      type: "text",
    },
    {
      key: "email",
      label: t("email"),
      placeholder: t("email"),
      icon: Mail,
      type: "email",
    },
    {
      key: "phone",
      label: t("phone"),
      placeholder: t("phone"),
      icon: Phone,
      type: "tel",
    },
    {
      key: "address",
      label: t("address"),
      placeholder: t("address"),
      icon: MapPin,
      type: "text",
    },
    {
      key: "city",
      label: t("city"),
      placeholder: t("city"),
      icon: Building2,
      type: "text",
    },
    {
      key: "state",
      label: t("state"),
      placeholder: t("state"),
      icon: MapPinned,
      type: "text",
    },
    {
      key: "pincode",
      label: t("pincode"),
      placeholder: t("pincode"),
      icon: MapPinned,
      type: "text",
    },
  ];


  return (
    <>
      {/* OVERLAY */}

      {isOpen && !showCheckout && (
        <div
          className="
            fixed
            inset-0
            bg-[#10251c]/30
            backdrop-blur-[2px]
            z-[9998]
          "
          onClick={closeDrawer}
        />
      )}


      {/* ========================================================
          CART DRAWER
      ======================================================== */}

      <div
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-full
          sm:w-[430px]
          bg-white
          z-[9999]
          flex
          flex-col
          shadow-[-15px_0_50px_rgba(0,0,0,0.12)]
          transform
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* HEADER */}

        <div
          className="
            shrink-0
            px-5
            sm:px-6
            py-5
            border-b
            border-[#e8eee9]
            bg-white
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#eaf7ef]
                  flex
                  items-center
                  justify-center
                "
              >
                <ShoppingCart
                  size={21}
                  className="text-[#159447]"
                />
              </div>

              <div>

                <h2
                  className="
                    text-[18px]
                    font-bold
                    text-[#234638]
                  "
                >
                  {t("cart")}
                </h2>

                <p
                  className="
                    text-[11px]
                    text-[#94a39c]
                    mt-0.5
                  "
                >
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "item"
                    : "items"}{" "}
                  in your cart
                </p>

              </div>

            </div>

            <button
              onClick={closeDrawer}
              className="
                w-9
                h-9
                rounded-xl
                bg-[#f5f8f6]
                border
                border-[#e7ede9]
                flex
                items-center
                justify-center
                text-[#71827a]
                hover:bg-red-50
                hover:border-red-100
                hover:text-red-500
                transition
              "
            >
              <X size={18} />
            </button>

          </div>

        </div>


        {/* CONTENT */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-5
            sm:px-6
            py-5
            bg-[#fafcfb]
          "
        >

          {cart.length === 0 && (

            <div
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-[#edf8f1]
                  flex
                  items-center
                  justify-center
                "
              >
                <ShoppingBag
                  size={34}
                  className="text-[#8bae9b]"
                />
              </div>

              <h3
                className="
                  mt-5
                  text-[17px]
                  font-bold
                  text-[#345346]
                "
              >
                {t("cart_empty")}
              </h3>

              <p
                className="
                  mt-2
                  text-[12px]
                  text-[#8b9b94]
                  max-w-[260px]
                "
              >
                Add agricultural products
                from the store and they
                will appear here.
              </p>

            </div>

          )}


          {cart.length > 0 && (

            <div className="space-y-3">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="
                    bg-white
                    border
                    border-[#e6eee9]
                    rounded-2xl
                    p-4
                    shadow-[0_3px_14px_rgba(22,73,48,0.04)]
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        min-w-0
                      "
                    >

                      <div
                        className="
                          w-11
                          h-11
                          rounded-xl
                          bg-[#f0f8f3]
                          border
                          border-[#e2eee6]
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <Package
                          size={19}
                          className="text-[#57906e]"
                        />
                      </div>

                      <div className="min-w-0">

                        <p
                          className="
                            text-[13px]
                            font-bold
                            text-[#345145]
                            truncate
                          "
                        >
                          {item.name}
                        </p>

                        <p
                          className="
                            text-[11px]
                            text-[#98a69f]
                            mt-1
                          "
                        >
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString(
                            "en-IN"
                          )}{" "}
                          / unit
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        removeItem(item)
                      }
                      className="
                        w-8
                        h-8
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-[#a2aea8]
                        hover:bg-red-50
                        hover:text-red-500
                        transition
                      "
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>


                  <div
                    className="
                      mt-4
                      pt-3
                      border-t
                      border-[#edf2ef]
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-1
                        bg-[#f5f8f6]
                        border
                        border-[#e5ece8]
                        rounded-xl
                        p-1
                      "
                    >

                      <button
                        onClick={() =>
                          decreaseQty(item)
                        }
                        className="
                          w-7
                          h-7
                          rounded-lg
                          bg-white
                          border
                          border-[#e3ebe6]
                          flex
                          items-center
                          justify-center
                          text-[#5e7469]
                          hover:text-[#159447]
                          transition
                        "
                      >
                        <Minus size={13} />
                      </button>

                      <span
                        className="
                          min-w-[28px]
                          text-center
                          text-[12px]
                          font-bold
                          text-[#40594e]
                        "
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item)
                        }
                        className="
                          w-7
                          h-7
                          rounded-lg
                          bg-[#159447]
                          flex
                          items-center
                          justify-center
                          text-white
                          hover:bg-[#117c3b]
                          transition
                        "
                      >
                        <Plus size={13} />
                      </button>

                    </div>

                    <div className="text-right">

                      <p
                        className="
                          text-[14px]
                          font-bold
                          text-[#159447]
                        "
                      >
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p
                        className="
                          text-[10px]
                          text-[#98a69f]
                        "
                      >
                        Subtotal
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* FOOTER */}

        {cart.length > 0 && (

          <div
            className="
              shrink-0
              border-t
              border-[#e5ece8]
              bg-white
              px-5
              sm:px-6
              pt-4
              pb-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
              "
            >

              <span
                className="
                  text-[12px]
                  text-[#819189]
                "
              >
                {t("total")}
              </span>

              <span
                className="
                  text-[21px]
                  font-bold
                  text-[#159447]
                "
              >
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            <button
              onClick={() => {

                setErrors({});

                setShowCheckout(true);

              }}
              className="
                w-full
                h-[46px]
                rounded-xl
                bg-[#159447]
                hover:bg-[#117c3b]
                text-white
                font-semibold
                text-[13px]
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >

              <CreditCard size={17} />

              {t("proceed_payment")}

              <ArrowRight size={16} />

            </button>

          </div>

        )}

      </div>


      {/* ========================================================
          CHECKOUT MODAL
      ======================================================== */}

      {showCheckout && (

        <div
          className="
            fixed
            inset-0
            bg-[#10251c]/55
            backdrop-blur-[4px]
            flex
            items-center
            justify-center
            p-4
            z-[10000]
          "
          onClick={() => {

            if (!processing) {
              setShowCheckout(false);
            }

          }}
        >

          <div
            className="
              relative
              bg-white
              w-full
              max-w-[580px]
              max-h-[92vh]
              overflow-hidden
              rounded-[24px]
              shadow-[0_25px_80px_rgba(0,0,0,0.2)]
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className="
                px-6
                sm:px-7
                py-5
                border-b
                border-[#e8eee9]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-[#eaf7ef]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <MapPin
                      size={21}
                      className="text-[#159447]"
                    />
                  </div>

                  <div>

                    <h2
                      className="
                        text-[18px]
                        font-bold
                        text-[#29483b]
                      "
                    >
                      {t("delivery_details")}
                    </h2>

                    <p
                      className="
                        text-[11px]
                        text-[#94a29c]
                        mt-0.5
                      "
                    >
                      Enter your delivery information
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    !processing &&
                    setShowCheckout(false)
                  }
                  disabled={processing}
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#f5f8f6]
                    flex
                    items-center
                    justify-center
                    text-[#71827a]
                    hover:bg-red-50
                    hover:text-red-500
                    transition
                  "
                >
                  <X size={18} />
                </button>

              </div>

            </div>


            <div
              className="
                max-h-[calc(92vh-90px)]
                overflow-y-auto
                px-6
                sm:px-7
                py-6
                bg-[#fafcfb]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-[#edf8f1]
                  border
                  border-[#dceee2]
                  rounded-xl
                  px-4
                  py-3
                  mb-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <ShoppingCart
                    size={16}
                    className="text-[#159447]"
                  />

                  <span
                    className="
                      text-[12px]
                      font-semibold
                      text-[#426051]
                    "
                  >
                    {cartCount}{" "}
                    {cartCount === 1
                      ? "item"
                      : "items"}
                  </span>
                </div>

                <span
                  className="
                    text-[16px]
                    font-bold
                    text-[#159447]
                  "
                >
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                "
              >

                {[
                  {
                    key: "name",
                    label: t("name"),
                    icon: User,
                    type: "text",
                  },
                  {
                    key: "email",
                    label: t("email"),
                    icon: Mail,
                    type: "email",
                  },
                  {
                    key: "phone",
                    label: t("phone"),
                    icon: Phone,
                    type: "tel",
                  },
                  {
                    key: "address",
                    label: t("address"),
                    icon: MapPin,
                    type: "text",
                    full: true,
                  },
                  {
                    key: "city",
                    label: t("city"),
                    icon: Building2,
                    type: "text",
                  },
                  {
                    key: "state",
                    label: t("state"),
                    icon: MapPinned,
                    type: "text",
                  },
                  {
                    key: "pincode",
                    label: t("pincode"),
                    icon: MapPinned,
                    type: "text",
                  },
                ].map((field) => {

                  const Icon = field.icon;

                  return (
                    <div
                      key={field.key}
                      className={
                        field.full
                          ? "sm:col-span-2"
                          : ""
                      }
                    >

                      <label
                        className="
                          block
                          text-[11px]
                          font-semibold
                          text-[#536a60]
                          mb-1.5
                        "
                      >
                        {field.label}
                      </label>

                      <div className="relative">

                        <Icon
                          size={15}
                          className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-[#94a49c]
                          "
                        />

                        <input
                          type={field.type}
                          value={
                            customer[
                              field.key
                            ]
                          }
                          onChange={(e) =>
                            handleInputChange(
                              field.key,
                              e.target.value
                            )
                          }
                          disabled={processing}
                          placeholder={
                            field.label
                          }
                          className="
                            w-full
                            h-[44px]
                            border
                            border-[#dfe8e3]
                            rounded-xl
                            pl-10
                            pr-3
                            text-[12px]
                            text-[#40594e]
                            bg-white
                            outline-none
                            focus:border-[#159447]
                            focus:ring-2
                            focus:ring-[#159447]/10
                          "
                        />

                      </div>

                      {errors[field.key] && (
                        <p
                          className="
                            text-[10px]
                            text-red-500
                            mt-1
                          "
                        >
                          {errors[field.key]}
                        </p>
                      )}

                    </div>
                  );

                })}

              </div>


              <button
                onClick={handlePayment}
                disabled={processing}
                className="
                  w-full
                  h-[48px]
                  rounded-xl
                  mt-6
                  bg-[#159447]
                  hover:bg-[#117c3b]
                  text-white
                  font-bold
                  text-[13px]
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  disabled:opacity-60
                "
              >

                {processing ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard
                      size={17}
                    />

                    {t("pay")} ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </>
                )}

              </button>


              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  mt-4
                "
              >

                <CheckCircle2
                  size={13}
                  className="text-[#159447]"
                />

                <span
                  className="
                    text-[10px]
                    text-[#8c9b95]
                  "
                >
                  Secure payment and encrypted checkout
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}