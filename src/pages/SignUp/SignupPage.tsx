import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { SignUpDto } from "../../model/auth";

export function SignupPage() {

    const nav = useNavigate()

    const [account, setAccount] = useState<SignUpDto>({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const [isName, setIsName] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isPhone, setIsPhone] = useState<boolean>(false)

    const [helperName, setHelperName] = useState<string>('')
    const [helperEmail, setHelperEmail] = useState<string>('')
    const [helperPassword, setHelperPassword] = useState<string>('')
    const [helperPhone, setHelperPhone] = useState<string>('')

    const isEmptyFields = function() {

        let result = true

        if (account.name === '') {

            result = false
            setIsName(true)
            setHelperName("Name empty!")
        }
        if (account.email === '') {

            result = false
            setIsEmail(true)
            setHelperEmail("Email empty!")
        }
        if (account.password === '') {
            
            result = false
            setIsPassword(true)
            setHelperPassword('Password empty!')
        }
        if (account.phone === '') {

            result = false
            setIsPhone(true)
            setHelperPhone("Phone empty!")
        }

        return result
    }


    const isExistedAccount = function() {

        const userArrStr = localStorage.getItem('userArr')
        if (userArrStr === null) {
            
            return true
        } else {

            const userArr = JSON.parse(userArrStr)
            for (let index in userArr) {

                if (userArr[index].email === account.email) {
                    
                    setIsEmail(true)
                    setHelperEmail("Email existed!")
                    return false
                }
            }
            return true
        }
    }

    const isValidPassword = function() {

        if (account.password.length > 8) {
            return true
        } else {
            setIsPassword(true)
            setHelperPassword("Mật khẩu lớn hơn 8 ký tự")
            return false
        }
    }
    return (
            <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fbanner1.jpg?alt=media&token=ffde508e-d865-4787-9904-f04bcd07b206')] h-[100vh] w-full flex justify-center items-center">
            
            <div className="w-[40vw] px-16 py-20 bg-white shadow-md rounded-xl flex flex-col">
                <h3 className="text-3xl text-center mb-16 font-mono italic text-gray-400">Sign Up</h3>
                <div className="mb-4 flex flex-col">
                    <TextField
                        error={isName}
                        placeholder="Full Name"
                        required
                        helperText={helperName}
                        value={account.name}
                        name="name"
                        onChange={(event)=>{

                            const {value, name} = event.target
                            
                            setHelperName('')
                            setIsName(false)
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
                        placeholder="Password"
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
                        placeholder="Phone"
                        required
                        error={isPhone}
                        helperText={helperPhone}
                        value={account.phone}
                        name="phone"
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
                        console.log("Account: ", account);
                        
                        // First check empty
                        if (isEmptyFields()) {
                            //  Have Email Existed before yet ?
                            if (isExistedAccount()) {
                                // Check password
                                if (isValidPassword()) {
                                    // Saving in localStorage
                                    let userArr:SignUpDto[] = []

                                    let userArrStr = localStorage.getItem('userArr')

                                    if (userArrStr !== null) {
                                        userArr = [...JSON.parse(userArrStr)]
                                    }

                                    userArr.push(account)
                                    localStorage.setItem('userArr', JSON.stringify(userArr))

                                    nav('/dangnhap')
                                }
                            }
                        }
                        
                    }}
                >
                    <span className="uppercase">sign up</span>
                </div> 
                
                <div className="italic text-gray-500 inline-block text-center">
                    <span>Login?</span>
                    <Link to={'/dangnhap'}  className="text-blue-500">Click</Link>
                </div>
            </div>
        </div>
    );
};