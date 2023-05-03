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
            <div className="grid grid-cols-[1fr_350px] gap-x-6 italic">
                {/* Form input info */}
                <div className="mb-16">
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="full-name">full name:</label>
                        <TextField 
                            id="full-name"
                            fullWidth
                            placeholder="Enter Your Full Name Here"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="email">email:</label>
                        <TextField 
                            id="email"
                            fullWidth
                            placeholder="Enter Your Email Here"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="phone-number">phone number:</label>
                        <TextField 
                            id="phone-number"
                            fullWidth
                            placeholder="Enter Your Phone Number Here"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="address">address:</label>
                        <TextField 
                            id="address"
                            fullWidth
                            placeholder="Enter Your Address Here"
                        />
                    </div>
                    {/* Button Place Order */}
                    <div className="bg-black text-white justify-center h-10 lg:w-[150px] flex items-center uppercase italic hover:cursor-pointer hover:bg-gray-800">
                        <span>Place order</span>
                    </div>
                </div>
                {/* Confirm checkout */}
                <div className="bg-[#ECEEEC] h-[fit-content] w-full px-8 py-10">
                    <p className="italic uppercase tracking-wider font-medium text-lg mb-6">your order</p>

                    <div className="italic flex flex-row flex-nowrap items-center justify-between border-b pb-2 border-gray-400 border-solid mb-4">
                        <p className="font-medium inline-block">Apple iPhone 11 64GB</p>
                        <span className="text-gray-500 text-sm">10.999.000 VND x1</span>
                    </div>

                    <div className="italic flex flex-row flex-nowrap items-center justify-between border-b pb-2 border-gray-400 border-solid mb-4">
                        <p className="font-medium inline-block">Apple iPhone 11 64GB</p>
                        <span className="text-gray-500 text-sm">10.999.000 VND x1</span>
                    </div>
                    {/* Total */}
                    <div className="flex flex-row justify-between">
                        <p className="italic uppercase tracking-wider font-medium ">total</p>
                        <span className="text-lg">10.990.900 VND</span>
                    </div>
                </div>
            </div>
        </main>
    );
};