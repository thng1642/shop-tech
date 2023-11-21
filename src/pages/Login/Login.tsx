import { TextField } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import { forwardRef, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { URL } from "../../app/constant";
import { LoginDto } from "../../model/auth";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
})
/**
 * Login page for client/user
 */
export function Login() {

    const isAuth = useRef(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)

    const [helperEmail, setHelperEmail] = useState<string>('')
    const [helperPassword, setHelperPassword] = useState<string>('')

    const nav = useNavigate()

    // call api login user
    const loginAPI = async (loginDto: LoginDto) => {
        try {
            const res = await axios
                .post(URL+"/api/v1/login", loginDto)
            return [ res.data, null ]
        } catch(err) {
            console.log("Error when call api login")
            return [ null, err ]
        }
    }
    
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
    // Open state Alter error when login
    const [ open, setOpen ] = useState(false)
    // Message for Alter error when login
    const [ messError, setMessError ] = useState('')
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    return (
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fbanner1.jpg?alt=media&token=ffde508e-d865-4787-9904-f04bcd07b206')] h-[100vh] w-full flex justify-center items-center">
            {/* Notify error */}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {messError}
                </Alert>
            </Snackbar>
            <div className="w-full px-8 md:w-[60vw] lg:w-[40vw] lg:px-16 lg:py-20 bg-white shadow-md rounded-xl flex flex-col">
                <h3 className="text-3xl text-center mb-16 font-mono italic text-gray-400">
                    Đăng nhập
                </h3>
                <div className="gap-2 mb-4 flex flex-col">
                    <TextField
                        placeholder="Email"
                        error={isEmail}
                        helperText={helperEmail}
                        name="email"
                        value={account.email}
                        required
                        onChange={(event)=>{
                            const {value, name} = event.target
                            setHelperPassword('')
                            setIsPassword(false)
                            setHelperEmail('')
                            setIsEmail(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                    <TextField 
                        placeholder="Mật khẩu"
                        error={isPassword}
                        helperText={helperPassword}
                        required
                        name='password'
                        value={account.password}
                        type="password"
                        onChange={(event)=>{
                            const {value, name} = event.target
                            setHelperEmail('')
                            setIsEmail(false)
                            setHelperPassword('')
                            setIsPassword(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                </div>
                {/* Sign-in Button */}
                <div 
                    className="bg-[#474444] mb-10 text-gray-100 hover:cursor-pointer hover:bg-slate-500 h-14 flex justify-center items-center"
                    onClick={async ()=>{
                        isAuth.current = true
                        // console.log(account)
                        if (isEmptyFields()) {
                            if (isValidPassword()) {
                                // Calling api login
                                const [ res, error ] = await loginAPI(account)
                                if (res) {
                                    sessionStorage.setItem('access_token',
                                    res.access_token)
                                    sessionStorage.setItem('userInfo', 
                                        JSON.stringify(res.userInfo))
                                    nav(-1)
                                } else {
                                    console.log(error)
                                    setOpen(true)
                                    setMessError(error.response.data.message)
                                }
                            }
                        }
                    }}
                >
                    <span className="uppercase">đăng nhập</span>
                </div> 
                <div className="italic text-gray-500 inline-block text-center">
                    <span>Bạn đã có tài khoản?</span>
                    <Link to={'/dangky'}  className="text-blue-500">Đăng ký</Link>
                </div>
            </div>
        </div>
    );
};