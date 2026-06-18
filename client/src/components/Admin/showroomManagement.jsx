import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchAdminShowrooms, deleteShowroom, addShowroom } from '../../redux/slice/showroomSlice';

const ShowroomManagement = () => {
  const dispatch = useDispatch();
  const { showrooms, loading, error } = useSelector((state) => state.showrooms);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    dimensions: '',
    image: '',
    description: '',
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminShowrooms());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/showrooms/upload`, 
        uploadData, 
        config
      );

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      alert('Showroom architecture spatial render saved onto cloud servers successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Media upload pipeline execution failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a spatial render display asset before saving structural entry.");
      return;
    }
    dispatch(addShowroom(formData))
      .unwrap()
      .then(() => {
        alert('Showroom showcase environment published successfully.');
        setFormData({ name: '', location: '', dimensions: '', image: '', description: '' });
      })
      .catch((err) => alert(err || 'Failed to initialize showroom structural document.'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to permanently tear down this curated showroom display layout?')) {
      dispatch(deleteShowroom(id))
        .unwrap()
        .then(() => alert('Showroom display space layout struck down successfully.'))
        .catch((err) => alert(err || 'Failed to completely purge spatial entity record.'));
    } 
  };

  if (loading) return <div className="max-w-7xl mx-auto p-6 text-center text-xs uppercase py-20 tracking-widest text-gray-400 font-light">Assembling Showroom Infrastructure Data Rows...</div>;
  if (error) return <div className="max-w-7xl mx-auto p-6 text-center text-xs text-red-500 py-20 bg-red-50/50 border border-red-100 rounded">Error mapping spatial matrices: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans select-none text-[#1A1A1A]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-normal tracking-wide text-gray-900">Showroom Exhibition Spaces</h2>
      </div>

      <div className="p-6 rounded-xl border border-gray-200/60 bg-white shadow-sm mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-400">Instantiate New Curated Pavilion</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Showroom Exhibition Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Pavilion of Pure Forms" className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Physical Location / Matrix</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Berlin Tiergarten Sector" className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Spatial Footprint Dimensions</label>
            <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="450 sqm / 4,840 sqft" className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">Display Render Blueprint</label>
            <input type="file" onChange={handleFileUpload} className="w-full p-1 text-xs border border-gray-300 rounded cursor-pointer focus:outline-none bg-gray-50" />
            {uploading && <p className="text-[10px] text-blue-600 animate-pulse mt-1">Streaming render to asset matrix...</p>}
          </div>

          <div className="md:col-span-3">
            <label className="block text-gray-600 text-xs font-semibold mb-1">Architectural Dialogue / Narrative Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Curated space highlighting minimal concrete planes intersecting wide structural glass grids." className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900" required />
          </div>

          <button type="submit" disabled={uploading} className="w-full bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest py-2.5 px-4 hover:bg-[#6B543D] transition-colors h-[38px] disabled:bg-gray-300">
            Deploy Showroom
          </button>
        </form>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-200/60 sm:rounded-lg">
        <table className="min-w-full text-left text-xs text-gray-700 bg-white">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Render Frame</th>
              <th className="py-3.5 px-6">Showroom Title Designation</th>
              <th className="py-3.5 px-6">Spatial Location Cluster</th>
              <th className="py-3.5 px-6">Total Area Footprint</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {showrooms && showrooms.length > 0 ? (
              showrooms.map((showroom) => (
                <tr key={showroom._id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 px-6 whitespace-nowrap">
                    <img 
                      src={showroom.image || "https://placehold.co/300x200?text=No+Render"} 
                      alt={showroom.name} 
                      className="w-14 h-10 object-cover rounded border border-gray-200"
                      onError={(e) => { e.target.src = "https://placehold.co/300x200?text=Render+Error"; }}
                    />
                  </td>
                  <td className="p-6 font-serif font-normal text-md text-gray-900 capitalize whitespace-nowrap">{showroom.name}</td>
                  <td className="p-6 text-gray-600 font-light capitalize">{showroom.location}</td>
                  <td className="p-6 text-gray-500 font-mono tracking-tighter lowercase">{showroom.dimensions}</td>
                  <td className="p-6 flex items-center justify-center gap-2 mt-1">
                   
                    <button onClick={() => handleDelete(showroom._id)} className="bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 transition-colors rounded uppercase font-semibold tracking-wider text-[10px]">Purge</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="p-6 text-center text-gray-400 normal-case font-light">No structural exhibition showrooms registered inside database memory storage clusters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowroomManagement;