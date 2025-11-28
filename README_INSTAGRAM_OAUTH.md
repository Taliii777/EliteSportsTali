# 🔐 Guía de Configuración de OAuth de Instagram

Esta guía te ayudará a configurar el flujo completo de OAuth de Instagram para obtener y usar el feed de Instagram automáticamente.

## 📋 Requisitos Previos

1. Una cuenta de Instagram Business o Creator
2. Una aplicación creada en [Meta for Developers](https://developers.facebook.com/)
3. Node.js y pnpm instalados

## 🚀 Paso 1: Crear la Aplicación en Meta Developers

1. Ve a [Meta for Developers](https://developers.facebook.com/)
2. Inicia sesión con tu cuenta de Facebook
3. Haz clic en **"Mis Apps"** → **"Crear App"**
4. Selecciona **"Otro"** como tipo de app
5. Completa el formulario con:
   - **Nombre de la app**: Elige un nombre (ej: "Elite Sports Management")
   - **Email de contacto**: Tu email
   - **Propósito de la app**: Selecciona "Ninguno" o el que más se ajuste

## 🔑 Paso 2: Configurar Instagram Basic Display

1. En el panel de tu app, ve a **"Agregar producto"**
2. Busca y agrega **"Instagram Basic Display"**
3. Completa la configuración básica:
   - **Categoría**: Selecciona la más apropiada
   - **Uso de la app**: Describe cómo usarás la API

## ⚙️ Paso 3: Obtener las Credenciales

1. En el panel de **Instagram Basic Display**, encontrarás:
   - **App ID** (INSTAGRAM_APP_ID)
   - **App Secret** (INSTAGRAM_APP_SECRET) - Haz clic en "Mostrar" para verlo

2. **Guarda estas credenciales** - las necesitarás en el siguiente paso

## 🔗 Paso 4: Configurar la URL de Redirección

1. En el panel de **Instagram Basic Display**, ve a **"Configuración básica"**
2. En la sección **"Valid OAuth Redirect URIs"**, agrega:
   ```
   http://localhost:3000/auth/instagram/callback
   ```
   (Para producción, agrega también tu dominio real)

3. **Guarda los cambios**

## 🔐 Paso 5: Configurar Variables de Entorno

1. En la raíz del proyecto, crea o edita el archivo `.env.local`:

```env
INSTAGRAM_APP_ID=tu_app_id_aqui
INSTAGRAM_APP_SECRET=tu_app_secret_aqui
INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
```

2. Reemplaza `tu_app_id_aqui` y `tu_app_secret_aqui` con tus credenciales reales

## 🎯 Paso 6: Iniciar el Flujo de Autorización

### Opción A: Usando la API (Recomendado)

1. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

2. Abre en tu navegador:
   ```
   http://localhost:3000/api/auth/instagram/url
   ```

3. Copia la URL que aparece en `auth_url`

4. Abre esa URL en tu navegador

5. Autoriza la aplicación cuando se te solicite

6. Serás redirigido automáticamente a `/auth/instagram/callback` y verás un mensaje de éxito

### Opción B: Construir la URL Manualmente

Si prefieres construir la URL manualmente, usa este formato:

```
https://api.instagram.com/oauth/authorize?client_id=TU_APP_ID&redirect_uri=http://localhost:3000/auth/instagram/callback&scope=user_profile,user_media&response_type=code
```

Reemplaza `TU_APP_ID` con tu App ID real.

## ✅ Paso 7: Verificar que el Token se Guardó

Después de autorizar, el token se guarda automáticamente en `instagram_token.json` en la raíz del proyecto.

**⚠️ IMPORTANTE**: Este archivo contiene credenciales sensibles y está en `.gitignore` para no ser subido a Git.

## 📸 Paso 8: Obtener el Feed de Instagram

Una vez autorizado, puedes obtener el feed llamando a:

```
GET http://localhost:3000/api/instagram-feed
```

Esta ruta:
- Lee el token guardado
- Solicita el feed a la API de Instagram
- Retorna un JSON con los posts

### Ejemplo de Respuesta:

```json
{
  "data": [
    {
      "id": "123456789",
      "caption": "Descripción del post...",
      "media_url": "https://...",
      "permalink": "https://www.instagram.com/p/...",
      "media_type": "IMAGE",
      "timestamp": "2024-01-01T00:00:00+0000"
    }
  ],
  "paging": {
    "cursors": {
      "before": "...",
      "after": "..."
    }
  }
}
```

## 🔄 Renovar el Token

Los tokens de Instagram expiran después de 60 días. Para renovar:

1. Repite el proceso de autorización (Paso 6)
2. El nuevo token reemplazará automáticamente el anterior

## 📁 Estructura de Archivos

```
├── lib/
│   ├── instagram-config.ts      # Configuración y validación
│   ├── instagram-oauth.ts        # Funciones OAuth (URLs, intercambio de tokens)
│   └── instagram-token.ts        # Guardar/leer tokens
├── app/
│   └── api/
│       ├── auth/
│       │   └── instagram/
│       │       ├── callback/
│       │       │   └── route.ts  # Callback de OAuth
│       │       └── url/
│       │           └── route.ts  # Obtener URL de autenticación
│       └── instagram-feed/
│           └── route.ts          # Obtener feed de Instagram
└── instagram_token.json          # Token guardado (no se sube a Git)
```

## 🛠️ Rutas Disponibles

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/auth/instagram/url` | GET | Obtiene la URL de autenticación OAuth |
| `/auth/instagram/callback` | GET/POST | Callback de OAuth (recibe código y guarda token) |
| `/api/instagram-feed` | GET | Obtiene el feed de Instagram |

## ⚠️ Solución de Problemas

### Error: "Configuración incompleta"
- Verifica que todas las variables de entorno estén en `.env.local`
- Reinicia el servidor después de agregar variables de entorno

### Error: "redirect_uri_mismatch"
- Verifica que la URL en `.env.local` coincida exactamente con la configurada en Meta Developers
- Asegúrate de que no haya espacios o caracteres extra

### Error: "Token no encontrado o expirado"
- El token expira después de 60 días
- Reautoriza la aplicación siguiendo el Paso 6

### Error: "Invalid OAuth access token"
- El token puede haber sido revocado
- Reautoriza la aplicación

## 🔒 Seguridad

- **NUNCA** subas `instagram_token.json` o `.env.local` a Git
- Ambos archivos están en `.gitignore`
- En producción, usa variables de entorno del servidor en lugar de archivos `.env`
- Considera usar un servicio de gestión de secretos (como AWS Secrets Manager, Vercel Environment Variables, etc.)

## 📚 Recursos Adicionales

- [Documentación de Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Meta for Developers](https://developers.facebook.com/)
- [Guía de OAuth de Instagram](https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions)

## 🚀 Producción

Para producción:

1. Actualiza `INSTAGRAM_REDIRECT_URI` en las variables de entorno del servidor con tu dominio real:
   ```
   https://tudominio.com/auth/instagram/callback
   ```

2. Agrega la misma URL en Meta Developers → Instagram Basic Display → Valid OAuth Redirect URIs

3. Considera implementar renovación automática de tokens antes de que expiren

4. Usa variables de entorno del servidor en lugar de archivos `.env.local`

---

¿Necesitas ayuda? Revisa los logs del servidor para más detalles sobre cualquier error.

