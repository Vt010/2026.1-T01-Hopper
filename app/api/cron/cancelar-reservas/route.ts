export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: 'Não autorizado' }, { status: 401 })
  }

  //buscar reservas temporárias criadas há mais de 5 minutos
  //cancelar essas reservas e liberar o horário

  return Response.json({ message: 'Cron de cancelamento executado com sucesso' })
}