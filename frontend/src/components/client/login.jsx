import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Link , Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addTokenOnLocal, fetchUserData } from "../../features/tokenFeatureSlice";
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Login(props) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const dispatch = useDispatch();

  const handleAddToken = (token) => {
    dispatch(addTokenOnLocal(token));
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/api/login`, user);
      handleAddToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  }

  const token = useSelector((state) => state.TokenReducer.token || "");

  const [display, setDisplay] = useState(true);
  useEffect(() => {
    if (token) {
      setDisplay(false);
      dispatch(fetchUserData());
    } else {
      setDisplay(true);
    }
  }, [token, dispatch]);

  const userData = useSelector(state => state.TokenReducer.userData);
  // const error = useSelector(state => state.TokenReducer.error);

  return (
    <>
      <div className={`${props.showOrNot(1) ? 'translate-x-0' : 'translate-x-full hidden'} fixed h-full w-full bg-black/50 backdrop-blur-sm top-0 z-[60] transition-all duration-150`}>
        <section className={`text-black bg-white absolute right-0 top-0 h-screen px-8 gap-8 z-50 flex flex-col overflow-y-auto w-[370px] transition-all duration-500 ease-in-out`}>
          <div className='flex justify-between items-center mt-4'>
            <p className='font-medium text-xl'>Login</p>
            <IoCloseOutline onClick={() => props.openAndClose(1)} className='mt-0 text-2xl cursor-pointer' />
          </div>

          <form onSubmit={onsubmit} className={`${display ? "visible" : "hidden"}`}>
            <label className='font-medium' htmlFor="email">Email Address <span className='text-red-500'>*</span></label>
            <input value={user.email} onChange={handleInputs} type="text" id='email' name='email' className='border border-black outline-none placeholder:text-gray-500 px-3 py-2 my-3 w-full' placeholder='Email Address' />
            <label className='font-medium' htmlFor="password">Password <span className='text-red-500'>*</span></label>
            <input value={user.password} onChange={handleInputs} type="text" id='password' name='password' className='border border-black outline-none placeholder:text-gray-500 px-3 py-2 my-3 w-full' placeholder='Password' />
            <button onClick={() => props.openAndClose(1)} className='text-lg uppercase hover:border-2 hover:border-black w-full py-[12px] mt-3 font-bold bg-[#4b7422] shadow-[5px_6px_rgb(166,222,205,1)] text-blue-50 hover:bg-white hover:text-black hover:shadow-black' type="submit">Login</button>
            <p className='text-center mt-3 underline underline-offset-2'>
              <Link className='cursor-pointer text-gray-700' to="/forgot-password">Forgot your password?</Link>
            </p>
            <button onClick={() => props.openAndClose(1)} className='text-lg uppercase border-2 border-black w-full py-[12px] mt-3 font-bold shadow-[5px_6px_rgb(166,222,205,1)] text-gray-950 hover:bg-black hover:text-white hover:shadow-black'>
              <Link to="/register">Create account</Link>
            </button>
          </form>
          <div onClick={() => props.openAndClose(1)} className={`${display ? "hidden" : "visible"}`}>
            {userData && (userData.msg.isAdmin === true ? (
              <Navigate to={"/admin"} />
            ) : (
              <div>
                <p className=' font-bold text-xl'>Hi <span className='ms-3 text-red-500'>{userData.msg.username}</span> </p>
              </div>
            ))}
            <Link to="/logout">Logout</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
