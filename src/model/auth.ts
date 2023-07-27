
export interface SignUpDto {
    name: string,
    email: string,
    password: string,
    phone: string,
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