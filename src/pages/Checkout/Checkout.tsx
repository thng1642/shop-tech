import { TextField } from "@mui/material";

export function Checkout() {
    return (
        <main className="max-w-5xl mx-auto min-h-[80vh]">
            {/* Heading */}
            <div className='flex flex-row justify-between px-8 py-12 italic w-full mb-12 bg-[#c1c7c14d]'>

                <div className=''>
                    
                    <p className='uppercase tracking-wider text-xl font-medium'>checkout</p>
                </div>

                <div>
                    <span className="uppercase">home / cart / </span>
                    <span className='uppercase text-gray-500'>checkout</span>
                </div>
            </div>
            {/* Main content */}
            <div className="grid grid-cols-[1fr_300px]">
                <div>
                    <TextField 
                        fullWidth
                        placeholder="Enter Full Name Here"
                    />
                </div>
            </div>
        </main>
    );
};