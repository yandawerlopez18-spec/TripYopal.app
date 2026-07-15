# Arquitectura propuesta para TripYopal

## Capas
1. Presentation
   - Páginas y componentes de UI
   - Ejemplo: home, lugares, eventos, rutas, admin

2. Services
   - Lógica de acceso a datos
   - Ejemplo: services/places.ts, services/events.ts, services/routes.ts

3. Data Layer
   - Firebase Auth, Firestore, Storage
   - Ejemplo: lib/firebase.ts

4. Types
   - Modelos centralizados de negocio
   - Ejemplo: types/index.ts

## Recomendación
La arquitectura actual ya sirve como base, pero conviene mejorarla con:
- separación de servicios por dominio
- modelos tipados centralizados
- componentes reutilizables
- una carpeta dedicada a hooks y utilidades
- una capa de API para integrar chatbot y mapas

## Estructura recomendada
src/app/
  components/
  services/
  lib/
  types/
  pages o routes/
