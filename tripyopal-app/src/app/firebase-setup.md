# Firebase Setup para TripYopal

1. Crea un proyecto en Firebase Console.
2. Activa Firestore Database.
3. Habilita Authentication con email/password.
4. Copia las credenciales del proyecto a .env.local.
5. Crea colecciones: places y events.
6. Usa documentos con campos como:
   - places: nombre, categoria, descripcion, precio
   - events: titulo, fecha, lugar, descripcion

Ejemplo de estructura de documentos:

places/{id}
- nombre: "Parque La Cañada"
- categoria: "Naturaleza"
- descripcion: "Espacio ideal para caminar"
- precio: "Gratis"

events/{id}
- titulo: "Festival de la Cultura Llanera"
- fecha: "15 de agosto"
- lugar: "Parque principal"
- descripcion: "Evento cultural"
