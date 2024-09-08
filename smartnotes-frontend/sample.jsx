import React, { useState } from 'react';

const SettingsPage = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangeNotesPasswordModal, setShowChangeNotesPasswordModal] = useState(false);
  
  // States for Change Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  // States for Change Notes Password
  const [currentNotesPassword, setCurrentNotesPassword] = useState('');
  const [newNotesPassword, setNewNotesPassword] = useState('');
  const [confirmNewNotesPassword, setConfirmNewNotesPassword] = useState('');
  const [notesPasswordChangeError, setNotesPasswordChangeError] = useState('');

  // Toggle Modals
  const handleToggleChangePasswordModal = () => setShowChangePasswordModal(!showChangePasswordModal);
  const handleToggleChangeNotesPasswordModal = () => setShowChangeNotesPasswordModal(!showChangeNotesPasswordModal);

  // Handle Change Password
  const handleChangePassword = () => {
    // Implement password change logic here
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New passwords do not match.');
      return;
    }
    // Clear fields and close modal after successful change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowChangePasswordModal(false);
  };

  // Handle Change Notes Password
  const handleChangeNotesPassword = () => {
    // Implement notes password change logic here
    if (newNotesPassword !== confirmNewNotesPassword) {
      setNotesPasswordChangeError('New notes passwords do not match.');
      return;
    }
    // Clear fields and close modal after successful change
    setCurrentNotesPassword('');
    setNewNotesPassword('');
    setConfirmNewNotesPassword('');
    setShowChangeNotesPasswordModal(false);
  };

  return (
    <div className="settings-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <button
        onClick={handleToggleChangePasswordModal}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Change Password
      </button>
      <button
        onClick={handleToggleChangeNotesPasswordModal}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Change Notes Password
      </button>

      {/* Modal for Change Password */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
            <h3 className="mb-4 text-lg font-bold">Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            {passwordChangeError && (
              <p className="text-red-500 text-sm">{passwordChangeError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleToggleChangePasswordModal}
                className="px-4 py-2 mr-2 text-white bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 text-white bg-blue-600 rounded"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Change Notes Password */}
      {showChangeNotesPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
            <h3 className="mb-4 text-lg font-bold">Change Notes Password</h3>
            <input
              type="password"
              placeholder="Current Notes Password"
              value={currentNotesPassword}
              onChange={(e) => setCurrentNotesPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="New Notes Password"
              value={newNotesPassword}
              onChange={(e) => setNewNotesPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm New Notes Password"
              value={confirmNewNotesPassword}
              onChange={(e) => setConfirmNewNotesPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            {notesPasswordChangeError && (
              <p className="text-red-500 text-sm">{notesPasswordChangeError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleToggleChangeNotesPasswordModal}
                className="px-4 py-2 mr-2 text-white bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeNotesPassword}
                className="px-4 py-2 text-white bg-blue-600 rounded"
              >
                Change Notes Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
