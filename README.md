# 🚀 Task Manager - Full Stack Application

Aplicación fullstack moderna de gestión de tareas y usuarios construida con **NestJS**, **Next.js**, **PostgreSQL**, **Prisma**, y **Arquitectura Hexagonal**.

## 📋 Descripción

Task Manager es una aplicación completa que permite a los usuarios gestionar sus tareas de manera eficiente. Cada usuario puede crear, editar, eliminar y organizar sus propias tareas con diferentes estados y prioridades. La aplicación cuenta con un sistema de autenticación robusto y una interfaz moderna tipo panel administrativo.

## ✨ Características Principales

### 🔐 Autenticación y Seguridad

- ✅ Sistema de registro e inicio de sesión
- ✅ Autenticación JWT
- ✅ Protección de rutas
- ✅ Hashing de contraseñas con bcrypt
- ✅ Cada usuario solo puede ver y gestionar sus propias tareas

### 📝 Gestión de Tareas (CRUD Completo)

- ✅ Crear tareas con título, descripción, prioridad y fecha de vencimiento
- ✅ Editar tareas existentes
- ✅ Cambiar estado de tareas (Pending, In Progress, Completed)
- ✅ Eliminar tareas
- ✅ Visualización en tarjetas con badges de estado y prioridad
- ✅ Filtros visuales por estado y prioridad

### 👥 Gestión de Usuarios (CRUD Completo)

- ✅ Crear usuarios
- ✅ Ver lista de todos los usuarios
- ✅ Actualizar información de usuario
- ✅ Eliminar usuarios
- ✅ Perfil de usuario

### 🎨 Interfaz de Usuario

- ✅ Diseño moderno tipo panel administrativo
- ✅ Tema claro y oscuro
- ✅ Diseño responsivo (móvil, tablet, desktop)
- ✅ Animaciones suaves
- ✅ Notificaciones toast
- ✅ Componentes reutilizables estilo Shadcn

### 📊 Dashboard

- ✅ Estadísticas de tareas
- ✅ Métricas visuales
- ✅ Vista general del sistema

## 🏗️ Arquitectura

El proyecto implementa **Arquitectura Hexagonal** (Ports & Adapters) tanto en el backend como en el frontend, proporcionando:

- **Separación de responsabilidades**
- **Independencia de frameworks**
- **Testabilidad**
- **Mantenibilidad**
- **Escalabilidad**

### Estructura del Proyecto

```
tasks-manager-app-antigravity/
├── backend/                    # API Backend (NestJS)
│   ├── prisma/                 # Esquema de base de datos
│   ├── src/
│   │   ├── domain/             # Entidades y repositorios (Puertos)
│   │   ├── application/        # Casos de uso y DTOs
│   │   ├── infrastructure/     # Adaptadores (Controllers, Prisma, Auth)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── docker-compose.yml      # PostgreSQL container
│   └── README.md
│
└── frontend/                   # Frontend (Next.js)
    ├── src/
    │   ├── app/                # Next.js App Router (Páginas)
    │   ├── components/         # Componentes UI
    │   ├── domain/             # Entidades y tipos
    │   ├── application/        # Hooks y Stores
    │   ├── infrastructure/     # API y HTTP Client
    │   └── lib/                # Utilidades
    └── README.md
```

## 🛠️ Stack Tecnológico

### Backend

- **Framework**: NestJS 11.1.9
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL (última versión)
- **ORM**: Prisma (última versión)
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Contenedor**: Docker

### Frontend

- **Framework**: Next.js 16.0.3 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4.1
- **Componentes**: Shadcn-inspired
- **Estado Global**: Zustand 5.0.8
- **Estado Asíncrono**: TanStack React Query 5.90.5
- **HTTP Client**: Axios
- **Formularios**: React Hook Form + Zod
- **Notificaciones**: Sonner

## 📦 Instalación y Configuración

### Requisitos Previos

- Node.js v18 o superior
- npm o yarn
- Docker y Docker Compose

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd tasks-manager-app-antigravity
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar base de datos con Docker
docker-compose up -d

# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Iniciar servidor de desarrollo
npm run start:dev
```

El backend estará disponible en `http://localhost:3001/api`

### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 🚀 Uso de la Aplicación

### 1. Registro de Usuario

