
# Portfolio - Proyecto Node.js + Express + EJS

Descripción
-
Este repositorio contiene una aplicación de Portfolio personal construida con Node.js, Express y vistas EJS. Proporciona páginas para el dashboard, login, proyectos, SEO, habilidades y una línea de tiempo. Incluye rutas de autenticación y middleware básico para proteger rutas.

Estructura principal
-
- `src/` - Código fuente del servidor
	- `app.js` - Configuración de Express (middleware, views)
	- `server.js` - Punto de entrada del servidor
	- `middlewares/` - Middlewares, p.ej. `auth.middlewares.js`
	- `routes/` - Rutas de la aplicación, p.ej. `auth.routes.js`
- `views/` - Plantillas EJS: `dashboard.ejs`, `login.ejs`, `projects.ejs`, `seo.ejs`, `skills.ejs`, `timeline.ejs`, `layout.ejs`
- `public/` - Archivos estáticos (p.ej. `admin.js`)
- `package.json` - Dependencias y scripts npm

Requisitos
-
- Node.js (recomendado >= 14.x)
- npm o yarn
- (Opcional) `nodemon` para desarrollo en caliente

Variables de entorno
-
La aplicación puede necesitar algunas variables de entorno. Crea un archivo `.env` en la raíz del proyecto con, como mínimo, estas variables sugeridas:

- `PORT` - Puerto donde correr la app (por defecto `3000`)
- `NODE_ENV` - `development` o `production`
- `SESSION_SECRET` - Secreto para sesiones (si la app usa sesiones)
- `ADMIN_USER` y `ADMIN_PASS` - (Opcional) credenciales para el admin local si aplica

Ejemplo `.env.example`
-
PORT=3000
NODE_ENV=development
SESSION_SECRET=cambiar_por_un_valor_seguro
ADMIN_USER=admin
ADMIN_PASS=changeme

Instalación y ejecución (local)
-
1. Instalar dependencias:

```
npm install
```

2. Crear el fichero de variables de entorno:

```
copy .env.example .env  # Windows PowerShell
```

o crear manualmente `.env` con las variables necesarias.

3. Ejecutar en desarrollo:

```
npm run dev    # si existe script dev (p.ej. nodemon)
# o, en su defecto:
node src/server.js
```

4. Ejecutar en producción:

```
npm install --production
npm start      # si existe script start que arranca src/server.js
```

Comprobación rápida
-
- Abre tu navegador en `http://localhost:3000` (o el puerto configurado en `PORT`).
- Si aparece una pantalla de login, usa las credenciales definidas en `.env` (si aplican) o revisa `routes/auth.routes.js` para el comportamiento de autenticación.

Notas sobre configuración
-
- Si usas sesiones o autenticación, asegúrate de establecer `SESSION_SECRET` a un valor seguro.
- Si la app requiere una base de datos u otros servicios, añade las variables correspondientes en `.env` y revisa `src/app.js` o `src/server.js` para ver qué nombres de variables espera.

Debug y resolución de problemas
-
- Si el puerto está en uso: cambia `PORT` o mata el proceso que lo ocupa.
- Si falta algún paquete: ejecuta `npm install` nuevamente y revisa `package.json`.
- Errores en vistas EJS: revisa la carpeta `views/` y que las rutas devuelvan `res.render(...)` con las variables correctas.

Sugerencias adicionales
-
- Añade un archivo `README.md` más detallado en `src/` o comentarios en `server.js` para documentar rutas y middlewares específicos.
- Considera agregar scripts en `package.json` para `dev` (nodemon) y `start` (node). Ejemplo:

```
"scripts": {
	"dev": "nodemon src/server.js",
	"start": "node src/server.js"
}
```

Contacto
-
Si necesitas que actualice este README con ejemplos concretos de scripts, `package.json` o de las variables de entorno que realmente usa el proyecto, dime y los extraigo del repositorio para dejarlos exactos.

Licencia
-
Indica aquí la licencia del proyecto si aplica (p.ej. MIT).
