import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [signIn, setSignIn] = useState(true);

  const handleSignIn = () => {
    setSignIn(!signIn);
  }

  return (
    <div className="relative h-screen w-full">
      <div className="relative z-50">
        <Header />
      </div>

      {/* Background Image */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg"
        alt="Netflix Background"
        className="h-full w-full object-cover"
      />

      {/* Overlay: covers the entire parent, dark background, semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Form */}
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black bg-opacity-60 text-white px-8 py-6 rounded-lg">
        <h1 className="font-bold text-3xl my-6">
          {signIn ? 'Sign In' : 'Sign Up'}
        </h1>

        {/* If signIn is false, show Full Name input */}
        {!signIn && (
          <input
            className="w-full bg-gray-900 my-2 p-4 rounded-lg border border-white"
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          className="w-full bg-gray-900 my-2 p-4 rounded-lg border border-white"
          type="text"
          placeholder="Email or Phone Number"
        />
        <input
          className="w-full bg-gray-900 my-2 p-4 rounded-lg border border-white"
          type="password"
          placeholder="Password"
        />
        <button className="w-full bg-red-700 my-2 p-4 rounded-lg font-bold">Sign In</button>

        {signIn ? (
          <p className="text-white my-4">
            New to Netflix?
            <span className="font-bold cursor-pointer" onClick={handleSignIn}>
              {' '}Sign Up now.
            </span>
          </p>
        ) : (
          <p className="text-white my-4">
            Already have an account?
            <span className="font-bold cursor-pointer" onClick={handleSignIn}>
              {' '}Sign In now.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
