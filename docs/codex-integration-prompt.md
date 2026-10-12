# Prompt / instrucciones para Codex

Integra los nuevos assets del pack en el sitio de OMICRON sin romper el layout actual.

## 1) Ubicación esperada de assets
Usa estas rutas dentro de `public/images/`:
- `public/images/parallax/hero-parallax-tall.png`
- `public/images/team/team-placeholder.png`
- `public/images/how-we-work/step-01-entender.png`
- `public/images/how-we-work/step-02-disenar.png`
- `public/images/how-we-work/step-03-implementar.png`
- `public/images/how-we-work/step-04-evaluar-aprender.png`

## 2) Parallax más notorio
- Sustituye el fondo actual de la sección con efecto parallax por `hero-parallax-tall.png`.
- Asegúrate de que el contenedor tenga altura suficiente para aprovechar el alto extra de la imagen.
- Mantén una superposición oscura o degradado suave para preservar legibilidad del texto.
- Ajusta el efecto para que el desplazamiento vertical sea más notorio que ahora, pero sin causar saltos bruscos ni artefactos.
- Prioriza `background-size: cover`, `background-position: center`, y revisa el comportamiento en desktop y mobile.

## 3) Placeholder del equipo
- Usa `team-placeholder.png` como imagen fallback para perfiles del equipo cuando no exista foto real.
- Mantén el mismo ratio, máscara o estilo de avatar que usa la tarjeta actual del team.
- No deformar ni recortar de forma agresiva; si hace falta, usar `object-fit: cover` o el patrón equivalente según el componente.

## 4) Imágenes del carrusel “Cómo trabajamos”
Asigna una imagen específica por step:
- Step 1 / Entender → `step-01-entender.png`
- Step 2 / Diseñar → `step-02-disenar.png`
- Step 3 / Implementar → `step-03-implementar.png`
- Step 4 / Evaluar / Aprender → `step-04-evaluar-aprender.png`

## 5) Requisitos visuales del carrusel
- Las imágenes deben encajar bien tanto en desktop como en mobile.
- Si el layout usa una imagen lateral o una tarjeta visual, mantén consistencia entre los cuatro pasos.
- Evita crops que corten rostros o el foco narrativo principal.
- Si el step usa overlay, asegúrate de que el texto siga siendo muy legible.

## 6) Legal pages
Crea o completa dos vistas/páginas enlazadas desde el footer:
- Términos de uso
- Política de privacidad

Usa como base los archivos dentro de `docs/legal/`:
- `terms-of-use-es.md`
- `terms-of-use-en.md`
- `privacy-policy-es.md`
- `privacy-policy-en.md`

No hace falta un diseño complejo: basta una página limpia, legible, institucional y responsive, reutilizando el layout general del sitio.

## 7) Entregable esperado
- Assets integrados y funcionando.
- Footer links de Términos y Privacidad apuntando a páginas reales.
- Fallback del team funcionando.
- Carrusel mostrando una imagen distinta en cada step.
- Parallax visualmente más fuerte y mejor aprovechado.
- Validar en ES/EN y en desktop/mobile.
