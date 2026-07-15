export type Lugar = {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
};

export type Evento = {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
};

export const lugares: Lugar[] = [
  {
    id: 1,
    nombre: "Parque La Cañada",
    categoria: "Naturaleza",
    descripcion: "Espacio ideal para caminar, descansar y disfrutar de la vida al aire libre.",
    precio: "Gratis",
  },
  {
    id: 2,
    nombre: "Centro Histórico de Yopal",
    categoria: "Cultural",
    descripcion: "Recorrido por la identidad local, arquitectura y gastronomía típica.",
    precio: "Gratis",
  },
  {
    id: 3,
    nombre: "Reserva Natural de la región",
    categoria: "Aventura",
    descripcion: "Lugar perfecto para recorridos ecológicos y fotografía de fauna y flora.",
    precio: "$20.000 aprox.",
  },
];

export const eventos: Evento[] = [
  {
    id: 1,
    titulo: "Festival de la Cultura Llanera",
    fecha: "15 de agosto",
    lugar: "Parque principal",
    descripcion: "Una jornada con música, gastronomía y tradición llanera para toda la familia.",
  },
  {
    id: 2,
    titulo: "Noche de estrellas en Yopal",
    fecha: "22 de agosto",
    lugar: "Mirador del sur",
    descripcion: "Observación astronómica y actividades educativas para visitantes y turistas.",
  },
  {
    id: 3,
    titulo: "Mercado artesanal local",
    fecha: "Cada fin de semana",
    lugar: "Plaza central",
    descripcion: "Encuentra productos, muestras culturales y experiencias auténticas del territorio.",
  },
];
