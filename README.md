# Agenda sin cruces
Prototipo académico de Jefferson David Mejía Torres y Luis Miguel Lindarte Contreras. Universidad de Pamplona · Teoría de la Computación.

## Ejecución
La aplicación completa se encuentra en `public/`: HTML, CSS y módulos ES nativos. Para una instalación local con Python, desde la raíz del proyecto ejecute `python3 -m http.server 3000 --directory public` y abra `http://localhost:3000`. Use siempre ese mismo origen; no abra el HTML mediante `file://`. El proyecto también incluye una ruta de Next.js que sirve ese mismo documento estático. No necesita cuentas externas, servicios de datos ni bibliotecas de interfaz en ejecución.

## Estructura
- `public/index.html`, `recursos/`, `estilos/`: portada nocturna, icono local y hojas de estilo adaptables.
- `public/src/inicio.js`, `interfaz/`: navegación, acceso local, agenda diaria, formulario, resolución, notas e importación.
- `public/src/dominio/`: autómata puro, cálculo de intervalos y validación del esquema.
- `public/src/aplicacion/`: controlador transaccional, historial posterior a la operación y planificador con reloj inyectable.
- `public/src/datos/`: adaptadores de perfil, sesión, agenda y archivos JSON.
- `pruebas/`: casos de dominio. Con Node 24: `node --test pruebas/*.test.mjs`.

## Uso y límites
El perfil se crea solo con un nombre. No autentica ni protege datos en un dispositivo compartido. Salir conserva la agenda; el perfil no se exporta. Use una sola pestaña. Borrar los datos del navegador elimina el contenido local. Descargue un respaldo antes de hacerlo o al cambiar de navegador. Las importaciones se validan antes de confirmar un reemplazo; se admiten archivos de hasta 5 MB.

Las horas se interpretan en Colombia. Los avisos se revisan al abrir, recuperar el foco y cada 15 segundos con la aplicación visible. No existen notificaciones externas. Las propuestas no reservan tiempo y la prioridad no desplaza reservas. El ejemplo público es independiente; la carga explícita de ejemplos en la agenda usa un día futuro para evitar que la clase venza de inmediato. Las alternativas buscan primero desde la hora solicitada y después entre las horas anteriores disponibles, con la duración original.

No se declara conformidad completa con WCAG. Las verificaciones automatizadas no sustituyen una revisión con lectores de pantalla, dispositivos físicos y distintos navegadores.
