import { useEffect, useState, useMemo } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= UPDATE STATUS =================
 const updateStatus = async (id, status) => {
  try {

    await api.put(`/orders/status/${id}`, {
      status
    });

    toast.success("Status Updated");

    fetchOrders();

  } catch (err) {

    console.error(err);

    toast.error("Update Failed");

  }
};
  // ================= FILTERED DATA =================
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {

      const email = order.customer?.email || "";

      const matchesSearch =
        email.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" || order.status === statusFilter;

      return matchesSearch && matchesStatus;

    });
  }, [orders, search, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-green-600">
        Admin Orders Management
      </h1>

      {/* ================= SEARCH & FILTER ================= */}
      <div className="flex gap-4 mb-6">

        <input
          placeholder="Search by Email or Order ID"
          className="border p-3 rounded-lg w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {filteredOrders.length === 0 ? (
          <p className="text-center py-20 text-gray-400">
            No orders found
          </p>
        ) : (

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="border-t">

                <td className="p-4 text-sm">{order._id}</td>

                <td className="p-4">
                  <p className="font-medium">
                    {order.customer?.name || "Customer"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {order.customer?.email || "No Email"}
                  </p>
                </td>

                <td className="p-4 font-semibold">
                  ₹{order.totalAmount}
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border p-2 rounded-lg"
                  >
                    <option>Paid</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td className="p-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        )}

      </div>

    </div>
  );
}