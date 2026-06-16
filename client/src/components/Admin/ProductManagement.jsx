import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, deleteProduct, addProduct } from '../../redux/slice/adminProductSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
    image: '',             
    sku: "",              
    
  });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      countInStock: Number(formData.countInStock),
    };
    dispatch(addProduct(payload))
      .unwrap()
      .then(() => {
        alert('Product created successfully.');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          countInStock: '',
          image: '',           
          sku: "",               
          
        });
      })
      .catch((err) => alert(err || 'Failed to create product.'));
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product from Nestora catalog?')) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => alert('Product removed successfully.'))
        .catch((err) => alert(err || 'Failed to remove product.'));
    } 
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs uppercase tracking-widest text-gray-500 py-20">
        Loading product catalog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs text-red-500 py-20 bg-red-50 border border-red-200 rounded">
        Error loading catalog: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans select-none">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
      </div>

      <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm mb-8">
        <h3 className="text-md font-bold mb-4 text-gray-900">
          Add New Product
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="e.g. Modern Sofa"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="e.g. Living Room"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="e.g. 599"
              min="0"
              step="any"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Count In Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="e.g. 15"
              min="0"
              required
            />
          </div>

       <div>
          <label className="block text-gray-600 text-xs font-semibold mb-1">SKU Code</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
            placeholder="e.g. NST-CH-001"
            required
          />
        </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="e.g. /images/sofa.jpg"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="Brief description of the product"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded hover:bg-green-700 transition-colors shadow-sm shrink-0 h-[38px]"
          >
            Add Product
          </button>
        </form>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-100 sm:rounded-lg">
        <table className="min-w-full text-left text-xs uppercase text-gray-700 bg-white">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Name</th>
              <th className="py-3.5 px-6">Price</th>
              <th className="py-3.5 px-6">SKU</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs lowercase">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-gray-900 capitalize whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-6 text-gray-600 font-semibold">
                    ${product.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-6 text-gray-500 font-mono uppercase">
                    {product.sku}
                  </td>
                  <td className="p-6 text-center">
                    <Link to={`/admin/products/${product._id}/edit`} className="bg-amber-500 text-white px-3 py-1.5 hover:bg-amber-600 transition-colors rounded mr-2 uppercase font-semibold tracking-wider">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 transition-colors rounded uppercase font-semibold tracking-wider">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400 normal-case">
                  No products registered in catalog.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;