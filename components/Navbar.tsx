import Image from "next/image";

export  function Navbar(){
    return(
        <nav className="flex justify-around p-4">
            <strong className="text-2xl cursor-pointer">Korean Wellness</strong>
            <ul className="flex justify-between gap-10 text-lg">
                <li className="cursor-pointer hover:border-b-2 hover:border-black">Shop</li>
                <li className="cursor-pointer hover:border-b-2 hover:border-black">Products</li>
                <li className="cursor-pointer hover:border-b-2 hover:border-black">Blog</li>
                <li className="cursor-pointer hover:border-b-2 hover:border-black">About</li>
            </ul>
            <span className="text-lg cursor-pointer">Cart</span>
        </nav>
    );
}