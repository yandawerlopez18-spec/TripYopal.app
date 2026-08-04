-- AlterTable
ALTER TABLE "SiteContent" ADD COLUMN     "hero" JSONB NOT NULL DEFAULT '{"badge":"Naturaleza, cultura y aventura en los Llanos Orientales","title":"Vive lo mejor de Yopal-Casanare","subtitle":"Naturaleza, cultura y aventura en el corazón de los Llanos Orientales. Explora, vive y conecta.","backgroundImage":"/fondo-casanare.jpg","videoUrl":""}',
ADD COLUMN     "images" JSONB NOT NULL DEFAULT '{"weatherIllustration":"/clima.png","recommendationsIllustration":"/recomendaciones.png","mascot":"/circulo.png","chatWidget":"/chat.png"}',
ADD COLUMN     "social" JSONB NOT NULL DEFAULT '{"facebook":"","instagram":"","gmail":"","x":"","whatsapp":""}';
