"use client"
import Link from "next/link";
import {useActionState} from "react";
import {registerAction} from "@/actions/auth.actions";

function RegisterPage(){
    const [ state, action, pending] = useActionState(registerAction,{});
    return(
        <div>
            <h1 className={"text-2xl font-bold text-gray-900 text-center mb-6"}>Crear cuenta</h1>
            {state.errors?.general && (
                <div className={"mb-4 p-3 bg-red-50 border-t border-red-200 rounded text-sm text-red-600"}>
                    {state.errors.general[0]}
                </div>
            )}

            <form action={action} className={"space-y-4"}>
                <div>
                    <label className={"block text-sm font-medium text-gray-700 mb-1"}>Nombre</label>
                    <input type="text" name={"name"} placeholder={"tu nombre"}
                           className={"w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black"}/>
                    {state.errors?.name &&(
                        <p className={"text-red-500 text-xs mt-1"}>{state.errors.name[0]}</p>
                    )}
                </div>

                <div>
                    <label className={"block text-sm font-medium text-gray-700 mb-1"}>Email</label>
                    <input type="email" name={"email"} placeholder={"tu@email.com"}
                           className={"w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black"}/>
                    {state.errors?.email &&(
                        <p className={"text-red-500 text-xs mt-1"}>{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label className={"block text-sm font-medium text-gray-700 mb-1"}>Contrasena</label>
                    <input type="password" name={"password"} placeholder={"Minimo 8 caracteres"}
                           className={"w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black"}/>
                    {state.errors?.password &&(
                        <p className={"text-red-500 text-xs mt-1"}>{state.errors.password[0]}</p>
                    )}
                </div>

                <button type={"submit"} disabled={pending} className={"w-full bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"} >
                    {pending? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>

            <p className={"textcenter text-sm text-gray-500 mt-4"}>
                Ya tienes cuenta?{' '}
                <Link href={"/login"} className={"text-black font-medium hover:underline"}>
                    Inicia sesion
                </Link>
            </p>
        </div>
    )
}

export default RegisterPage;