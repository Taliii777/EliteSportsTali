# 🚀 Inicio Rápido - Instagram OAuth

## Configuración en 3 Pasos

### 1️⃣ Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
INSTAGRAM_APP_ID=tu_app_id
INSTAGRAM_APP_SECRET=tu_app_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
```

### 2️⃣ Obtener la URL de Autorización

1. Inicia el servidor: `pnpm dev`
2. Visita: `http://localhost:3000/api/auth/instagram/url`
3. Copia la URL de `auth_url`

### 3️⃣ Autorizar la Aplicación

1. Abre la URL copiada en tu navegador
2. Autoriza la aplicación
3. ¡Listo! El token se guarda automáticamente

## Usar el Feed

Una vez autorizado, obtén el feed con:

```
GET http://localhost:3000/api/instagram-feed
```

## 📚 Documentación Completa

Para más detalles, consulta: [README_INSTAGRAM_OAUTH.md](./README_INSTAGRAM_OAUTH.md)

