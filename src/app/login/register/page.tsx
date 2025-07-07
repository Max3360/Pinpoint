import Link from "next/link";
import './register.css';

export default function RegisterPage() {
    return (
        <div className="background">
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <h1 className='logo-name'>PINPOINT</h1>
            </div>
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">สมัครสมาชิก</h1>
                <form className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <input
                        type="email"
                        placeholder="อีเมล"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-black">
                        สมัครสมาชิก
                    </button>
                    <p className="text-center text-gray-600">
                        มีบัญชีอยู่แล้ว? <Link href="/login" className="text-blue-600 hover:underline">เข้าสู่ระบบ</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}