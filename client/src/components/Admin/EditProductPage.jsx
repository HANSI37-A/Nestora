import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/slice/productsSlice";
import { updateProduct } from "../../redux/slice/adminProductSlice";
import axiosInstance from "../../utils/axiosInstance";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    colors: [],
    collections: "",
    material: "",
    images: [],
    modelUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingModel, setUploadingModel] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id))
        .unwrap()
        .then((product) => {
          if (product) {
            setProductData({
              name: product.name || "",
              description: product.description || "",
              price: product.price || 0,
              countInStock: product.countInStock || 0,
              sku: product.sku || "",
              category: product.category || "",
              brand: product.brand || "",
              colors: Array.isArray(product.color) ? product.color : (product.color ? [product.color] : []),
              collections: product.productCollection || "",
              material: product.material || "",
              images: product.images || [],
              modelUrl: product.modelUrl || "",
            });
          }
        })
        .catch((err) => alert(err || "Failed to load product details."));
    }
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: res.data.imageUrl, alt: prev.name }],
      }));
      alert("Image uploaded successfully.");
    } catch (err) {
      console.error("Image upload failure:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleModelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("model", file);
    setUploadingModel(true);

    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}/upload-model`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`
          },
        }
      );
      setProductData((prev) => ({
        ...prev,
        modelUrl: res.data.modelUrl,
      }));
      alert("3D Model uploaded successfully.");
    } catch (err) {
      console.error("Model upload failure:", err);
      alert("Failed to upload 3D model. Please try again.");
    } finally {
      setUploadingModel(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveLoading(true);

    
    const formattedData = {
      ...productData,
      color: productData.colors,
      productCollection: productData.collections,
    };

    dispatch(updateProduct({ id, productData: formattedData }))
      .unwrap()
      .then(() => {
        alert("Product specification updated cleanly.");
        navigate("/admin/products");
      })
      .catch((err) => {
        alert(err || "Failed to save product edits.");
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-100 shadow-sm rounded-xl select-none font-sans text-gray-800 antialiased">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Edit Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Product Name</label>
            <input 
              type="text" 
              name="name" 
              value={productData.name} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">SKU</label>
            <input 
              type="text" 
              name="sku" 
              value={productData.sku} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Description</label>
          <textarea 
            name="description" 
            value={productData.description} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
            rows={4} 
            required 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={productData.price} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Count in Stock</label>
            <input 
              type="number" 
              name="countInStock" 
              value={productData.countInStock} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Material</label>
            <input 
              type="text" 
              name="material" 
              value={productData.material} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              placeholder="e.g. American Walnut"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Category</label>
            <input 
              type="text" 
              name="category" 
              value={productData.category} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              placeholder="e.g. Living Room"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Brand</label>
            <input 
              type="text" 
              name="brand" 
              value={productData.brand} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              placeholder="e.g. Nestora Heritage"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Collection</label>
            <input 
              type="text" 
              name="collections" 
              value={productData.collections} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
              placeholder="e.g. walnut-series"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Colors (comma-separated finishes)</label>
          <input 
            type="text" 
            name="colors" 
            value={productData.colors.join(', ')} 
            onChange={(e) => setProductData({
              ...productData,
              colors: e.target.value.split(',').map(color => color.trim()).filter(Boolean)
            })} 
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-900" 
            placeholder="e.g. Solid Walnut, charcoal"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Upload Image</label>
          <input 
            type="file" 
            onChange={handleImageUpload} 
            disabled={uploading} 
            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
          {uploading && <p className="text-[10px] text-[#A8A29E] mt-2 animate-pulse">Uploading design asset...</p>}
          
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="relative w-20 h-20 group">
                <img 
                  src={image.url} 
                  alt="Product Visual Asset" 
                  className="w-full h-full object-cover rounded-md shadow-sm border border-gray-100"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-1.5 -right-1.5 bg-red-600 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center hover:bg-red-700 shadow-sm"
                >
                  &times;
                </button>
              </div>  
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Upload 3D Model (.glb/.gltf)</label>
          <input 
            type="file" 
            accept=".glb,.gltf"
            onChange={handleModelUpload} 
            disabled={uploadingModel} 
            className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          />
          {uploadingModel && <p className="text-[10px] text-[#A8A29E] mt-2 animate-pulse">Uploading 3D model asset...</p>}
          {productData.modelUrl && (
            <p className="text-xs text-green-600 mt-2">
              Model uploaded successfully: <a href={`http://localhost:5000${productData.modelUrl}`} target="_blank" rel="noopener noreferrer" className="underline font-medium">View Model</a>
              <br />
              <a href={productData.modelUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">View Model</a>
            </p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={saveLoading}
          className="w-full bg-[#1A1A1A] text-white py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#6B543D] transition-colors rounded shadow-sm disabled:opacity-50"
        >
          {saveLoading ? "Saving Changes..." : "Update Product Specifications"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;