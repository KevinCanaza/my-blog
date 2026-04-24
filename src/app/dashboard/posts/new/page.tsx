'use client';

import { useActionState } from 'react';
import { createPostAction } from '@/actions/post.actions';

export default function NewPostPage() {
    const [state, action, pending] = useActionState(createPostAction, {});

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuevo post</h1>

            <form action={action} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                        name="title"
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Título del post"
                    />
                    {state.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumen</label>
                    <textarea
                        name="excerpt"
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                        placeholder="Breve descripción del post..."
                    />
                    {state.errors?.excerpt && <p className="text-red-500 text-xs mt-1">{state.errors.excerpt[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <textarea
                        name="content"
                        rows={12}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                        placeholder="Escribe el contenido del post..."
                    />
                    {state.errors?.content && <p className="text-red-500 text-xs mt-1">{state.errors.content[0]}</p>}
                </div>

                <div className="flex items-center gap-2">
                    <input name="published" type="checkbox" value="true" id="published" className="rounded" />
                    <label htmlFor="published" className="text-sm text-gray-700">
                        Publicar inmediatamente
                    </label>
                </div>

                {state.errors?.general && (
                    <p className="text-red-500 text-sm">{state.errors.general[0]}</p>
                )}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={pending}
                        className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                    >
                        {pending ? 'Guardando...' : 'Guardar post'}
                    </button>
                </div>
            </form>
        </div>
    );
}