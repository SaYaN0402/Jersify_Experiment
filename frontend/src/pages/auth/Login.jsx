import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotBox, setShowForgotBox] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      alert("❌ Email must be a valid Gmail address (e.g. example@gmail.com)");
      return;
    }

    if (password.length < 6) {
      alert("❌ Password must be at least 76 characters long!");
      return;
    }

    alert("✅ User login successful!");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!resetEmail.endsWith("@gmail.com")) {
      alert("❌ Please enter a valid Gmail address");
      return;
    }

    alert("📩 Password reset link sent to your Gmail!");
    setShowForgotBox(false);
    setResetEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8 space-y-6 relative">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center">
          User Login
        </h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Gmail */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Gmail
            </label>
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password (min 6 characters)
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotBox(true)}
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Box (Modal) */}
        {showForgotBox && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-lg">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold text-white mb-4">
                Reset Password
              </h3>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your Gmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForgotBox(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
