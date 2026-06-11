import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, addUser, updateUser, deleteUser } from "../../redux/slice/adminSlice";

const UserManaagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user: currentUser} = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    if (currentUser && currentUser.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData))
      .unwrap()
      .then(() => {
        alert("User created successfully.");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "customer",
        });
      })
      .catch((err) => alert(err || "Failed to create user."));
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }))
      .unwrap()
      .then(() => alert("User role updated successfully."))
      .catch((err) => alert(err || "Failed to update user role."));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user account?")) {
      dispatch(deleteUser(userId))
        .unwrap()
        .then(() => alert("User deleted successfully."))
        .catch((err) => alert(err || "Failed to delete user."));
    } 
  };

  if (loading && users.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-xs uppercase tracking-widest text-gray-500 py-20">
        Loading user accounts...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans select-none">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        User Management
      </h2>

      {error && (
        <div className="mb-6 p-4 text-xs text-red-500 bg-red-50 border border-red-200 rounded">
          Error processing user request: {error}
        </div>
      )}

      <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm mb-8">
        <h3 className="text-md font-bold mb-4 text-gray-900">
          Add New User
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
              placeholder="e.g. Robert Smith"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="e.g. robert@nestora.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-xs font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              placeholder="Min 6 chars"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="grow">
              <label className="block text-gray-600 text-xs font-semibold mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-900"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded hover:bg-green-700 transition-colors shadow-sm shrink-0 h-[38px]"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto shadow-sm border border-gray-100 sm:rounded-lg">
        <table className="min-w-full text-left text-xs text-gray-700 bg-white">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Name</th>
              <th className="py-3.5 px-6">Email</th>
              <th className="py-3.5 px-6">Role</th>
              <th className="py-3.5 px-6 text-center">Action</th>
            </tr>
          </thead> 
        
          <tbody className="divide-y divide-gray-100 text-xs">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-gray-900 capitalize whitespace-nowrap">
                    {user.name}
                  </td>
                 
                  <td className="p-6 text-gray-500 lowercase">
                    {user.email}
                  </td>
                  <td className="p-6">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user._id, e.target.value)} 
                      className="p-1.5 border border-gray-300 rounded bg-gray-50 text-xs uppercase font-medium text-gray-900"
                    >
                      <option value="customer">customer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="p-6 text-center">
                    <button 
                      className="bg-red-600 text-white px-3 py-1.5 hover:bg-red-700 transition-colors rounded uppercase font-semibold tracking-wider" 
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="empty-table-fallback">
                <td colSpan="4" className="p-6 text-center text-gray-400 text-sm">
                  No users found in database.
                </td>
              </tr>
            )}
          </tbody> 
        </table>
      </div>
    </div>
  );
};

export default UserManaagement;