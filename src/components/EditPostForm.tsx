'use client';

import { useActionState } from 'react';
import { updatePostAction } from '@/actions/post.actions';
import { Post } from '@/generated/prisma/client';

export default function EditPostForm({ post }: { post: Post }) {
    const action = updatePostAction.bind(null, post.id);
    const [state, formAction, pending] = useActionState(action, {});

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                    name="title"
                    type="text"
                    defaultValue={post.title}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {state.errors?.title && <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resumen</label>
                <textarea
                    name="excerpt"
                    rows={3}
                    defaultValue={post.excerpt}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
                {state.errors?.excerpt && <p className="text-red-500 text-xs mt-1">{state.errors.excerpt[0]}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                    name="content"
                    rows={12}
                    defaultValue={post.content}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
                {state.errors?.content && <p className="text-red-500 text-xs mt-1">{state.errors.content[0]}</p>}
            </div>

            <div className="flex items-center gap-2">
                <input
                    name="published"
                    type="checkbox"
                    value="true"
                    id="published"
                    defaultChecked={post.published}
                    className="rounded"
                />
                <label htmlFor="published" className="text-sm text-gray-700">Publicado</label>
            </div>

            <button
                type="submit"
                disabled={pending}
                className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
                {pending ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    );
}