# **Búsqueda de Direcciones y Autocompletado con Google Places & Firebase**

Este proyecto, desarrollado en **React** con **TypeScript**, implementa una funcionalidad de búsqueda de direcciones utilizando la **API de Google Places**. El sistema permite que los usuarios ingresen una dirección en un campo de búsqueda que ofrece sugerencias automáticas en tiempo real, gracias a la funcionalidad de autocompletado de Google.

Una vez que el usuario selecciona una dirección, esta se guarda en una base de datos **Firestore** en **Firebase** para su posterior consulta o análisis.

## **Características**

- **Autocompletado de direcciones**: Utiliza la API de Google Places para sugerir direcciones mientras el usuario escribe, mejorando la experiencia de búsqueda.
- **Guardar direcciones en Firebase**: Después de seleccionar una dirección, se guarda en **Firestore** para tener un registro persistente.
- **Mapa interactivo**: El mapa de Google Maps se actualiza automáticamente para mostrar la ubicación seleccionada por el usuario, con un marcador en el mapa.
- **Interfaz responsiva**: Utilizando **Chakra UI**, el diseño es completamente responsivo y se adapta bien a dispositivos móviles y escritorios.
- **Animaciones y transiciones**: Animaciones suaves en el título utilizando **Framer Motion** para una mejor experiencia visual.

## **Tecnologías Utilizadas**

- **React**: Librería para construir interfaces de usuario interactivas.
- **TypeScript**: Superset de JavaScript para mejorar la calidad y escalabilidad del código.
- **Google Places API**: API para buscar lugares y obtener sugerencias de direcciones en tiempo real.
- **Firebase**: Plataforma de desarrollo de Google que incluye **Firestore** para almacenamiento de datos en tiempo real.
- **Chakra UI**: Framework de componentes para React que proporciona una interfaz visual moderna y accesible.
- **Framer Motion**: Librería de animaciones para React que permite agregar transiciones fluidas y efectivas.
- **React Google Maps API**: Para la integración del mapa y los marcadores de Google Maps en la aplicación.