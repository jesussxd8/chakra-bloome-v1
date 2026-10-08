# Chakra Coffee & Brunch — Web v6

Versión revisada y reorganizada de la web de Chakra Coffee & Brunch.

## Cambios principales

- La sección **Nuestra Filosofía** aparece inmediatamente después del hero y conserva el texto facilitado por la marca, dividido en una narrativa editorial más visual.
- Hero reconstruido con una composición responsive basada en CSS Grid y `object-fit: contain`, evitando estiramientos o deformaciones en escritorio y móvil.
- La **Tosta Tricolor** se muestra en horizontal.
- La carta tiene un único navegador visual por categorías: cada categoría incorpora imagen real disponible, título, descripción y número de opciones.
- Se eliminó el navegador duplicado de categorías.
- Todos los productos de la carta tienen un espacio visual. Cuando existe una foto específica facilitada, se usa esa imagen; cuando no existe una foto específica, se utiliza una imagen real de la categoría sin etiquetarla como si fuera la foto exacta del producto.
- Búsqueda de carta global y filtros de categorías.
- Traducción ES/EN para contenido estático y dinámico.
- Preloader premium de aproximadamente 4 segundos.
- Service Worker actualizado a caché `chakra-v6` para evitar servir versiones antiguas tras desplegar.
- La sección de reseñas ya no usa una cita inventada: enlaza a las opiniones reales de Google.

## Publicación

Sube **todo el contenido del ZIP** a la raíz del hosting, manteniendo la estructura de carpetas.

Si ya existía una versión anterior, reemplaza todos los archivos. El Service Worker usa una nueva versión de caché, pero tras publicar es recomendable hacer una recarga fuerte una vez en el navegador.

## Archivos principales

- `index.html` — página principal
- `styles.css` — diseño responsive y animaciones
- `app.js` — interacciones, carta, reserva, galería, FAQ y estado de apertura
- `i18n.js` — traducción ES/EN
- `sw.js` — caché/PWA
- `assets/img/` — imágenes de la marca y productos
- `assets/carta-chakra.pdf` — carta facilitada

## Nota sobre imágenes de productos

La estructura está preparada para sustituir fácilmente la imagen de cada producto por su foto individual cuando estén disponibles. No se han generado fotografías ficticias de platos para aparentar que son imágenes reales del local.
