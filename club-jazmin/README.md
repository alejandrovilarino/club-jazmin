# Club Jazmín — Sitio web

Programa de beneficios de Jazmín de Rosas.

## Estructura

```
club-jazmin/
├── index.html          → Landing principal
├── pages/
│   ├── perfil.html     → Perfil de clienta
│   ├── beneficios.html → Catálogo de beneficios
│   └── skinbook.html   → Reseñas de productos
├── css/
│   └── style.css       → Estilos globales
└── js/
    └── main.js         → Interacciones
```

## Cómo subir a GitHub y deployar en Vercel

### Paso 1 — Crear repositorio en GitHub
1. Entrá a github.com → New repository
2. Nombre: `club-jazmin`
3. Privado o público (recomendado privado)
4. No inicialices con README (ya tenemos uno)
5. Crear repositorio

### Paso 2 — Subir los archivos
Opción A (sin código, desde el navegador):
1. En el repositorio vacío → "uploading an existing file"
2. Arrastrá toda la carpeta `club-jazmin`
3. Commit: "Versión inicial Club Jazmín"

Opción B (con terminal):
```bash
cd club-jazmin
git init
git add .
git commit -m "Versión inicial Club Jazmín"
git remote add origin https://github.com/TU_USUARIO/club-jazmin.git
git push -u origin main
```

### Paso 3 — Deployar en Vercel
1. Entrá a vercel.com → New Project
2. "Import Git Repository" → conectar con tu GitHub
3. Seleccionar `club-jazmin`
4. Framework Preset: **Other** (es HTML estático puro)
5. Deploy → en 30 segundos tenés una URL pública

### Paso 4 — Conectar subdominio propio
1. En Vercel → Settings → Domains
2. Agregar: `club.jazminderosas.com.ar`
3. En tu panel de DNS (donde administrás jazminderosas.com.ar):
   - Tipo: CNAME
   - Nombre: `club`
   - Valor: `cname.vercel-dns.com`
4. Esperar propagación (5-30 minutos)

## Próximos pasos — Conexión con Supabase

El formulario de registro en `index.html` está listo para conectar.
Buscar en `js/main.js` el comentario:
```js
// Simula envío — reemplazar con fetch a Supabase
```
Y reemplazarlo con el endpoint real de Supabase una vez configurada la base de datos.

## Identidad visual

- Grafito `#1c1c1c` — fondo principal oscuro
- Tiza `#f1ebe6` — fondo claro
- Visón `#6a645f` — textos secundarios
- Rosa `#df9fb1` — acento del Club
- Malva `#a95aaf` — nivel Alta
- Azul `#124169` — nivel Intermedia
