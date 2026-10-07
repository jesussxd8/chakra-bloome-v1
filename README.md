# Chakra Coffee & Brunch — web v4 premium / bilingüe

Sitio estático responsive, sin frameworks ni dependencias de build. Puede publicarse en GitHub Pages, Netlify, Cloudflare Pages o un hosting Apache.

## Qué cambia en v4

- **Preloader premium de ~4 segundos** en cada carga/refresco. El contenido se carga detrás mientras el preloader usa únicamente `transform`, `opacity` y una barra/porcentaje de progreso visual.
- **Scroll más fluido**. En ratón de escritorio se suavizan los saltos grandes de la rueda mediante `requestAnimationFrame`; trackpad, táctil, teclado y usuarios con `prefers-reduced-motion` mantienen el scroll nativo.
- **Menos “golpes” al hacer scroll**. Se elimina `content-visibility` en las secciones para evitar rasterización tardía/pop-in y se usan apariciones más largas y con desplazamiento reducido.
- **Parallax amortiguado**. El hero interpola el movimiento del puntero en vez de copiarlo directamente.
- **Español / inglés completos**. El idioma se detecta automáticamente con el navegador, recuerda la elección manual en `localStorage` y traduce navegación, contenido, FAQ, formulario, estados de apertura, carta interactiva, búsquedas y mensajes de reserva. El selector ES/EN aparece en escritorio y móvil.
- **Nueva interacción “Elige tu momento”** con cuatro estados y recomendaciones visuales según lo que apetezca al usuario.
- **Galería ampliada a 12 imágenes** con drag, scroll-snap, teclado y un lightbox accesible con anterior/siguiente.
- **Navegación activa**: el menú marca la sección que el usuario está viendo.
- **Imágenes críticas del hero precargadas**; el resto conserva `loading=lazy`, dimensiones declaradas y `decoding=async`.
- **Service worker v4** con caché separada, navegación network-first y static assets cacheados sin guardar el PDF pesado.
- **Carta construida con DOM + `textContent`**, sin inyección de HTML dinámico.
- **Formulario sin almacenamiento**: solo prepara el enlace de WhatsApp; nombre/nota mantienen límites de longitud.
- **404 bilingüe** con detección del idioma y selector ES/EN.

## Seguridad

La web mantiene una Content Security Policy restrictiva y no carga librerías JavaScript de terceros. Cuando el hosting lo permite, `_headers` / `.htaccess` añaden:

- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy
- Permissions-Policy
- Cross-Origin-Opener-Policy
- HSTS

**GitHub Pages no permite configurar todas las cabeceras HTTP personalizadas.** La CSP incluida en el HTML seguirá funcionando, pero Netlify, Cloudflare Pages o un servidor Apache/Nginx configurable permiten aplicar todo el conjunto.

## Publicación rápida

### GitHub Pages
1. Copia todo el contenido de esta carpeta a la raíz del repositorio.
2. Haz commit y push.
3. Verifica que la URL final coincida con el `canonical` de `index.html`, `robots.txt` y `sitemap.xml`.

### Netlify / Cloudflare Pages
Sube esta carpeta como sitio estático. `_headers` se aplicará automáticamente si el proveedor soporta ese formato.

### Apache
Sube la carpeta incluyendo `.htaccess` y comprueba que `mod_headers` y `mod_expires` estén habilitados.

## Contenido editable

- Carta y precios: `menuItems` dentro de `app.js`.
- Traducciones: `i18n.js`.
- PDF: `assets/carta-chakra.pdf`.
- Imágenes: `assets/img/`.
- Colores, responsive y animaciones: `styles.css`.
- Teléfono/WhatsApp, redes, horarios y dirección: `index.html` y constantes relacionadas en `app.js`.

La reserva sigue siendo una **solicitud por WhatsApp**: no se considera confirmada hasta que el equipo responde.
