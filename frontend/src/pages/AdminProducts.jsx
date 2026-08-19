// import { useEffect, useState } from "react";
// import api from "../api";
// import { Plus, Trash2, Pencil, X } from "lucide-react";
// import { toast } from "react-toastify";

// export default function AdminProducts() {

//   const [products, setProducts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const emptyForm = {
//     name: "",
//     price: "",
//     category: "fertilizer",
//     type: "",
//     nutrient: "",
//     seedType: "",
//     stock: "",
//     image: "",
//     description: ""
//   };

//   const [form, setForm] = useState(emptyForm);

//   // ================= FETCH PRODUCTS =================
//   const fetchProducts = async () => {
//     try {
//       const { data } = await api.get("/store/products");
//       setProducts(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ================= HANDLE SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editing) {
//         const { data } = await api.put(`/store/products/${editing}`, form);

//         // 🔥 Optimistic update
//         setProducts(prev =>
//           prev.map(p => p._id === editing ? data : p)
//         );

//         toast.success("Product updated successfully");
//       } else {
//         const { data } = await api.post("/store/products", form);

//         // 🔥 Add instantly to UI
//         setProducts(prev => [data, ...prev]);

//         toast.success("Product added successfully");
//       }

//       setForm(emptyForm);
//       setEditing(null);

//     } catch (err) {
//       toast.error("Action failed");
//     }

//     setLoading(false);
//   };

//   // ================= DELETE =================
//   const deleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;

//     try {
//       await api.delete(`/store/products/${id}`);

//       // 🔥 Remove instantly from UI
//       setProducts(prev => prev.filter(p => p._id !== id));

//       toast.success("Product deleted successfully");
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   // ================= EDIT =================
//   const editProduct = (product) => {
//     setEditing(product._id);

