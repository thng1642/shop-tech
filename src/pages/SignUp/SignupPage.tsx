import { TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import axios from "axios";

import { SignUpDto } from "../../model/auth";
import { URL } from "../../app/constant";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
})
/**
 * For Sign up user
 */
export function SignupPage() {

    const nav = useNavigate()
    const [account, setAccount] = useState<SignUpDto>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    })

    const [isFirstName, setIsFirstName] = useState<boolean>(false)
    const [isLastName, setIsLastName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPhone, setIsPhone] = useState<boolean>(false)

    const [helperFirstName, setHelperFirstName] = useState<string>('')
    const [helperLastName, setHelperLastName] = useState<string>('')
    const [helperEmail, setHelperEmail] = useState<string>('')
    const [helperPassword, setHelperPassword] = useState<string>('')
    const [helperPhone, setHelperPhone] = useState<string>('')

    const isEmptyFields = function() {

        let result = true
        if (account.firstName === '') {
            result = false
            setIsFirstName(true)
            setHelperFirstName("First name empty!")
        }
        else if (account.lastName === '') {
            result = false
            setIsLastName(true)
            setHelperLastName("Last name empty!")
        }
        else if (account.email === '') {
            result = false
            setIsEmail(true)
            setHelperEmail("Email empty!")
        }
        else if (account.password === '') {
            result = false
            setIsPassword(true)
            setHelperPassword('Password empty!')
        }
        else if (account.phoneNumber === '') {
            result = false
            setIsPhone(true)
            setHelperPhone("Phone empty!")
        }
        return result
    }

    const isValidPassword = function() {

        if (account.password.length >= 8) {
            return true
        } else {
            setIsPassword(true)
            setHelperPassword("Mật khẩu ít nhất 8 ký tự")
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
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {messError}
                </Alert>
            </Snackbar>
            <div className="w-full px-8 md:w-[60vw] lg:w-[40vw] lg:px-16 lg:py-20 bg-white shadow-md rounded-xl flex flex-col">
                <h3 className="text-3xl text-center mb-16 font-mono italic text-gray-400">Đăng ký</h3>
                <div className="gap-2 mb-4 flex flex-col">
                    <TextField
                        error={isFirstName}
                        placeholder="Họ và tên đệm"
                        required
                        helperText={helperFirstName}
                        value={account.firstName}
                        name="firstName"
                        onChange={(event)=>{
                            const {value, name} = event.target
                            setHelperFirstName('')
                            setIsFirstName(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                    <TextField
                        error={isLastName}
                        placeholder="Tên"
                        required
                        helperText={helperLastName}
                        value={account.lastName}
                        name="lastName"
                        onChange={(event)=>{
                            const {value, name} = event.target
                            setHelperLastName('')
                            setIsLastName(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                    <TextField
                    // label='Email'
                        error={isEmail}
                        placeholder="Email"
                        required
                        helperText={helperEmail}
                        value={account.email}
                        name="email"
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
                        placeholder="Mật khẩu"
                        required
                        type="password"
                        helperText={helperPassword}
                        value={account.password}
                        name="password"
                        onChange={(event)=>{

                            const {value, name} = event.target
                            
                            setHelperPassword('')
                            setIsPassword(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                    <TextField 
                        placeholder="Số điện thoại"
                        required
                        error={isPhone}
                        helperText={helperPhone}
                        value={account.phoneNumber}
                        name="phoneNumber"
                        onChange={(event)=>{
                            const {value, name} = event.target
                            setHelperPhone('')
                            setIsPhone(false)
                            setAccount({...account, [name]: value})
                        }}
                    />
                </div>
                {/* Sign-in Button */}
                <div 
                    className="bg-[#474444] mb-10 text-gray-100 hover:cursor-pointer hover:bg-slate-500 h-14 flex justify-center items-center"
                    onClick={()=>{
                        // First check empty
                        if (isEmptyFields()) {
                            // Check password
                            if (isValidPassword()) {
                                // call api sign up
                                ;( async () => {
                                    try {
                                        await axios.post(`${URL}/api/v1/signup`, account)
                                        nav('/dangnhap', {
                                            replace: true
                                        })
                                    } catch (error: any) {
                                        // console.log("Error: ", error.response)
                                        setOpen(true)
                                        // setMessError()
                                        if (error.response.status === 400) {
                                            const  data  = error.response.data.error
                                            setMessError(data[0].message)
                                        } else {
                                            setMessError(error.response.data)
                                        }
                                    }
                                })()
                            }
                        }
                    }}
                >
                    <span className="uppercase">đăng ký</span>
                </div> 
                
                <div className="italic text-gray-500 inline-block text-center">
                    <span>Đăng nhập </span>
                    <Link to={'/dangnhap'}  className="text-blue-500">Click</Link>
                </div>
            </div>
        </div>
    );
};