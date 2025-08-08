import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editPrices, setEditPrices] = useState({});
  const [editMode, setEditMode] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
      fetchProducts();
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [products, sortOrder, filterText]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8081/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const applyFilterAndSort = () => {
    let result = [...products];

    // Filter
    if (filterText.trim()) {
      result = result.filter(
        (p) =>
          p.productId.toString().includes(filterText) ||
          p.productName.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.productId - b.productId;
      } else {
        return b.productId - a.productId;
      }
    });

    setFilteredProducts(result);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePriceChange = (productId, newPrice) => {
    setEditPrices((prev) => ({
      ...prev,
      [productId]: newPrice,
    }));
  };

  const toggleEdit = (productId) => {
    setEditMode((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    const product = products.find((p) => p.productId === productId);
    if (product) {
      setEditPrices((prev) => ({
        ...prev,
        [productId]: product.productPrice.toString(),
      }));
    }
  };

  const handleSavePrice = async (productId) => {
    const updatedPrice = editPrices[productId];

    if (updatedPrice === undefined || updatedPrice === "" || isNaN(updatedPrice)) {
      console.warn("Invalid price value");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/product/update-price/${productId}`, {
        productPrice: parseFloat(updatedPrice),
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.productId === productId
            ? { ...p, productPrice: parseFloat(updatedPrice) }
            : p
        )
      );

      const updatedEditPrices = { ...editPrices };
      delete updatedEditPrices[productId];
      setEditPrices(updatedEditPrices);

      setEditMode((prev) => ({
        ...prev,
        [productId]: false,
      }));
    } catch (err) {
      console.error("Error updating price:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1c1e21] px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {username}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-4 bg-white p-4 rounded-md shadow-sm">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Filter by ID or Name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          />
          <button
            onClick={toggleSortOrder}
            className="bg-gray-100 text-sm px-3 py-1 rounded-md"
          >
            Sort by ID ({sortOrder})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#f0f2f5] text-left text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price (₹)</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.productId} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.productId}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.productName}</td>
                <td className="px-6 py-4">{product.productDesc}</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={editPrices[product.productId] ?? product.productPrice}
                    onChange={(e) =>
                      handlePriceChange(product.productId, e.target.value)
                    }
                    disabled={!editMode[product.productId]}
                    className={`px-2 py-1 w-24 border rounded-md text-sm bg-white ${
                      editMode[product.productId]
                        ? "border-gray-300"
                        : "border-transparent"
                    } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  />
                </td>
                <td className="px-6 py-4">
                  {editMode[product.productId] ? (
                    <button
                      onClick={() => handleSavePrice(product.productId)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-1 rounded-md"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleEdit(product.productId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded-md"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No matching results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
