import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { logoutAction } from '@/actions/auth.actions';

export default async function Navbar() {
    const session = await getSession();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900">
                    My Blog
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/blog" className="text-gray-600 hover:text-black transition-colors">
                        Blog
                    </Link>
                    {session ? (
                        <>
              <span className="text-sm text-gray-500">
                Hola, <strong>{session.name}</strong>
              </span>
                            <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors">
                                Dashboard
                            </Link>
                            <form action={logoutAction}>
                                <button
                                    type="submit"
                                    className="text-sm text-gray-600 hover:text-black transition-colors"
                                >
                                    Cerrar sesión
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                                Registro
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}