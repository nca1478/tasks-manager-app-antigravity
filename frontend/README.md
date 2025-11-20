# Task Manager Frontend

Frontend moderno para la aplicación de gestión de tareas construido con Next.js 16, TypeScript, Tailwind CSS 4 y arquitectura hexagonal.

## 🏗️ Arquitectura

Este proyecto sigue la **Arquitectura Hexagonal** adaptada al frontend, proporcionando:

- **Separación de responsabilidades**: Lógica de negocio independiente de la UI
- **Testabilidad**: Componentes y lógica fácilmente testeables
- **Mantenibilidad**: Código organizado y escalable
- **Reutilización**: Componentes y hooks reutilizables

### Estructura de Carpetas

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard page
│   │   ├── tasks/
│   │   │   └── page.tsx          # Tasks page
│   │   ├── users/
│   │   │   └── page.tsx          # Users page
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Register page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # Componentes de UI
│   │   ├── ui/                   # Componentes base (Shadcn-style)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── dialog.tsx
│   │   ├── layout/               # Componentes de layout
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── dashboard-layout.tsx
│   │   └── tasks/                # Componentes de tareas
│   │       ├── task-card.tsx
│   │       ├── create-task-dialog.tsx
│   │       └── edit-task-dialog.tsx
│   │
│   ├── domain/                   # Capa de Dominio
│   │   └── entities/             # Entidades y tipos
│   │       ├── user.entity.ts
│   │       └── task.entity.ts
│   │
│   ├── application/              # Capa de Aplicación
│   │   ├── hooks/                # React Query hooks
│   │   │   ├── use-tasks.ts
│   │   │   └── use-users.ts
│   │   └── stores/               # Zustand stores
│   │       ├── auth.store.ts
│   │       └── ui.store.ts
│   │
│   ├── infrastructure/           # Capa de Infraestructura
│   │   ├── api/                  # Servicios de API
│   │   │   ├── auth.api.ts
│   │   │   ├── user.api.ts
│   │   │   └── task.api.ts
│   │   └── http/                 # Cliente HTTP
│   │       └── http-client.ts
│   │
│   └── lib/                      # Utilidades
│       └── utils.ts              # Funciones helper
│
├── public/                       # Archivos estáticos
├── .env.example                  # Variables de entorno ejemplo
├── next.config.ts                # Configuración de Next.js
├── tailwind.config.ts            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── package.json
```

## 🛠️ Tecnologías

- **Framework**: Next.js 16.0.3 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4.1
- **Componentes UI**: Shadcn-inspired components
- **Estado Global**: Zustand 5.0.8
- **Estado Asíncrono**: TanStack React Query 5.90.5
- **HTTP Client**: Axios
- **Formularios**: React Hook Form + Zod
- **Notificaciones**: Sonner
- **Iconos**: Lucide React
- **Utilidades**: date-fns, clsx, tailwind-merge

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Backend API ejecutándose (ver carpeta backend)

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Configura la URL del backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🎨 Características del Diseño

### Diseño Moderno y Responsivo

- ✅ Interfaz tipo panel administrativo
- ✅ Diseño responsivo para móviles, tablets y desktop
- ✅ Tema claro y oscuro
- ✅ Animaciones suaves y transiciones
- ✅ Gradientes y efectos visuales modernos

### Componentes UI

- **Shadcn-inspired**: Componentes base estilizados y reutilizables
- **Accesibilidad**: Componentes accesibles por defecto
- **Variantes**: Múltiples variantes para cada componente
- **Consistencia**: Sistema de diseño coherente

### Experiencia de Usuario

- **Navegación intuitiva**: Sidebar con navegación clara
- **Feedback visual**: Notificaciones toast para acciones
- **Estados de carga**: Indicadores de carga en operaciones asíncronas
- **Validación de formularios**: Validación en tiempo real
- **Responsive**: Adaptado a todos los tamaños de pantalla

## 📱 Páginas y Funcionalidades

### Autenticación

#### Login (`/login`)

- Formulario de inicio de sesión
- Validación de credenciales
- Redirección automática al dashboard
- Manejo de errores

#### Registro (`/register`)

- Formulario de registro de usuario
- Validación de datos
- Creación automática de sesión
- Redirección al dashboard

### Dashboard (`/dashboard`)

- Vista general de estadísticas
- Tarjetas con métricas de tareas:
  - Total de tareas
  - Tareas pendientes
  - Tareas en progreso
  - Tareas completadas
- Diseño con iconos y colores distintivos

### Tareas (`/tasks`)

- **Listado de tareas**: Grid responsivo con todas las tareas del usuario
- **Crear tarea**: Modal con formulario para nueva tarea
  - Título (requerido)
  - Descripción
  - Prioridad (Low, Medium, High)
  - Fecha de vencimiento
- **Editar tarea**: Modal para modificar tarea existente
  - Todos los campos editables
  - Cambio de estado (Pending, In Progress, Completed)
- **Eliminar tarea**: Confirmación antes de eliminar
- **Filtros visuales**: Badges de estado y prioridad con colores

### Usuarios (`/users`)

- Listado de todos los usuarios registrados
- Información de cada usuario:
  - Nombre
  - Email
  - Fecha de registro
- Diseño en tarjetas con iconos

## 🔐 Autenticación y Seguridad

### JWT Authentication

- Token almacenado en localStorage
- Interceptor de Axios para agregar token automáticamente
- Redirección automática al login si el token expira
- Protección de rutas

### Gestión de Estado de Autenticación

```typescript
// Zustand store con persistencia
const { user, token, isAuthenticated, login, logout } = useAuthStore();
```

### Protección de Rutas

```typescript
useEffect(() => {
  if (!isAuthenticated) {
    router.push("/login");
  }
}, [isAuthenticated, router]);
```

## 🎯 Gestión de Estado

### Estado Global (Zustand)

#### Auth Store

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials) => Promise<void>;
  register: (data) => Promise<void>;
  logout: () => void;
}
```

