import { TextField } from "@mui/material";
import { Link } from "react-router-dom";


export function Login() {
    return (
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fbanner1.jpg?alt=media&token=ffde508e-d865-4787-9904-f04bcd07b206')] h-[100vh] w-full flex justify-center items-center">
            
            <div className="w-[40vw] px-16 py-20 bg-white shadow-md rounded-xl flex flex-col">
                <h3 className="text-3xl text-center mb-16 font-mono italic text-gray-400">Sign In</h3>
                <div className="mb-4 flex flex-col">
                    <TextField
                    // label='Email'
                    placeholder="Email"
                    required
                />
                    <TextField 
                        // label='Password'
                        placeholder="Password"
                        required
                        type="password"
                    />
                </div>
                {/* Sign-in Button */}
                <div className="bg-[#474444] mb-10 text-gray-100 hover:cursor-pointer hover:bg-slate-500 h-14 flex justify-center items-center">
                    <span className="uppercase">sign in</span>
                </div> 
                
                <div className="italic text-gray-500 inline-block text-center">
                    <span>Create an account?</span>
                    <Link to={'/dangky'}  className="text-blue-500">Sign up</Link>
                </div>
            </div>
        </div>
    );
};