//     // 🔥 Clean mapping (avoid unwanted fields)
//     setForm({
//       name: product.name || "",
//       price: product.price || "",
//       category: product.category || "fertilizer",
//       type: product.type || "",
//       nutrient: product.nutrient || "",
//       seedType: product.seedType || "",
//       stock: product.stock || "",
//       image: product.image || "",
//       description: product.description || ""
//     });

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const cancelEdit = () => {
//     setEditing(null);
//     setForm(emptyForm);
//   };

//   return (
//     <div className="max-w-7xl mx-auto">

//       <h1 className="text-3xl font-bold mb-8 text-green-600">
//         Admin Product Management
//       </h1>

//       {/* ================= ADD / EDIT FORM ================= */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow mb-10 grid grid-cols-2 gap-4"
//       >
//         <input
//           placeholder="Product Name"
//           className="border p-3 rounded-lg"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           className="border p-3 rounded-lg"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           required
//         />

//         <select
//           className="border p-3 rounded-lg"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         >
//           <option value="fertilizer">Fertilizer</option>
//           <option value="seed">Seed</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Stock"
//           className="border p-3 rounded-lg"
//           value={form.stock}
//           onChange={(e) => setForm({ ...form, stock: e.target.value })}
//         />

//         <input
//           placeholder="Image filename"
//           className="border p-3 rounded-lg"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />

//         <input
//           placeholder="Description"
//           className="border p-3 rounded-lg col-span-2"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <div className="col-span-2 flex gap-4">
//           <button
//             disabled={loading}
//             className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition flex justify-center items-center gap-2"
//           >
//             <Plus size={18} />
//             {editing ? "Update Product" : "Add Product"}
//           </button>

//           {editing && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="flex-1 bg-gray-400 text-white py-3 rounded-xl hover:bg-gray-500 transition flex justify-center items-center gap-2"
//             >
//               <X size={18} />
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* ================= PRODUCT TABLE ================= */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4">Name</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Stock</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map(product => (
//               <tr key={product._id} className="border-t hover:bg-gray-50 transition">
//                 <td className="p-4">{product.name}</td>
//                 <td className="p-4 font-semibold text-green-600">
//                   ₹{product.price}
//                 </td>
//                 <td className="p-4">{product.stock}</td>
//                 <td className="p-4 capitalize">{product.category}</td>

//                 <td className="p-4 flex gap-4">
//                   <button
//                     onClick={() => editProduct(product)}
//                     className="text-blue-600 hover:scale-110 transition"
//                   >
//                     <Pencil size={18} />
//                   </button>

//                   <button
//                     onClick={() => deleteProduct(product._id)}
//                     className="text-red-600 hover:scale-110 transition"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }









// import { useEffect, useState } from "react";
// import api from "../api";
// import { Plus, Trash2, Pencil, X } from "lucide-react";
// import { toast } from "react-toastify";

// export default function AdminProducts() {

//   const [products, setProducts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const emptyForm = {
//     name: "",
//     price: "",
//     category: "fertilizer",
//     type: "",
//     nutrient: "",
//     seedType: "",
//     stock: "",
//     image: "",
//     description: ""
//   };

//   const [form, setForm] = useState(emptyForm);

//   // ================= FETCH PRODUCTS =================
//   const fetchProducts = async () => {
//     try {
//       const { data } = await api.get("/store/products");
//       setProducts(data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ================= HANDLE SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editing) {
//         const { data } = await api.put(`/store/products/${editing}`, form);

//         setProducts(prev =>
//           prev.map(p => p._id === editing ? data : p)
//         );

//         toast.success("Product updated successfully");
//       } else {
//         const { data } = await api.post("/store/products", form);

//         setProducts(prev => [data, ...prev]);

//         toast.success("Product added successfully");
//       }

//       setForm(emptyForm);
//       setEditing(null);

//     } catch (err) {
//       toast.error("Action failed");
//     }

//     setLoading(false);
//   };

//   // ================= DELETE =================
//   const deleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;

//     try {
//       await api.delete(`/store/products/${id}`);

//       setProducts(prev => prev.filter(p => p._id !== id));

//       toast.success("Product deleted successfully");
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   // ================= EDIT =================
//   const editProduct = (product) => {
//     setEditing(product._id);

//     setForm({
//       name: product.name || "",
//       price: product.price || "",
//       category: product.category || "fertilizer",
//       type: product.type || "",
//       nutrient: product.nutrient || "",
//       seedType: product.seedType || "",
//       stock: product.stock || "",
//       image: product.image || "",
//       description: product.description || ""
//     });

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const cancelEdit = () => {
//     setEditing(null);
//     setForm(emptyForm);
//   };

//   return (
//     <div className="max-w-7xl mx-auto">

//       <h1 className="text-3xl font-bold mb-8 text-green-600">
//         Admin Product Management
//       </h1>

//       {/* ================= ADD / EDIT FORM ================= */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow mb-10 grid grid-cols-2 gap-4"
//       >
//         <input
//           placeholder="Product Name"
//           className="border p-3 rounded-lg"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           className="border p-3 rounded-lg"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//           required
//         />

//         <select
//           className="border p-3 rounded-lg"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         >
//           <option value="fertilizer">Fertilizer</option>
//           <option value="seed">Seed</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Stock"
//           className="border p-3 rounded-lg"
//           value={form.stock}
//           onChange={(e) => setForm({ ...form, stock: e.target.value })}
//         />

//         <input
//           placeholder="Image filename"
//           className="border p-3 rounded-lg"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />

//         <input
//           placeholder="Description"
//           className="border p-3 rounded-lg col-span-2"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <div className="col-span-2 flex gap-4">
//           <button
//             disabled={loading}
//             className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition flex justify-center items-center gap-2"
//           >
//             <Plus size={18} />
//             {editing ? "Update Product" : "Add Product"}
//           </button>

//           {editing && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="flex-1 bg-gray-400 text-white py-3 rounded-xl hover:bg-gray-500 transition flex justify-center items-center gap-2"
//             >
//               <X size={18} />
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* ================= PRODUCT TABLE ================= */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">

//         {products.length === 0 ? (
//           <p className="text-center py-20 text-gray-400">
//             No products available
//           </p>
//         ) : (

//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4">Name</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Stock</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map(product => (

//               <tr key={product._id} className="border-t hover:bg-gray-50 transition">

//                 <td className="p-4">{product?.name}</td>

//                 <td className="p-4 font-semibold text-green-600">
//                   ₹{product?.price}
//                 </td>

//                 <td className="p-4">

//                   {product?.stock < 5 ? (
//                     <span className="text-red-600 font-semibold">
//                       ⚠ {product.stock}
//                     </span>
//                   ) : (
//                     product.stock
//                   )}

//                 </td>

//                 <td className="p-4 capitalize">
//                   {product?.category}
//                 </td>

//                 <td className="p-4 flex gap-4">

//                   <button
//                     onClick={() => editProduct(product)}
//                     className="text-blue-600 hover:scale-110 transition"
//                   >
//                     <Pencil size={18} />
//                   </button>

//                   <button
//                     onClick={() => deleteProduct(product._id)}
//                     className="text-red-600 hover:scale-110 transition"
//                   >
//                     <Trash2 size={18} />
//                   </button>

//                 </td>

//               </tr>

//             ))}
//           </tbody>
//         </table>

//         )}

//       </div>

//     </div>
//   );
// }











import { useEffect, useState } from "react";
import api from "../api";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    name: "",
    price: "",
    category: "fertilizer",
    type: "",
    nutrient: "",
    seedType: "",
    stock: "",
    image: "",
    description: ""
  };

  const [form, setForm] = useState(emptyForm);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/store/products");
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing) {
        const { data } = await api.put(`/store/products/${editing}`, form);

        setProducts(prev =>
          prev.map(p => p._id === editing ? data : p)
        );

        toast.success("Product updated successfully");
      } else {
        const { data } = await api.post("/store/products", form);

        setProducts(prev => [data, ...prev]);

        toast.success("Product added successfully");
      }

      setForm(emptyForm);
      setEditing(null);

    } catch (err) {
      toast.error("Action failed");
    }

    setLoading(false);
  };

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/store/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= EDIT =================
  const editProduct = (product) => {
    setEditing(product._id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "fertilizer",
      type: product.type || "",
      nutrient: product.nutrient || "",
      seedType: product.seedType || "",
      stock: product.stock || "",
      image: product.image || "",
      description: product.description || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-green-600">
        Admin Product Management
      </h1>

      {/* ================= ADD / EDIT FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-10 grid grid-cols-2 gap-4"
      >
        <input
          placeholder="Product Name"
          className="border p-3 rounded-lg"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 rounded-lg"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <select
          className="border p-3 rounded-lg"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="fertilizer">Fertilizer</option>
          <option value="seed">Seed</option>
        </select>

        <input
          type="number"
          placeholder="Stock"
          className="border p-3 rounded-lg"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <input
          placeholder="Image filename"
          className="border p-3 rounded-lg"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          placeholder="Description"
          className="border p-3 rounded-lg col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="col-span-2 flex gap-4">
          <button
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition flex justify-center items-center gap-2"
          >
            <Plus size={18} />
            {editing ? "Update Product" : "Add Product"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 bg-gray-400 text-white py-3 rounded-xl hover:bg-gray-500 transition flex justify-center items-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ================= PRODUCT TABLE ================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {products.length === 0 ? (
          <p className="text-center py-20 text-gray-400">
            No products available
          </p>
        ) : (

        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (

              <tr key={product._id} className="border-t hover:bg-gray-50 transition">

                <td className="p-4">{product?.name}</td>

                <td className="p-4 font-semibold text-green-600">
                  ₹{product?.price}
                </td>

                {/* ✅ UPDATED STOCK DISPLAY */}
                <td className="p-4">

                  {product?.stock === 0 && (
                    <span className="text-red-600 font-bold">
                      ❌ Out of Stock
                    </span>
                  )}

                  {product?.stock > 0 && product?.stock <= 2 && (
                    <span className="text-orange-500 font-semibold">
                      ⚠ Low ({product.stock})
                    </span>
                  )}

                  {product?.stock > 2 && (
                    <span className="text-green-600 font-semibold">
                      {product.stock}
                    </span>
                  )}

                </td>

                <td className="p-4 capitalize">
                  {product?.category}
                </td>

                <td className="p-4 flex gap-4">

                  <button
                    onClick={() => editProduct(product)}
                    className="text-blue-600 hover:scale-110 transition"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:scale-110 transition"
                  >
                    <Trash2 size={18} />
                  </button>

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