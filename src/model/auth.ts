
export interface SignUpDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
}
export interface LoginDto {
    email: string,
    password: string,
}

export interface AuthDto {
    access_token: string,
    userInfo: {
        email: string,
        firstName: string,
        lastName: string
    }
}