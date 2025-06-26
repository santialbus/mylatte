import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ request }) => {
  const auth = request.headers.get('authorization');

  if (!auth) {
    return new Response('Autenticación requerida', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Área privada"' },
    });
  }

  const base64 = auth.split(' ')[1];
  const [user, pass] = atob(base64).split(':');

  if (user !== 'admin' || pass !== '1234') {
    return new Response('Acceso denegado', { status: 403 });
  }

  // En async nunca devuelvas void, devuelve una Response explícita
  // Por ejemplo:
  return new Response(null, { status: 200 });
};
