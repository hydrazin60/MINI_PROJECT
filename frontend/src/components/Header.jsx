import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    
    return (
        <div className="bg-zinc-300">
            <div className="flex justify-between items-center mx-auto p-3">
                <h1 className="font-bold cursor-pointer" onClick={() => navigate("/")}>MINI_PROJECT</h1>
                <ul className="flex gap-6">
                    <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
                    <li className="cursor-pointer" onClick={() => navigate("/about")}>About</li>
                    <li className="cursor-pointer" onClick={() => navigate("/sign-in")}>Sign-In</li>
                </ul>
            </div>
        </div>
    );
}
