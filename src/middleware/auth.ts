import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ locals, request }, next) => {
  const auth = request.headers.get('authorization');

  if (!auth) {
    return new Response('Autenticación requerida', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Área privada"' },
    });
  }
  const validUser = import.meta.env.ADMIN_USER;
  const validPass = import.meta.env.ADMIN_PASS;

  const base64 = auth.split(' ')[1];

  const [user, pass] = atob(base64).split(':');
  if (user !== validUser  || pass !== validPass) {
    return new Response('Acceso denegado', { status: 403 });
  }


  return next();
};
