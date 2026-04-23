'use server';
import { prisma } from '@/lib/prisma';
import { RegisterSchema, LoginSchema } from '@/lib/validations';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export type AuthState = {
    errors?: { name?: string[]; email?: string[]; password?: string[]; general?: string[] };
    success?: boolean;
};

export async function registerAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const validated = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

    const exists = await prisma.user.findUnique({ where: { email: validated.data.email } });
    if (exists) return { errors: { general: ['Email ya registrado'] } };

    await prisma.user.create({
        data: { ...validated.data, password: await bcrypt.hash(validated.data.password, 10) },
    });
    redirect('/login');
}

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const validated = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
    if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

    const user = await prisma.user.findUnique({ where: { email: validated.data.email } });
    if (!user || !(await bcrypt.compare(validated.data.password, user.password)))
        return { errors: { general: ['Credenciales inválidas'] } };

    const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
    redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
    (await cookies()).delete('session');
    redirect('/login');
}