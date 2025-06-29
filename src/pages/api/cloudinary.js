// src/pages/api/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const res = await cloudinary.search
      .expression('resource_type:image')
      .max_results(30)
      .execute();

    const urls = res.resources.map(img => ({
      url: img.secure_url,
      alt: img.public_id.split('/').pop().replace(/[-_]/g, ' ')
    }));

    return new Response(JSON.stringify(urls), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Cloudinary error:', err);
    return new Response(JSON.stringify({ error: 'Error al cargar imágenes' }), { status: 500 });
  }
}

