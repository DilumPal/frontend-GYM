import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiMail, FiShield, FiCalendar, FiTrash2 } from "react-icons/fi";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      setIsLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // Defensive check to make sure res.data is always an array
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Failed to fetch users");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deleteUser(userId) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("User removed successfully");
        setUsers((prev) => prev.filter((user) => user._id !== userId));
      })
      .catch(() => {
        toast.error("Failed to delete user");
      });
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative bg-[#1A1A1A] text-white">
      {/* Page Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-[#E53935]">User Management</h1>
        <p className="text-white/60 mt-1">
          Review registered customer accounts and administrative privileges
        </p>
      </div>

      {/* Scrollable Content View */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[60px] h-[60px] border-4 border-white/10 border-t-[#E53935] rounded-full animate-spin"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-white/50 mt-20 text-lg">
            No users registered yet
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl">
            <table className="w-full text-sm text-left text-white">
              <thead className="bg-[#1A1A1A] text-[#E53935] sticky top-0 z-10 border-b border-white/10">
                <tr>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >
                    {/* Name / Avatar Info Block */}
                    <td className="p-4 font-semibold flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white/80">
                        {user?.firstName
                          ? user.firstName.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                      <div>
                        <span className="block text-white font-medium">
                          {user?.firstName && user?.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : "Unknown User"}
                        </span>
                        <span className="block text-[11px] text-white/40">
                          ID: {user?._id}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-white/70">
                      <div className="flex items-center gap-2">
                        <FiMail className="text-white/30" />
                        <span>{user?.email || "No Email Provided"}</span>
                      </div>
                    </td>

                    {/* Security Role Badge */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border font-medium inline-flex items-center gap-1.5 ${
                          user?.role === "admin"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        <FiShield size={12} />
                        {user?.role || "customer"}
                      </span>
                    </td>

                    {/* Actions Panel */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        disabled={user?.role === "admin"}
                        className={`p-2 rounded-lg transition-all ${
                          user?.role === "admin"
                            ? "text-white/20 cursor-not-allowed"
                            : "text-white/40 hover:text-[#E53935] hover:bg-white/5"
                        }`}
                        title={
                          user?.role === "admin"
                            ? "Cannot delete admin accounts"
                            : "Delete User"
                        }
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
