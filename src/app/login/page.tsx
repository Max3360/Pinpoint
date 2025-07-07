'user client';

import './login.css';
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const url = mode === 'register' ? 'http://localhost:4000/register' : 'http://localhost:4000/login';
            const body = mode === 'register' ? { name, email, password } : { email, password };

            const res = await axios.post(url, body);
            if (mode === 'login') {
                const token = res.data.token;
                localStorage.setItem('token', token);
                router.push('/'); // ไปหน้าหลักหลัง login สำเร็จ
            } else {
                alert('สมัครสำเร็จ! ลองล็อกอิน');
                setMode('login');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
        }
    };
    return (
        <>
            <div className="background"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <h1 className='logo-name'>PINPOINT</h1>
            </div>
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">
                    {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
                </h1>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <input
                            type="text"
                            placeholder="ชื่อ"
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    )}
                    <input
                        type="email"
                        placeholder="อีเมล"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                    <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                    {error && (
                        <div className="text-red-500 text-center">{error}</div>
                    )}
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
                    </button>
                    <p className="text-center text-gray-600">
                        {mode === 'login' ? (
                            <>
                                ยังไม่มีบัญชี?{' '}
                                <button
                                    type="button"
                                    className="text-blue-600 hover:underline"
                                    onClick={() => setMode('register')}
                                >
                                    สมัครสมาชิก
                                </button>
                            </>
                        ) : (
                            <>
                                มีบัญชีอยู่แล้ว?{' '}
                                <button
                                    type="button"
                                    className="text-blue-600 hover:underline"
                                    onClick={() => setMode('login')}
                                >
                                    เข้าสู่ระบบ
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </>
    );
}
