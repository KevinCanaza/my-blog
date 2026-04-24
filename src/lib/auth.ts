import {cookies} from "next/headers";
import {jwtVerify} from "jose";

export type SessionUser = {
    userId: string;
    email: string;
    name: string;
}

export async function getSession(): Promise<SessionUser | null> {
    const token = (await cookies()).get('session')?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET),
        );
        return payload as SessionUser;
    }catch(err) {
        return null;
    }

}