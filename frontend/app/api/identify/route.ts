export async function POST(req: Request) {
    
    try {

        //const body = await req.json()
        const formData = await req.formData();

        const backendRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/identify`,
            {
            method: 'POST',
            credentials: 'include',
            body: formData
            }
        )
  
        const data = await backendRes.json()
        return Response.json(data)
    } catch (err) {
      console.error(err)
      return new Response('Internal Server Error', { status: 500 })
    }
  }
  