import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchDesignerById, updateDesigner } from '../../redux/slice/adminDesignerSlice';

const EditDesigner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentDesigner, loading, error } = useSelector((state) => state.adminDesigners);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    image: '',
    description: '',
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchDesignerById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentDesigner && currentDesigner._id === id) {
      setFormData({
        name: currentDesigner.name || '',
        role: currentDesigner.role || currentDesigner.specialty || '',
        email: currentDesigner.email || '',
        image: currentDesigner.image || '',
        description: currentDesigner.description || '',
      });
    }
  }, [currentDesigner, id]);

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
        `${import.meta.env.VITE_BACKEND_URL}/admin/designers/upload`, 
        uploadData, 
        config
      );

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      alert('New image replacement profile sent successfully to Cloudinary.');
    } catch (err) {
      alert(err.response?.data?.message || 'Media pipeline upload execution failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDesigner({ id, designerData: formData }))
      .unwrap()
      .then(() => {
        alert('Designer record data updated safely.');
        navigate('/admin/designers');
      })
      .catch((err) => alert(err || 'Failed to modify database document data parameters.'));
  };

  if (loading) return <div className="p-20 text-center text-xs tracking-widest text-gray-500 uppercase">Loading Designer Profile Configuration Matrix...</div>;
  if (error) return <div className="max-w-3xl mx-auto my-10 p-6 text-center text-xs text-red-500 bg-red-50 border border-red-200 rounded">Error loading record instance details: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans select-none">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Edit Designer Profile Matrix</h2>
        <Link to="/admin/designers" className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-gray-900 transition-colors">← Back to Registry</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100 mb-2">
          <img 
            src={formData.image || "https://placehold.co/150x150?text=No+Avatar"} 
            alt="Preview Profile" 
            className="w-16 h-16 object-cover rounded-full border border-gray-200 bg-white"
            onError={(e) => { e.target.src = "https://placehold.co/150x150?text=Error"; }}
          />
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-1">Replace Portrait File</label>
            <input type="file" onChange={handleFileUpload} className="text-xs border border-gray-300 rounded cursor-pointer p-1 bg-white" />
            {uploading && <p className="text-[10px] text-blue-600 animate-pulse mt-1">Streaming to storage server instances...</p>}
          </div>
        </div>

        <div>
          <label className="block text-gray-600 text-xs font-semibold mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900 font-medium" required />
        </div>

        <div>
          <label className="block text-gray-600 text-xs font-semibold mb-1">Role / Design Specialty Core</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900 font-medium" required />
        </div>

        <div>
          <label className="block text-gray-600 text-xs font-semibold mb-1">Email Contact Registry</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900 font-medium" required />
        </div>

        <div>
          <label className="block text-gray-600 text-xs font-semibold mb-1">Biography / Narrative Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900 resize-none leading-relaxed font-medium" required />
        </div>

        <div className="pt-2 flex gap-3">
          <button type="submit" disabled={uploading} className="w-full bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider py-2.5 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400 h-[40px]">
            Save Structural Changes
          </button>
          <Link to="/admin/designers" className="w-1/3 bg-gray-100 text-center text-gray-700 text-xs font-semibold uppercase tracking-wider py-2.5 rounded hover:bg-gray-200 transition-colors flex items-center justify-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditDesigner;