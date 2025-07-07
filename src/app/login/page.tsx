'user client';

import './login.css';
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LoginPage() {

    return(
        <>
            <div className="background"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <h1 className='logo-name'>PINPOINT</h1>
            </div>
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">
                    เข้าสู่ระบบ
                </h1>
                <form className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="อีเมล"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        เข้าสู่ระบบ
                    </button>
                    <p className="text-center text-gray-600">
                        ยังไม่มีบัญชี?{' '}
                        <button
                            type="button"
                            className="text-blue-600 hover:underline"
                        >
                            สมัครสมาชิก
                        </button>
                    </p>
                </form>
            </div>
        </>
    );

}
