import Link from "next/link";

function NotFound(){
    return(
        <main className={"min-h-screen p-8"}>
            <h1 className={"text-6xl font-bold text-gray-200"}>404</h1>
            <h2 className={"text-2xl font-semibold mt-4"}>Pagina no encontrada</h2>
            <p className={"mt-2 text-gray-600"}>La pagina no existe</p>
            <Link href="/" className={"inline-block mt-6 px-4 py-2 bg-black text-white rounded"}>
                Volver al inicio
            </Link>
        </main>
    )
}

export default NotFound;