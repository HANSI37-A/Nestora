import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../../utils/axiosInstance";
import { fetchAdminDesigners, deleteDesigner, addDesigner } from '../../redux/slice/adminDesignerSlice';

const DesignerManagement = () => {
  const dispatch = useDispatch();
  const { designers, loading, error } = useSelector((state) => state.adminDesigners);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    image: '',
    description: '',
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminDesigners());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      setUploading(true);
      const userInfoStr = localStorage.getItem("userInfo");
      const token = userInfoStr ? JSON.parse(userInfoStr).token : null;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : "",
        }
      };

      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/designers/upload`, 
        uploadData, 
        config
      );

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      alert('Image file uploaded and saved to Cloudinary directory.');
    } catch (err) {
      alert(err.response?.data?.message || 'Media engine failed uploading asset.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDesigner(formData))
      .unwrap()
      .then(() => {
        alert('Designer profile created successfully.');
        setFormData({ name: '', role: '', email: '', image: '', description: '' });
      })
      .catch((err) => alert(err || 'Failed to create designer profile.'));
  };

  const handleDelete = (designerId) => {
    if (window.confirm('Are you sure you want to remove this designer profile?')) {
      dispatch(deleteDesigner(designerId))
        .unwrap()
        .then(() => alert('Designer profile removed successfully.'))
        .catch((err) => alert(err || 'Failed to remove designer profile.'));
    } 
  };

  if (loading) return <div className="max-w-7xl mx-auto p-6 text-center text-xs uppercase py-20 tracking-widest text-gray-500">Loading designer directory...</div>;
  if (error) return <div className="max-w-7xl mx-auto p-6 text-center text-xs text-red-500 py-20 bg-red-50 border border-red-200 rounded">Error loading directory: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans select-none">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Designer Management</h2>
      </div>

      <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm mb-8">
        <h3 className="text-md font-bold mb-4 text-gray-900">Add New Designer</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Role / Specialty</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Profile Photo Upload</label>
         
            <input type="file" onChange={handleFileUpload} className="w-full p-1 text-xs border border-gray-300 rounded cursor-pointer focus:outline-none" />
            {uploading && <p className="text-[10px] text-blue-600 animate-pulse mt-1">Streaming to Cloudinary...</p>}
          </div>

          <div className="md:col-span-3">
            <label className="block text-gray-600 text-xs font-semibold mb-1">Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <button type="submit" disabled={uploading} className="w-full bg-green-600 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded hover:bg-green-700 transition-colors h-[38px] disabled:bg-gray-400">
            Add Designer
          </button>
        </form>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-100 sm:rounded-lg">
        <table className="min-w-full text-left text-xs uppercase text-gray-700 bg-white">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Avatar</th>
              <th className="py-3.5 px-6">Name</th>
              <th className="py-3.5 px-6">Specialty / Role</th>
              <th className="py-3.5 px-6">Email Contact</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs lowercase">
            {designers && designers.length > 0 ? (
              designers.map((designer) => (
                <tr key={designer._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 px-6 whitespace-nowrap">
                   
                    <img 
                      src={designer.image || "https://placehold.co/100x100?text=No+Photo"} 
                      alt={designer.name} 
                      className="w-10 h-10 object-cover rounded-full border border-gray-200"
                      onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error"; }}
                    />
                  </td>
                  <td className="p-6 font-medium text-gray-900 capitalize whitespace-nowrap">{designer.name}</td>
                  <td className="p-6 text-gray-600 font-semibold capitalize">{designer.role || designer.specialty || 'Atelier Designer'}</td>
                  <td className="p-6 text-gray-500 font-mono">{designer.email}</td>
                  <td className="p-6 flex items-center justify-center gap-2 mt-2">
                    <Link to={`/admin/designers/${designer._id}/edit`} className="bg-gray-900 text-white px-3 py-1.5 hover:bg-gray-800 transition-colors rounded uppercase font-semibold tracking-wider">Edit</Link>
                    <button onClick={() => handleDelete(designer._id)} className="bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 transition-colors rounded uppercase font-semibold tracking-wider">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="p-6 text-center text-gray-400 normal-case">No designers registered in the atelier database.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesignerManagement;