"use client"
function Error({error,reset}: {
    error:Error;
    reset: () => void
    }) {    return (
        <main className={"min-h-screen p-8"}>
            <h1 className={"text-3xl font-bold text-red-600"}>Algo salio mal</h1>
            <p className={"mt-4 text-gray-600"}>{error.message}</p>
            <button
                onClick={reset}
                className={"mt-6 px-4 py-2 bg-black text-white rounded"}
            >
                Intente de nuevo
            </button>
        </main>
    )
}
export default Error;