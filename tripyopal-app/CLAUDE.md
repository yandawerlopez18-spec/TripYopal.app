# Descubre Casanare — Contexto del proyecto

## 1. Objetivo del producto
Plataforma web turística para Yopal, Casanare, orientada a impulsar el turismo local con experiencias digitales modernas: descubrimiento de lugares, servicios, eventos, rutas, recomendaciones personalizadas, chatbot IA y dashboard de gestión.

## 2. Modelo de negocio
- Gratuito por ahora para validar uso real.
- Sin comisión sobre reservas o pagos en esta etapa.
- Revisar monetización futura (comisiones o suscripciones) cuando el producto esté validado.

## 3. Alcance del MVP
- El producto se construye de forma incremental, pero cada módulo debe quedar funcional cuando esté listo.
- El lanzamiento será abierto al público desde el inicio.

## 4. Stack técnico confirmado
- Frontend: React / Next.js + Tailwind CSS
- Backend: Firebase Cloud Functions
- Base de datos: PostgreSQL (reemplaza el plan original de Firestore). Desarrollo local contra un PostgreSQL en el PC, administrado con pgAdmin4; para producción se necesitará un PostgreSQL alojado en la nube (ej. Supabase, Neon, Railway, RDS).
- Almacenamiento: Firebase Storage
- Auth: Firebase Auth con email y contraseña únicamente
- Mapas: Google Maps API
- Clima: OpenWeather API
- Hosting: Firebase Hosting
- IA / Chatbot: Claude API
- Pagos: pendiente de definir; Wompi es la opción recomendada para Colombia

## 5. Funcionalidades prioritarias
- Chatbot IA 24/7 para responder únicamente temas de la plataforma: lugares, rutas, clima, eventos.
- Mapas interactivos con servicios y sitios turísticos.
- Calificaciones y reseñas por lugar o servicio.
- Recomendaciones personalizadas según presupuesto, intereses y categoría.
- Sección de eventos en tiempo real con publicación de administradores y organizadores.
- Generador de rutas con distribución por días y presupuesto estimado.
- Dashboard en tiempo real con métricas y reportes exportables.
- Recomendaciones de seguridad, salud y cuidado ambiental por lugar o ruta.
- Clima actual y pronóstico para Yopal.

## 6. Roles del sistema
1. Turista / Visitante
2. Prestador de servicios
3. Multiusuario (empresa)
4. Agente de viajes
5. Organizador de eventos
6. Administrador de la plataforma
7. Chatbot IA (entidad del sistema)

## 7. Modelo de datos sugerido
- Usuarios
- Prestadores
- Servicios
- Items_Producto
- Lugares
- Eventos
- Rutas_Agenda
- Reservas
- Pagos
- Reseñas
- Favoritos
- Chat_Historial
- Notificaciones
- Configuracion

## 8. Orden de construcción sugerido
1. Autenticación + estructura base de roles
2. Lugares y atracciones + panel de carga
3. Mapa interactivo + clima
4. Eventos + rol organizador
5. Chatbot IA conectado a datos reales
6. Recomendaciones personalizadas por presupuesto
7. Registro y catálogo de prestadores + auto-aprobación
8. Inventario, precios y disponibilidad
9. Reservas (sin pagos aún)
10. Seguridad, salud y medio ambiente por lugar/ruta
11. Generador de rutas con tiempos reales de transporte
12. Dashboard en tiempo real + reportes
13. Integración de pasarela de pago
14. Términos, condiciones y política de datos
15. Despliegue en Firebase Hosting

## 9. Reglas de negocio importantes
- Los datos críticos como números de emergencia y centros de salud deben cargarse manualmente y no ser generados por IA.
- El chatbot debe usar datos reales del sistema cuando sea posible.
- La plataforma debe ser abierta desde el inicio y preparada para crecimiento.

## 10. Prioridad actual del desarrollo
- Diseñar la experiencia principal para visitantes y turistas.
- Implementar una interfaz moderna para Yopal.
- Preparar la arquitectura para integrar Firebase, mapas, clima, eventos y chatbot.
- Mantener el proyecto escalable y claro para futuras fases.
