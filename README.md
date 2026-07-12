# Notes Taking App

Aplicación web sencilla para crear, editar, copiar, guardar y eliminar notas directamente en el navegador.

## Características

- Crear nuevas notas con el botón `Add Note`.
- Editar el contenido de cada nota.
- Asignar un nombre o título a cada nota.
- Guardar notas en `localStorage` para que persistan al recargar la página.
- Copiar el contenido de una nota al portapapeles.
- Eliminar notas desde su icono de papelera.

## Tecnologías

- HTML
- CSS
- JavaScript
- Font Awesome para los iconos

## Cómo ejecutar el proyecto

Este proyecto no necesita instalación de dependencias ni compilación.

1. Abre `index.html` en tu navegador.
2. También puedes usar una extensión como Live Server si prefieres desarrollo local.

## Uso

1. Al abrir la app, se carga una nota vacía si no hay información guardada.
2. Escribe el título y el contenido de la nota.
3. Haz clic en el icono de guardar para persistirla en el navegador.
4. Usa el icono de copiar para copiar el texto de la nota.
5. Usa el icono de papelera para eliminarla.
6. Pulsa `Add Note` para crear una nueva nota.

## Persistencia de datos

Las notas se guardan en `localStorage`, así que:

- Se conservan al recargar la página.
- Solo están disponibles en el mismo navegador y dispositivo.
- Si limpias los datos del navegador, las notas se perderán.

## Estructura del proyecto

- `index.html` - Estructura principal de la aplicación.
- `styles.css` - Estilos visuales de la interfaz.
- `logic.js` - Lógica para crear, guardar, copiar y borrar notas.

## Notas

- La aplicación usa Font Awesome desde un CDN externo para mostrar los iconos.
- El proyecto está pensado como una app de notas minimalista y sin backend.

