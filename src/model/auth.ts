
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
    email: string,
    name: string,
    phone: string,
}