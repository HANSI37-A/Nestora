import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, deleteProduct } from '../../redux/slice/adminProductSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

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
        <Link to="/admin/products/new" className="bg-[#1A1A1A] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#6B543D] transition-colors rounded shadow-sm">
          Add Product
        </Link>
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