#### UI Store

```typescript
interface UIState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  toggleTheme: () => void;
}
```

### Estado Asíncrono (React Query)

#### Hooks de Tareas

```typescript
const { data: tasks, isLoading } = useTasks();
const createTask = useCreateTask();
const updateTask = useUpdateTask();
const deleteTask = useDeleteTask();
```

#### Hooks de Usuarios

```typescript
const { data: users } = useUsers();
const { data: profile } = useProfile();
const updateUser = useUpdateUser();
```

## 🎨 Sistema de Diseño

### Colores

- **Primary**: Azul vibrante para acciones principales
- **Secondary**: Gris para acciones secundarias
- **Destructive**: Rojo para acciones destructivas
- **Muted**: Colores apagados para texto secundario
- **Accent**: Colores de acento para highlights

### Componentes Base

#### Button

```tsx
<Button variant="default | destructive | outline | secondary | ghost | link">
  Click me
</Button>
```

#### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

#### Input & Forms

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="email@example.com" />
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Utilidades
npm run lint         # Ejecuta el linter
```

## 🏃 Flujo de Trabajo

### 1. Autenticación

```
Usuario → Login/Register → API → Token JWT → Store → Dashboard
```

### 2. Gestión de Tareas

```
Dashboard → Tasks Page → Create/Edit/Delete → React Query → API → Update UI
```

### 3. Actualización de Estado

```
User Action → Mutation → API Call → Success → Invalidate Query → Refetch → UI Update
```

## 🎯 Principios de Arquitectura Hexagonal

### 1. Domain Layer

- **Entities**: Tipos e interfaces de negocio
- **Sin dependencias**: No depende de frameworks

### 2. Application Layer

- **Hooks**: Lógica de aplicación con React Query
- **Stores**: Gestión de estado global con Zustand
- **Depende solo del dominio**

### 3. Infrastructure Layer

- **API Services**: Comunicación con el backend
- **HTTP Client**: Configuración de Axios
- **Adaptadores**: Implementaciones concretas

### 4. Presentation Layer

- **Components**: Componentes de UI reutilizables
- **Pages**: Páginas de la aplicación
- **Layouts**: Estructuras de layout

## 📝 Buenas Prácticas Implementadas

✅ Arquitectura hexagonal adaptada al frontend  
✅ Componentes reutilizables y tipados  
✅ Gestión de estado eficiente (Zustand + React Query)  
✅ Validación de formularios  
✅ Manejo de errores consistente  
✅ Diseño responsivo  
✅ Tema claro/oscuro  
✅ Código limpio y mantenible  
✅ TypeScript estricto  
✅ SEO optimizado

## 🎨 Personalización

### Cambiar Colores del Tema

Edita `src/app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... más colores */
}
```

### Agregar Nuevos Componentes UI

1. Crea el componente en `src/components/ui/`
2. Usa el helper `cn()` para merge de clases
3. Exporta el componente

### Agregar Nuevas Páginas

1. Crea la carpeta en `src/app/`
2. Agrega `page.tsx`
3. Usa el layout `DashboardLayout` si es una página protegida

## 🤝 Contribución

1. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
2. Realiza cambios y commit: `git commit -m 'Agrega nueva funcionalidad'`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Crea un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ usando Next.js 16, TypeScript y Tailwind CSS 4
