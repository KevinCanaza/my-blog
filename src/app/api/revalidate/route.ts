import {NextRequest, NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export async function POST(request: NextRequest) {
  const { path } = await request.json();
  if (!path) {
      return NextResponse.json(
          {error: 'Path requerido'},
          {status: 404},
      );
  }

  revalidatePath(path)

    return NextResponse.json({
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
    })
}
