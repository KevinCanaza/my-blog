interface EditPostProps{
    params: Promise<{ id : string }>;
}

async function EditPostPage({ params }: EditPostProps) {
    const { id } = await params;
    console.log({params})
  return (
    <main className={"min-h-screen p-8"}>
      <h1 className={"text-3xl font-bold"}>Editar Post</h1>
        <p className={"mt-4 text-gray-600"}>Editando post ID: {id}</p>
    </main>
  );
}

export default EditPostPage;