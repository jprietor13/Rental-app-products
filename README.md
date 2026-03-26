# Rental App Products

Aplicación web de **ecommerce de alquiler de productos** construida con React, TypeScript y Vite. Permite a los usuarios explorar un catálogo de productos, agregarlos a un carrito de compras, configurar fechas de alquiler y cantidad, y confirmar el proceso de alquiler generando un archivo JSON descargable con el detalle completo.

---

## Tabla de Contenidos

- [Características principales](#características-principales)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Scripts disponibles](#scripts-disponibles)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Descripción detallada de cada módulo](#descripción-detallada-de-cada-módulo)
  - [API](#api---srcapi)
  - [Models](#models---srcmodels)
  - [Context](#context---srccontext)
  - [Hooks](#hooks---srchooks)
  - [Utils](#utils---srcutils)
  - [Layout](#layout---srclayout)
  - [Pages](#pages---srcpages)
  - [Components](#components---srccomponents)
  - [Routes](#routes---srcroutes)
- [Pruebas unitarias](#pruebas-unitarias)
- [Decisiones de arquitectura](#decisiones-de-arquitectura)
- [Decisiones técnicas](#decisiones-técnicas)
- [Dependencias](#dependencias)
- [Autor](#autor)

---

## Características principales

- **Catálogo de productos**: Listado de productos obtenidos desde una API REST externa con skeleton loading.
- **Detalle de producto**: Vista individual con carrusel de imágenes, precio por día y formulario de alquiler.
- **Carrito de compras**: Drawer lateral persistente con selección múltiple, eliminación individual/masiva de productos agregados y vaciado completo.
- **Persistencia en localStorage**: El carrito se guarda automáticamente y al recargar la página se ofrece restaurarlo o elimanarlo.
- **Cálculo de alquiler**: Configuración de fecha de inicio, fecha fin, cantidad y cálculo automático del total estimado.
- **Generación de JSON**: Al confirmar el alquiler se descarga un archivo `alquiler.json` con el detalle completo (fechas, días, producto, precio por día y precio total).
- **Diseño responsivo**: Interfaz estilizada con Tailwind CSS y componentes Material UI.
- **Pruebas unitarias**: Cobertura de la lógica de negocio con Jest y React Testing Library.

---

## Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | 19.2.4 | Biblioteca UI principal |
| **TypeScript** | 5.9.3 | Tipado estático |
| **Vite** | 8.0.1 | Bundler y servidor de desarrollo |
| **Tailwind CSS** | 4.2.2 | Framework de utilidades CSS |
| **Material UI** | 7.3.9 | Componentes UI (Drawer, Dialog, TextField y Button entre otros) |
| **React Router DOM** | 7.13.2 | Enrutamiento Single Page Application |
| **Axios** | 1.13.6 | Cliente HTTP para consumo de API de productos |
| **Day.js** | 1.11.20 | Manipulación de fechas |
| **Jest** | 30.3.0 | Framework de pruebas unitarias |
| **React Testing Library** | 16.3.2 | Testing de hooks y componentes React |
| **ts-jest** | 29.4.6 | Transformador TypeScript para Jest |
| **ESLint** | 9.39.4 | Linting de código |

---

## Requisitos previos

- **Node.js** >= 18.x
- **pnpm** (recomendado) o **npm**

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/jprietor13/Rental-app-products.git
cd Rental-app-products

# 2. Instalar dependencias
pnpm install
# o con npm:
npm install

# 3. Iniciar servidor de desarrollo
pnpm dev
# o con npm:
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

---

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `npm run dev` | Inicia el servidor de desarrollo con Vite |
| `build` | `npm run build` | Compila TypeScript y genera el build de producción |
| `preview` | `npm run preview` | Previsualiza el build de producción localmente |
| `lint` | `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
| `test` | `npm run test` | Ejecuta las pruebas unitarias con Jest |

---

## Arquitectura del proyecto

La aplicación sigue una arquitectura **modular basada en features** con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                        main.tsx                         │
│                    (CartProvider)                        │
├─────────────────────────────────────────────────────────┤
│                        App.tsx                          │
│              CartRestoreDialog + Layout                  │
├──────────────┬──────────────────────────────────────────┤
│   Header     │              AppRouter                   │
│   Footer     │        ┌───────────┬──────────────┐      │
│   CartDrawer │        │   Home    │ ProductDetail │      │
├──────────────┘        └───────────┴──────────────┘      │
├─────────────────────────────────────────────────────────┤
│  Hooks: useProducts, useRental, useCartDrawer,          │
│         useProductDetail, useCart                        │
├─────────────────────────────────────────────────────────┤
│  Context: CartProvider (useReducer + localStorage)       │
├─────────────────────────────────────────────────────────┤
│  Utils: rentalUtils, jsonUtils                          │
├─────────────────────────────────────────────────────────┤
│  API: productApi (Axios → API REST externa)             │
└─────────────────────────────────────────────────────────┘
```

### Flujo de datos

1. **`CartProvider`** envuelve toda la aplicación desde `main.tsx`, proporcionando el estado global del carrito con el hook `useReducer`.
2. **`useProducts`** consume la API REST y expone los productos a las páginas.
3. **`useRental`** encapsula la lógica de alquiler: fechas, cantidad, cálculo de total, agregar al carrito y confirmar.
4. **`useCartDrawer`** gestiona la selección múltiple y las acciones del drawer del carrito.
5. **`useProductDetail`** orquesta toda la lógica de la página de detalle en un solo hook.

---

## Estructura de carpetas

```
src/
├── __tests__/                    # Pruebas unitarias
│   ├── helpers/
│   │   └── renderWithCart.tsx    # Helper para renderizar hooks con CartProvider
│   ├── setup.ts                 # Configuración global de jest-dom
│   ├── cartReducer.test.ts      # Tests del reducer del carrito
│   ├── jsonUtils.test.ts        # Tests de generación de JSON
│   ├── rentalUtils.test.ts      # Tests de cálculos de alquiler
│
├── api/
│   └── productApi.ts            # Servicio HTTP para obtener productos
│
├── components/
│   ├── CartDrawer/              # Sub-componentes del carrito
│   │   ├── CartEmptyState.tsx   # Estado vacío del carrito
│   │   ├── CartFooter.tsx       # Footer con total y acciones
│   │   ├── CartHeader.tsx       # Header con título y botón cerrar
│   │   ├── CartItem.tsx         # Item individual del carrito
│   │   ├── CartItemList.tsx     # Lista de items del carrito
│   │   └── CartSelectAll.tsx    # Checkbox de seleccionar todos
│   ├── ProductDetail/           # Sub-componentes del detalle
│   │   ├── ProductDetailError.tsx      # Estado de error
│   │   ├── ProductDetailNotFound.tsx   # Producto no encontrado
│   │   └── ProductDetailSkeleton.tsx   # Skeleton de carga
│   ├── ui/                      # Componentes UI reutilizables
│   │   ├── AppButton.tsx        # Botones de agregar y confirmar
│   │   ├── AppDialog.tsx        # Diálogo de confirmación de alquiler
│   │   ├── AppImageCarousel.tsx # Carrusel de imágenes de producto
│   │   ├── AppSnackbar.tsx      # Notificación de éxito
│   │   └── AppTextField.tsx     # Campos de fecha y cantidad
│   ├── CartDrawer.tsx           # Componente principal del carrito (Drawer)
│   └── CartRestoreDialog.tsx    # Diálogo de restauración del carrito
│
├── context/
│   └── cart/
│       ├── cartContext.tsx      # CartProvider con useReducer + localStorage
│       ├── cartReducer.ts       # Reducer puro con acciones del carrito
│       ├── cartStorage.ts       # Funciones de persistencia en localStorage
│       └── useCart.ts           # Hook para consumir el CartContext
│
├── hooks/
│   ├── useCart.ts               # Hook para el estado open/close del drawer
│   ├── useCartDrawer.ts         # Hook con lógica de selección y acciones del drawer
│   ├── useProductDetail.ts      # Hook orquestador de la página de detalle
│   ├── useProducts.ts           # Hook de fetch de productos desde la API
│   └── useRental.ts             # Hook con lógica de alquiler y confirmación
│
├── layout/
│   ├── Footer.tsx               # Footer informativo persistente
│   ├── Header.tsx               # Header con logo y botón de carrito
│   ├── Layout.tsx               # Layout principal (Header + main + Footer)
│   └── ProductCard.tsx          # Tarjeta de producto para el catálogo
│
├── models/
│   ├── cart.ts                  # Interfaces del carrito (CartItem, CartState, CartAction, etc.)
│   ├── products.ts              # Interface Product
│   └── ui.ts                    # Interfaces de props para componentes UI
│
├── pages/
│   ├── Home.tsx                 # Página principal con catálogo de productos
│   └── ProductDetail.tsx        # Página de detalle de producto y alquiler
│
├── routes/
│   └── AppRouter.tsx            # Configuración de rutas (/ y /product/:id)
│
├── utils/
│   ├── jsonUtils.ts             # Generación y descarga de JSON de alquiler
│   └── rentalUtils.ts           # Funciones puras de cálculo (días, total)
│
├── App.tsx                      # Componente raíz
├── index.css                    # Estilos globales, animaciones y clases utilitarias
└── main.tsx                     # Punto de entrada (render + CartProvider)
```

---

## Descripción detallada de cada módulo

### API - `src/api/`

| Archivo | Descripción |
|---|---|
| `productApi.ts` | Servicio HTTP que consume la API REST externa mediante Axios. Obtiene el catálogo de productos desde `https://apim-dev-proxy.sodhc.co/test-jasson/api/category`. Maneja errores de Axios y soporta `AbortSignal` para cancelación de peticiones. |

### Models - `src/models/`

| Archivo | Descripción |
|---|---|
| `products.ts` | Define la interface `Product` con los campos `productId`, `displayName`, `mediaUrls` y `prices`. |
| `cart.ts` | Define `CartItem`, `CartState`, `CartAction` (union type con 5 acciones: ADD, REMOVE, REMOVE_MANY, CLEAR, SET_ITEMS), `CartContextValue` y las interfaces de props de todos los sub-componentes del carrito. |
| `ui.ts` | Define las interfaces de props para los componentes UI reutilizables: `AppButtonProps`, `AppDialogProps`, `AppImageCarouselProps`, `AppSnackbarProps`, `AppTextFieldProps`. |

### Context - `src/context/cart/`

| Archivo | Descripción |
|---|---|
| `cartReducer.ts` | Reducer puro que gestiona el estado del carrito. Soporta 5 acciones: **ADD** (sin duplicados), **REMOVE** (por id), **REMOVE_MANY** (por array de ids), **CLEAR** (vaciar) y **SET_ITEMS** (reemplazar). |
| `cartStorage.ts` | Capa de persistencia con `localStorage`. Funciones: `getStoredCart()` (con validación de JSON), `saveCart()` y `clearCart()`. |
| `cartContext.tsx` | `CartProvider` que combina `useReducer` con persistencia automática en `localStorage`. Gestiona la restauración del carrito guardado al recargar la página mostrando un diálogo de confirmación al usuario. |
| `useCart.ts` | Hook que consume el `CartContext` con validación de que se use dentro del `CartProvider`. |

### Hooks - `src/hooks/`

| Archivo | Descripción |
|---|---|
| `useProducts.ts` | Hook de fetch con `useState` + `useEffect`. Retorna `{ data, loading, error }`. Implementa `AbortController` para cleanup en desmontaje. |
| `useRental.ts` | Hook principal de lógica de negocio. Gestiona fechas de inicio/fin, cantidad, cálculo de días y total estimado. Parsea precios con separador de miles. Implementa `addToCart()` y `confirmRental()` (con validaciones y generación de JSON). Resetea fechas cuando el carrito se vacía. |
| `useCartDrawer.ts` | Hook de gestión del drawer. Maneja selección individual, seleccionar todos, eliminar uno, eliminar seleccionados, vaciar carrito y cálculo del total. |
| `useProductDetail.ts` | Hook orquestador que combina `useProducts`, `useRental`, `useCart` y estados de UI (snackbar, dialog). Extrae toda la lógica de la página de detalle para mantener el componente limpio. |
| `useCart.ts` | Hook simple para el estado open/close del drawer del carrito. |

### Utils - `src/utils/`

| Archivo | Descripción |
|---|---|
| `rentalUtils.ts` | Funciones puras: `calculateDays(start, end)` calcula la diferencia en días entre dos fechas; `calculateTotal(days, quantity, price)` calcula el total del alquiler. |
| `jsonUtils.ts` | `generateRentalJSON()` transforma los items del carrito en un array de objetos con los campos requeridos (`fechaInicio`, `fechaFinal`, `diasAlquiler`, `cantidad`, `producto`, `descripcionProducto`, `precioDia`, `precioTotal`). Parsea precios string con separador de miles. `downloadJSON()` genera un `Blob` y descarga el archivo `alquiler.json`. |

### Layout - `src/layout/`

| Archivo | Descripción |
|---|---|
| `Layout.tsx` | Layout principal que integra Header, CartDrawer, contenido principal y Footer. Usa flexbox con `min-h-screen` para que el footer siempre quede al fondo de la página. Incluye un efecto decorativo con gradiente blur. |
| `Header.tsx` | Header sticky con logo, nombre de la tienda y botón del carrito con badge animado que muestra la cantidad de items. |
| `Footer.tsx` | Footer informativo persistente con mi nombre, email y año dinámico. |
| `ProductCard.tsx` | Tarjeta de producto para el catálogo con imagen, nombre, precio por día y botón de ver detalle. Navega a `/product/:id` al hacer clic. |

### Pages - `src/pages/`

| Archivo | Descripción |
|---|---|
| `Home.tsx` | Página principal. Muestra un banner hero y una grilla responsiva de `ProductCard`. Incluye skeleton loading con 8 placeholders y estado de error. |
| `ProductDetail.tsx` | Página de detalle de producto. Usa `useProductDetail` para toda la lógica. Muestra carrusel de imágenes, precio, formulario de alquiler (fechas + cantidad), total estimado, botones de agregar al carrito y confirmar alquiler. Integra estados de loading, error y not-found como componentes separados. |

### Components - `src/components/`

#### CartDrawer (`components/CartDrawer/`)

| Componente | Descripción |
|---|---|
| `CartDrawer.tsx` | Drawer lateral (Material UI) que muestra el carrito completo. Orquesta los sub-componentes usando `useCartDrawer`. |
| `CartHeader.tsx` | Header del drawer con icono, título "Carrito" y botón de cerrar. |
| `CartEmptyState.tsx` | Estado vacío con icono animado (bounce) y mensaje invitando a agregar productos. |
| `CartSelectAll.tsx` | Checkbox para seleccionar/deseleccionar todos los productos. |
| `CartItemList.tsx` | Lista scrollable de productos en el carrito. |
| `CartItem.tsx` | Item del producto individual con checkbox de selección, imagen, nombre, precio formateado y botón eliminar. |
| `CartFooter.tsx` | Footer con total seleccionado, botón "Eliminar seleccionados" y botón "Vaciar carrito". |

#### ProductDetail (`components/ProductDetail/`)

| Componente | Descripción |
|---|---|
| `ProductDetailSkeleton.tsx` | Skeleton loading para la página de detalle con placeholders animados. |
| `ProductDetailError.tsx` | Componente de error con mensaje en fondo rojo. |
| `ProductDetailNotFound.tsx` | Componente "Producto no encontrado" en fondo ámbar. |

#### UI (`components/ui/`)

| Componente | Descripción |
|---|---|
| `AppButton.tsx` | Dos botones: "Agregar producto" (al carrito) y "Confirmar alquiler" (con validaciones). |
| `AppDialog.tsx` | Diálogo de confirmación de alquiler que muestra días, cantidad y total antes de confirmar. |
| `AppImageCarousel.tsx` | Carrusel de imágenes con navegación (flechas + dots + thumbnails). |
| `AppSnackbar.tsx` | Notificación de éxito con autocierre en 3 segundos. |
| `AppTextField.tsx` | Campos de formulario: fecha inicio, fecha fin y cantidad. Los campos se habilitan progresivamente. |

#### Otros componentes

| Componente | Descripción |
|---|---|
| `CartRestoreDialog.tsx` | Diálogo que aparece al cargar la app si hay un carrito guardado en localStorage. Ofrece restaurarlo o eliminarlo. |

### Routes - `src/routes/`

| Archivo | Descripción |
|---|---|
| `AppRouter.tsx` | Configuración de rutas con React Router DOM v7. Dos rutas: `/` (Home) y `/product/:id` (ProductDetail). |

---

## Pruebas unitarias

Las pruebas se ejecutan con **Jest 30** + **ts-jest** + **React Testing Library** en un entorno **jsdom**.

### Ejecutar las pruebas

```bash
npm run test
```

### Archivos de test

| Archivo | Módulo testeado | Tests | Tipo |
|---|---|---|---|
| `cartReducer.test.ts` | `context/cart/cartReducer.ts` | 6 | Reducer puro |
| `rentalUtils.test.ts` | `utils/rentalUtils.ts` | 10 | Funciones puras |
| `jsonUtils.test.ts` | `utils/jsonUtils.ts` | 6 | Función pura |

**Total: 22 tests en 3 suites**

### Configuración

- **`jest.config.mjs`**: Configuración principal de Jest con `ts-jest` como transformador y `jsdom` como entorno.
- **`src/__tests__/setup.ts`**: Importa `@testing-library/jest-dom` para matchers extendidos.
- **`src/__tests__/helpers/renderWithCart.tsx`**: Helper que envuelve `renderHook` con `CartProvider` para testear hooks que dependen del contexto del carrito.

### Casos de test destacados

- **cartReducer**: Verifica ADD sin duplicados, REMOVE por id, REMOVE_MANY, CLEAR, SET_ITEMS.
- **rentalUtils**: Valida cálculo de días entre fechas, fechas iguales, fechas invertidas, límites de mes, y cálculo de totales con valores en 0.
- **jsonUtils**: Verifica estructura JSON, parseo de precios numéricos y string con separador de miles, cálculo de `precioTotal`, múltiples items y precio 0.

---

## Decisiones de arquitectura

### 1. Separación en Custom Hooks

Toda la lógica de negocio está encapsulada en hooks personalizados (`useRental`, `useCartDrawer`, `useProductDetail`, `useProducts`), manteniendo los componentes de UI como funciones de presentación puras. Esto permite:
- Testear la lógica independientemente de la UI.
- Reutilizar la lógica en diferentes contextos.
- Reducir el acoplamiento entre capas.

### 2. Context + useReducer para el carrito

Se eligió `useReducer` sobre `useState` para el estado del carrito porque:
- El carrito tiene múltiples acciones (ADD, REMOVE, REMOVE_MANY, CLEAR, SET_ITEMS).
- El reducer es una función pura, ideal para testing.
- Las transiciones de estado son predecibles y trazables.

### 3. Persistencia con localStorage

El carrito se persiste automáticamente en `localStorage` y al recargar la app se ofrece un diálogo de restauración. Esto mejora la experiencia del usuario sin necesidad de un backend.

### 4. Componentes de estado (Skeleton, Error, NotFound)

Los estados de carga, error y "no encontrado" se extrajeron como componentes independientes para:
- Mantener la página de detalle limpia.
- Reutilizar patrones de UI consistentes.
- Facilitar el mantenimiento.

### 5. Estructura de carpetas por dominio

Los componentes están organizados por dominio (`CartDrawer/`, `ProductDetail/`, `ui/`) en lugar de por tipo, facilitando la localización de código relacionado.

### 6. Funciones utilitarias puras

Los cálculos (`calculateDays`, `calculateTotal`, `generateRentalJSON`) se extrajeron a `utils/` como funciones puras sin dependencias de React, lo que las hace:
- Fácilmente testeables.
- Reutilizables fuera de componentes.
- Predecibles y sin side effects.

---

## Decisiones técnicas

### Tailwind CSS v4

Se utiliza la sintaxis moderna de Tailwind version 4 con el modificador `!important` como sufijo (`class!` en vez de `!class`). Ejemplo: `text-brand-600!` para sobreescribir estilos de Material UI ya que al hacerlo con CSS puro no funcionaba correctamente por temas de especificidad de clases y encapsulamiento.

### Paleta de colores personalizada

Se definió una paleta `brand` en `tailwind.config.js` con 10 tonos (50-900) para mantener consistencia visual en toda la aplicación, junto con sombras personalizadas (`shadow-soft` y `shadow-lift`).

### Animaciones CSS personalizadas

Se implementaron animaciones en `index.css`:
- **`animate-fade-in`**: Entrada suave con opacidad y desplazamiento vertical.
- **`animate-slide-up`**: Entrada desde abajo para la página de detalle.
- **`skeleton`**: Efecto wave para los loading skeletons.
- **`glass-panel`**: Efecto glassmorphism con `backdrop-filter: blur`.

### Parseo de precios

Los precios de la API pueden venir como strings con formato de separador de miles (ej: `"185.900"`). Se implementó un parseo consistente en toda la aplicación: `.replace(/\./g, "").replace(",", ".")` para convertirlos a números válidos.

### Generación de JSON descargable

En lugar de enviar datos a un backend (no disponible), se genera un archivo JSON en el navegador usando `Blob` + `URL.createObjectURL` + `<a>` dinámico para la descarga. considero que es una solución suficiente para una aplicación de solo frontend.

### Configuración de deploy (Vercel)

Se incluye `vercel.json` con rewrites para soportar client-side routing de React Router DOM en producción. ya que si no se configura, los enlaces directos a rutas como `/product/123` se romperán.

---

## Dependencias

### Producción

| Paquete | Uso |
|---|---|
| `react`, `react-dom` | Biblioteca UI principal |
| `react-router-dom` | Enrutamiento SPA |
| `axios` | Cliente HTTP para consumo de API REST |
| `@mui/material`, `@mui/icons-material` | Componentes UI y iconos (Drawer, Dialog, Button, TextField, etc.) |
| `@mui/x-date-pickers` | Componentes de selección de fecha |
| `@emotion/react`, `@emotion/styled` | Motor de estilos requerido por Material UI |
| `dayjs` | Manipulación de fechas (requerido por MUI Date Pickers) |

### Desarrollo

| Paquete | Uso |
|---|---|
| `vite`, `@vitejs/plugin-react` | Bundler y servidor de desarrollo con HMR |
| `typescript` | Tipado estático |
| `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer` | Framework CSS y procesamiento PostCSS |
| `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | Linting |
| `jest`, `jest-environment-jsdom`, `ts-jest`, `@types/jest` | Framework de pruebas unitarias |
| `@testing-library/react`, `@testing-library/react-hooks`, `@testing-library/jest-dom` | Testing de componentes y hooks React |

---

## Autor

**Juan Prieto**
Email: [jp1739@gmail.com](mailto:jp1739@gmail.com)
