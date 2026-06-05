export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: 'Não autorizado' }, { status: 401 })
  }

  //buscar consultas do dia seguinte no Supabase
  //filtrar consultas não canceladas
  //enviar e-mail via Resend com data, hora e nome do profissional

  return Response.json({ message: 'Cron de lembretes executado com sucesso' })
}