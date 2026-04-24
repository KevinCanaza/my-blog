'use client';

import { useActionState } from 'react';
import { loginAction } from '@/actions/auth.actions';
import Link from 'next/link';

export default function LoginPage() {
    const [state, action, pending] = useActionState(loginAction, {});

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Iniciar sesión
            </h1>

            {state.errors?.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                    {state.errors.general[0]}
                </div>
            )}

            <form action={action} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="tu@email.com"
                    />
                    {state.errors?.email && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Tu contraseña"
                    />
                    {state.errors?.password && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                    {pending ? 'Entrando...' : 'Iniciar sesión'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-black font-medium hover:underline">
                    Regístrate
                </Link>
            </p>
        </div>
    );
}