1. Accede a `http://localhost:3000`
2. Haz clic en "Sign up"
3. Completa el formulario de registro
4. Serás redirigido automáticamente al dashboard

### 2. Inicio de Sesión

1. Accede a `http://localhost:3000/login`
2. Ingresa tus credenciales
3. Accede al dashboard

### 3. Gestión de Tareas

1. Navega a la sección "Tasks"
2. Haz clic en "New Task" para crear una tarea
3. Completa el formulario con:
   - Título (requerido)
   - Descripción (opcional)
   - Prioridad (Low, Medium, High)
   - Fecha de vencimiento (opcional)
4. Edita tareas haciendo clic en el ícono de lápiz
5. Elimina tareas haciendo clic en el ícono de papelera

### 4. Ver Usuarios

1. Navega a la sección "Users"
2. Visualiza todos los usuarios registrados

## 📡 API Endpoints

### Autenticación

```
POST /api/auth/register    # Registro de usuario
POST /api/auth/login       # Inicio de sesión
```

### Usuarios (Requiere autenticación)

```
GET    /api/users          # Obtener todos los usuarios
GET    /api/users/me       # Obtener perfil actual
GET    /api/users/:id      # Obtener usuario por ID
PATCH  /api/users/:id      # Actualizar usuario
DELETE /api/users/:id      # Eliminar usuario
```

### Tareas (Requiere autenticación)

```
GET    /api/tasks          # Obtener tareas del usuario
GET    /api/tasks/:id      # Obtener tarea por ID
POST   /api/tasks          # Crear tarea
PATCH  /api/tasks/:id      # Actualizar tarea
DELETE /api/tasks/:id      # Eliminar tarea
```

## 🗄️ Modelo de Datos

### User

```typescript
{
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}
```

### Task

```typescript
{
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎯 Arquitectura Hexagonal

### Backend

#### Domain Layer (Núcleo)

- **Entities**: Lógica de negocio pura
- **Repository Interfaces**: Contratos (ports)
- Sin dependencias externas

#### Application Layer

- **Use Cases**: Orquestación de lógica
- **DTOs**: Validación de datos
- Depende solo del dominio

#### Infrastructure Layer

- **Controllers**: Manejo de HTTP
- **Repositories**: Implementación con Prisma
- **Auth**: JWT y Passport
- **Modules**: Inyección de dependencias

### Frontend

#### Domain Layer

- **Entities**: Tipos e interfaces

#### Application Layer

- **Hooks**: React Query
- **Stores**: Zustand

#### Infrastructure Layer

- **API Services**: Comunicación con backend
- **HTTP Client**: Axios configurado

#### Presentation Layer

- **Components**: UI reutilizables
- **Pages**: Rutas de la aplicación

## 📝 Scripts Disponibles

### Backend

```bash
npm run start:dev        # Desarrollo
npm run build            # Build
npm run start:prod       # Producción
npm run prisma:generate  # Generar Prisma Client
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio
```

### Frontend

```bash
npm run dev              # Desarrollo
npm run build            # Build
npm run start            # Producción
npm run lint             # Linter
```

## 🐳 Docker

### Iniciar Base de Datos

```bash
cd backend
docker-compose up -d
```

### Detener Base de Datos

```bash
docker-compose down
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de datos en backend
- ✅ Protección CORS
- ✅ Variables de entorno para secretos
- ✅ Autorización por usuario (cada usuario solo ve sus tareas)

## 📱 Responsive Design

La aplicación es completamente responsiva:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Temas

- **Light Mode**: Tema claro por defecto
- **Dark Mode**: Tema oscuro con colores optimizados
- Toggle en el sidebar

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ usando las mejores prácticas de desarrollo fullstack y arquitectura hexagonal.

## 📚 Documentación Adicional

- [Backend README](./backend/README.md) - Documentación detallada del backend
- [Frontend README](./frontend/README.md) - Documentación detallada del frontend

## 🎓 Aprendizajes

Este proyecto demuestra:

- ✅ Arquitectura Hexagonal en fullstack
- ✅ Clean Code y SOLID principles
- ✅ TypeScript avanzado
- ✅ Gestión de estado moderna
- ✅ Autenticación y autorización
- ✅ Diseño de APIs RESTful
- ✅ UI/UX moderno
- ✅ Código mantenible y escalable

---

**¡Gracias por usar Task Manager!** 🚀
