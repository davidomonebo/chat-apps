import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext.jsx';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    const credentials = { email, password };

    if (currState === "Sign up") {
      credentials.fullName = fullName;
      credentials.bio = bio;
    }

    const success = await login(currState === "Sign up" ? "signup" : "login", credentials);

    if (success) {
      setIsDataSubmitted(true);
    }
  };

  const handleBack = () => {
    setIsDataSubmitted(false);
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center
      gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      <img src={assets.logo_big} alt="App Logo" className='w-[min(30vw,250px)]' />

      <form onSubmit={onsubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium text-2xl'>{currState}</h2>
          {isDataSubmitted && (
            <img
              onClick={handleBack}
              src={assets.arrow_icon}
              alt="Back"
              className='w-5 cursor-pointer'
              title="Go back"
            />
          )}
        </div>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none'
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='Email Address'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Password'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </>
        )}

        {currState === "Sign up" && !isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder='Provide a short bio...'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        )}

        {isDataSubmitted && (
          <p className='text-green-500 text-sm'>Form submitted successfully!</p>
        )}

        <button
          type='submit'
          disabled={isDataSubmitted}
          className={`py-3 ${
            isDataSubmitted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-400 to-violet-600'
          } text-white rounded-md`}
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {!isDataSubmitted && (
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className='font-medium text-violet-500 cursor-pointer'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account?{' '}
              <span
                onClick={() => {
                  setCurrState("Sign up");
                  setIsDataSubmitted(false);
                }}
                className='font-medium text-violet-500 cursor-pointer'
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
