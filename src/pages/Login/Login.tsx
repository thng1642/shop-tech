import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginDto } from "../../model/auth";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../redux/Auth/AuthSlice";


export function Login() {

    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)

    const [helperEmail, setHelperEmail] = useState<string>('')
    const [helperPassword, setHelperPassword] = useState<string>('')

    const dispatch = useAppDispatch()

    const [account, setAccount] = useState<LoginDto>(
        {
            email: '',
            password: '',
        }
    )

    const isEmptyFields = function() {

        let result = true

        if (account.email === '') {

            result = false
            setAccount({...account, 'password':''})
            setIsEmail(true)
            setHelperEmail("Email empty!")
        }
        if (account.password === '') {
            
            result = false
            setIsPassword(true)
            setHelperPassword('Password empty!')
        } 

        return result
    }

    const isValidPassword = function() {

        if (account.password.length > 8) {
            return true
        } else {
            setIsPassword(true)
            setHelperPassword("Mật khẩu lớn hơn 8 ký tự")
            setAccount({...account, 'password':''})
            return false
        }
    }

    return (
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fbanner1.jpg?alt=media&token=ffde508e-d865-4787-9904-f04bcd07b206')] h-[100vh] w-full flex justify-center items-center">
            
            <div className="w-[40vw] px-16 py-20 bg-white shadow-md rounded-xl flex flex-col">
                <h3 className="text-3xl text-center mb-16 font-mono italic text-gray-400">Sign In</h3>
                <div className="mb-4 flex flex-col">
                    <TextField
                    // label='Email'
                    placeholder="Email"
                    error={isEmail}
                    helperText={helperEmail}
                    name="email"
                    value={account.email}
                    required
                    onChange={(event)=>{
                        const {value, name} = event.target
                            
                        setHelperEmail('')
                        setIsEmail(false)
                        setAccount({...account, [name]: value})
                    }}
                />
                    <TextField 
                        // label='Password'
                        error={isPassword}
                        helperText={helperPassword}
                        placeholder="Password"
                        required
                        name='password'
                        value={account.password}
                        type="password"
                        onChange={(event)=>{
                            const {value, name} = event.target
                                
                            setHelperPassword('')
                            setIsPassword(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                </div>
                {/* Sign-in Button */}
                <div 
                    className="bg-[#474444] mb-10 text-gray-100 hover:cursor-pointer hover:bg-slate-500 h-14 flex justify-center items-center"
                    onClick={()=>{

                        // console.log(account)
                        if (isEmptyFields()) {
                            if (isValidPassword()) {
                                dispatch(authActions.authAccount(account))
                            }
                        }
                    }}
                >
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