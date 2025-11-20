# 🚀 Task Manager - Full Stack Application

Aplicación fullstack moderna de gestión de tareas y usuarios construida con **NestJS**, **Next.js 16**, **PostgreSQL**, **Prisma**, **Tailwind CSS 4**, y **Arquitectura Hexagonal**.

## 📋 Descripción

Task Manager es una aplicación completa que permite a los usuarios gestionar sus tareas de manera eficiente. Cada usuario puede crear, editar, eliminar y organizar sus propias tareas con diferentes estados y prioridades. La aplicación cuenta con un sistema de autenticación robusto, internacionalización completa (i18n), y una interfaz moderna tipo panel administrativo con soporte para temas claro/oscuro.

## ✨ Características Principales

### 🔐 Autenticación y Seguridad

- ✅ Sistema de registro e inicio de sesión
- ✅ Autenticación JWT con Passport
- ✅ Protección de rutas en frontend y backend
- ✅ Hashing de contraseñas con bcrypt
- ✅ Cada usuario solo puede ver y gestionar sus propias tareas
- ✅ Validación de datos con class-validator y Zod
- ✅ CORS configurado

### 📝 Gestión de Tareas (CRUD Completo)

- ✅ Crear tareas con título, descripción, prioridad y fecha de vencimiento
- ✅ Editar tareas existentes
- ✅ Cambiar estado de tareas (Pending, In Progress, Completed)
- ✅ Eliminar tareas con confirmación
- ✅ Visualización en tarjetas con badges de estado y prioridad
- ✅ **Filtros avanzados**: Por estado y prioridad
- ✅ **Ordenamiento**: Por fecha, título, prioridad, estado o fecha de vencimiento
- ✅ **Orden ascendente/descendente**: Newest first o Oldest first
- ✅ Botón para limpiar todos los filtros
- ✅ Relación automática con el usuario autenticado

### 👥 Gestión de Usuarios y Perfil

- ✅ Crear usuarios
- ✅ Ver lista de todos los usuarios
- ✅ Actualizar información de usuario
- ✅ Eliminar usuarios
- ✅ **Página de perfil personal**:
  - Actualizar nombre y email
  - Cambiar contraseña de forma segura
  - Validación de contraseña actual
  - Confirmación de nueva contraseña
- ✅ Visualización de fecha de registro

### 🌍 Internacionalización (i18n)

- ✅ Soporte completo para inglés (en) y español (es)
- ✅ Cambio de idioma en tiempo real
- ✅ Persistencia del idioma seleccionado
- ✅ Traducción automática de toda la interfaz
- ✅ Backend responde en el idioma solicitado
- ✅ Botón de cambio de idioma en sidebar y páginas de autenticación

### 🎨 Interfaz de Usuario

- ✅ Diseño moderno tipo panel administrativo
- ✅ Tema claro y oscuro con toggle
- ✅ Diseño responsivo (móvil, tablet, desktop)
- ✅ **Sidebar colapsable automático en móvil** al navegar
- ✅ Animaciones suaves y transiciones
- ✅ **Notificaciones toast traducidas** con Sonner
- ✅ Componentes reutilizables estilo Shadcn
- ✅ **Componentes Select mejorados** con @radix-ui/react-select
- ✅ Gradientes y efectos visuales modernos
- ✅ Iconos con Lucide React
- ✅ **Spinners de carga** en páginas de autenticación

### 📊 Dashboard

- ✅ Estadísticas de tareas en tiempo real
- ✅ Métricas visuales con tarjetas
- ✅ Vista general del sistema
- ✅ Contadores de tareas por estado

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
├── backend/                           # API Backend (NestJS)
│   ├── prisma/
│   │   ├── migrations/                # Migraciones de base de datos
│   │   └── schema.prisma              # Esquema de Prisma
│   ├── src/
│   │   ├── domain/                    # Capa de Dominio (Núcleo)
│   │   │   ├── entities/              # Entidades de negocio
│   │   │   ├── repositories/          # Interfaces de repositorios (Puertos)
│   │   │   └── services/              # Interfaces de servicios
│   │   ├── application/               # Capa de Aplicación
│   │   │   ├── dtos/                  # Data Transfer Objects
│   │   │   └── use-cases/             # Casos de uso
│   │   ├── infrastructure/            # Capa de Infraestructura (Adaptadores)
│   │   │   ├── auth/                  # Autenticación (JWT, Guards, Strategies)
│   │   │   ├── controllers/           # Controladores HTTP
│   │   │   ├── database/              # Prisma Service
│   │   │   ├── i18n/                  # Archivos de traducción (en, es)
│   │   │   ├── modules/               # Módulos de NestJS
│   │   │   ├── repositories/          # Implementaciones de repositorios
│   │   │   └── services/              # Implementaciones de servicios
│   │   ├── app.module.ts              # Módulo principal
│   │   └── main.ts                    # Punto de entrada
│   ├── docker-compose.yml             # PostgreSQL container
│   ├── .env.example                   # Variables de entorno ejemplo
│   └── README.md
│
├── frontend/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                       # Next.js App Router
│   │   │   ├── dashboard/             # Página de dashboard
│   │   │   ├── tasks/                 # Página de tareas con filtros
│   │   │   ├── users/                 # Página de usuarios
│   │   │   ├── profile/               # Página de perfil personal
│   │   │   ├── login/                 # Página de login
│   │   │   ├── register/              # Página de registro
│   │   │   ├── layout.tsx             # Layout principal
│   │   │   ├── page.tsx               # Página de inicio
│   │   │   └── globals.css            # Estilos globales
│   │   ├── components/                # Componentes de UI
│   │   │   ├── ui/                    # Componentes base (Button, Card, Input, Select, etc.)
│   │   │   ├── layout/                # Componentes de layout (Sidebar, Header)
│   │   │   ├── tasks/                 # Componentes de tareas
│   │   │   │   ├── task-card.tsx      # Tarjeta de tarea
│   │   │   │   ├── task-filters.tsx   # Filtros y ordenamiento
│   │   │   │   ├── create-task-dialog.tsx
│   │   │   │   └── edit-task-dialog.tsx
│   │   │   ├── providers/             # Providers (i18n, theme)
│   │   │   └── language-switcher.tsx  # Selector de idioma
│   │   ├── domain/                    # Capa de Dominio
│   │   │   └── entities/              # Entidades y tipos
│   │   ├── application/               # Capa de Aplicación
│   │   │   ├── hooks/                 # React Query hooks
│   │   │   └── stores/                # Zustand stores (auth, ui, language)
│   │   ├── infrastructure/            # Capa de Infraestructura
│   │   │   ├── api/                   # Servicios de API
│   │   │   ├── http/                  # Cliente HTTP (Axios)
│   │   │   └── i18n/                  # Configuración y mensajes de i18n
│   │   └── lib/                       # Utilidades
│   ├── .env.example                   # Variables de entorno ejemplo
│   └── README.md
│
├── docs/                              # Documentación
│   ├── I18N_IMPLEMENTATION.md         # Guía de implementación de i18n
│   ├── PRUEBAS_I18N.md                # Pruebas de i18n
│   └── RESUMEN_I18N.md                # Resumen de i18n
│
└── README.md                          # Este archivo
```

## 🛠️ Stack Tecnológico

### Backend

- **Framework**: NestJS 11.1.9
- **Lenguaje**: TypeScript 5.1.3
- **Base de Datos**: PostgreSQL 16 (Alpine)
- **ORM**: Prisma 6.1.0
- **Autenticación**: JWT + Passport (passport-jwt, passport-local)
- **Validación**: class-validator, class-transformer
- **Internacionalización**: nestjs-i18n 10.5.1
- **Seguridad**: bcrypt 5.1.1
- **Contenedor**: Docker & Docker Compose

### Frontend

- **Framework**: Next.js 16.0.3 (App Router)
- **Lenguaje**: TypeScript 5.7.2
- **UI Framework**: React 19.0.0
- **Estilos**: Tailwind CSS 3.4.17
- **Componentes**: Shadcn-inspired components
- **Estado Global**: Zustand 5.0.8
- **Estado Asíncrono**: TanStack React Query 5.90.5
- **HTTP Client**: Axios 1.7.9
- **Formularios**: React Hook Form 7.54.2 + Zod 3.24.1
- **Internacionalización**: next-intl 4.5.5
- **Notificaciones**: Sonner 1.7.3
- **Iconos**: Lucide React 0.469.0
- **Utilidades**: date-fns 4.1.0, clsx, tailwind-merge

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
# Edita .env y ajusta las variables según tu entorno
```

Variables importantes en `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/taskmanager?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV=development
```

```bash
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
# Edita .env.local si es necesario
```

Variables en `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

```bash
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
2. **Usa los filtros** para organizar tus tareas:
   - Filtra por estado (Pending, In Progress, Completed)
   - Filtra por prioridad (Low, Medium, High)
   - Ordena por fecha, título, prioridad, estado o fecha de vencimiento
   - Cambia el orden (Newest first / Oldest first)
   - Limpia todos los filtros con un clic
3. Haz clic en "New Task" para crear una tarea
4. Completa el formulario con:
   - Título (requerido)
   - Descripción (opcional)
   - Prioridad (Low, Medium, High)
   - Fecha de vencimiento (opcional)
5. Edita tareas haciendo clic en el ícono de lápiz
6. Elimina tareas haciendo clic en el ícono de papelera

### 4. Gestionar Perfil

1. Navega a la sección "Profile" en el sidebar
2. **Actualizar información personal**:
   - Modifica tu nombre
   - Cambia tu email
   - Haz clic en "Update Profile"
3. **Cambiar contraseña**:
   - Ingresa tu contraseña actual
   - Ingresa la nueva contraseña (mínimo 6 caracteres)
   - Confirma la nueva contraseña
   - Haz clic en "Change Password"

### 5. Ver Usuarios

1. Navega a la sección "Users"
2. Visualiza todos los usuarios registrados

### 6. Cambiar Idioma

1. Haz clic en el botón de idioma (🌐) en el sidebar
2. Selecciona entre Inglés (English) o Español
3. La interfaz completa se actualiza automáticamente
4. El idioma se guarda en localStorage

### 7. Cambiar Tema

1. Haz clic en el botón de tema (☀️/🌙) en el sidebar
2. Alterna entre tema claro y oscuro
3. El tema se guarda en localStorage

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
GET    /api/tasks          # Obtener tareas del usuario (con filtros opcionales)
GET    /api/tasks/:id      # Obtener tarea por ID
POST   /api/tasks          # Crear tarea
PATCH  /api/tasks/:id      # Actualizar tarea
DELETE /api/tasks/:id      # Eliminar tarea
```

**Filtros y ordenamiento** (query parameters opcionales):

```
GET /api/tasks?status=pending&priority=high&sortBy=dueDate&sortOrder=asc
```

Parámetros disponibles:

- `status`: pending | in_progress | completed
- `priority`: low | medium | high
- `sortBy`: title | createdAt | priority | status | dueDate
- `sortOrder`: asc | desc

### Perfil (Requiere autenticación)

```
GET    /api/profile                    # Obtener perfil del usuario actual
PUT    /api/profile                    # Actualizar perfil
POST   /api/profile/change-password    # Cambiar contraseña
```

## 🗄️ Modelo de Datos

### User (Prisma Schema)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]

  @@map("users")
}
```

### Task (Prisma Schema)

```prisma
model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  status      String    @default("pending")    // pending, in_progress, completed
  priority    String    @default("medium")     // low, medium, high
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("tasks")
  @@index([userId])
}
```

### Relaciones

- Un **User** puede tener múltiples **Tasks** (relación 1:N)
- Cada **Task** pertenece a un único **User**
- Al eliminar un **User**, sus **Tasks** se eliminan automáticamente (Cascade)

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
# Desarrollo
npm run start:dev        # Inicia el servidor en modo desarrollo con hot-reload
npm run start:debug      # Inicia en modo debug

# Producción
npm run build            # Compila el proyecto TypeScript
npm run start:prod       # Inicia el servidor en modo producción

# Base de datos (Prisma)
npm run prisma:generate  # Genera el cliente de Prisma
npm run prisma:migrate   # Crea y aplica migraciones
npm run prisma:studio    # Abre Prisma Studio (GUI para la BD)

# Calidad de código
npm run format           # Formatea el código con Prettier
npm run lint             # Ejecuta ESLint
```

### Frontend

```bash
# Desarrollo
npm run dev              # Inicia el servidor de desarrollo con hot-reload

# Producción
npm run build            # Construye la aplicación optimizada
npm run start            # Inicia el servidor de producción

# Calidad de código
npm run lint             # Ejecuta ESLint de Next.js
```

## 🐳 Docker

El proyecto utiliza Docker para la base de datos PostgreSQL.

### Configuración de Docker Compose

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: taskmanager-postgres
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: taskmanager
```

### Comandos Docker

```bash
# Iniciar base de datos
cd backend
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener base de datos
docker-compose down

# Detener y eliminar volúmenes (¡cuidado! elimina todos los datos)
docker-compose down -v

# Ver estado de contenedores
docker-compose ps
```

## 🔒 Seguridad

- ✅ **Contraseñas hasheadas**: bcrypt con salt rounds
- ✅ **Tokens JWT**: Con expiración configurable (7 días por defecto)
- ✅ **Validación de datos**: class-validator en backend, Zod en frontend
- ✅ **Protección CORS**: Configurado para permitir solo el frontend
- ✅ **Variables de entorno**: Secretos nunca en el código
- ✅ **Autorización por usuario**: Cada usuario solo ve sus propias tareas
- ✅ **Guards de autenticación**: JWT Guard y Local Guard en NestJS
- ✅ **Estrategias de Passport**: JWT Strategy y Local Strategy
- ✅ **Validación de DTOs**: Whitelist y forbidNonWhitelisted habilitados
- ✅ **HTTP Client seguro**: Interceptor de Axios para agregar token automáticamente

## 📱 Responsive Design

La aplicación es completamente responsiva con breakpoints de Tailwind CSS:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm - lg)
- **Desktop**: > 1024px (lg+)

Características responsivas:

- Sidebar colapsable en móviles
- Grid adaptativo de tareas (1, 2 o 3 columnas)
- Formularios optimizados para móviles
- Navegación táctil amigable

## 🎨 Temas

Sistema de temas con soporte completo:

- **Light Mode**: Tema claro por defecto con colores suaves
- **Dark Mode**: Tema oscuro con colores optimizados para reducir fatiga visual
- **Toggle en sidebar**: Cambio instantáneo entre temas
- **Persistencia**: El tema se guarda en localStorage
- **Variables CSS**: Sistema de colores con CSS custom properties
- **Componentes adaptados**: Todos los componentes soportan ambos temas

## ⚙️ Variables de Entorno

### Backend (.env)

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/taskmanager?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Nota**: Nunca subas archivos `.env` al repositorio. Usa `.env.example` como plantilla.

## 🐛 Troubleshooting

### Problemas Comunes

#### Backend no inicia

```bash
# Verifica que PostgreSQL esté corriendo
docker-compose ps

# Si no está corriendo, inícialo
docker-compose up -d

# Verifica los logs
docker-compose logs -f
```

#### Error de conexión a la base de datos

```bash
# Verifica que el puerto 5433 esté disponible
# Si está ocupado, cambia el puerto en docker-compose.yml y DATABASE_URL

# Regenera el cliente de Prisma
npm run prisma:generate

# Ejecuta las migraciones
npm run prisma:migrate
```

#### Frontend no se conecta al backend

```bash
# Verifica que el backend esté corriendo en el puerto 3001
# Verifica la variable NEXT_PUBLIC_API_URL en .env.local
# Debe ser: http://localhost:3001/api
```

#### Error de CORS

```bash
# Verifica que FRONTEND_URL en backend/.env sea correcto
# Debe ser: http://localhost:3000
```

#### Problemas con dependencias

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install

# En Windows (PowerShell)
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

#### Base de datos con datos corruptos

```bash
# Resetea la base de datos (¡cuidado! elimina todos los datos)
cd backend
npx prisma migrate reset

# O elimina el volumen de Docker
docker-compose down -v
docker-compose up -d
npm run prisma:migrate
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ usando las mejores prácticas de desarrollo fullstack y arquitectura hexagonal.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios siguiendo las convenciones del proyecto
4. Asegúrate de que el código pase el linter: `npm run lint`
5. Commit: `git commit -m 'Agrega nueva funcionalidad'`
6. Push: `git push origin feature/nueva-funcionalidad`
7. Abre un Pull Request con descripción detallada

### Convenciones de Código

- Usa TypeScript estricto
- Sigue la arquitectura hexagonal existente
- Escribe código limpio y documentado
- Usa nombres descriptivos para variables y funciones
- Mantén la consistencia con el estilo del proyecto

## 🌍 Internacionalización (i18n)

El proyecto incluye soporte completo para múltiples idiomas:

### Idiomas Soportados

- 🇺🇸 **Inglés (en)** - Idioma por defecto
- 🇪🇸 **Español (es)** - Completamente traducido

### Características

- **Cambio en tiempo real**: Botón de idioma en sidebar y páginas de autenticación
- **Persistencia**: El idioma se guarda en localStorage
- **Sincronización**: Frontend y backend usan el mismo idioma
- **Cobertura completa**: Todas las páginas y componentes traducidos
- **Fácil extensión**: Agregar nuevos idiomas es simple

### Implementación

**Backend (nestjs-i18n)**:

- Archivos de traducción en `backend/src/infrastructure/i18n/`
- Detección automática mediante header `Accept-Language`
- Respuestas del API traducidas

**Frontend (next-intl)**:

- Archivos de traducción en `frontend/src/infrastructure/i18n/messages/`
- Store de Zustand para gestión de estado
- Provider de i18n en el layout principal
- HTTP client envía automáticamente el idioma al backend

### Agregar Nuevos Idiomas

1. Backend: Crear carpeta en `backend/src/infrastructure/i18n/[locale]/`
2. Frontend: Crear archivo en `frontend/src/infrastructure/i18n/messages/[locale].json`
3. Actualizar configuración en `frontend/src/infrastructure/i18n/config.ts`
4. Agregar opción en el componente `LanguageSwitcher`

## 📚 Documentación Adicional

- [Backend README](./backend/README.md) - Documentación detallada del backend
- [Frontend README](./frontend/README.md) - Documentación detallada del frontend
- [Implementación de i18n](./docs/I18N_IMPLEMENTATION.md) - Guía completa de internacionalización
- [Resumen de i18n](./docs/RESUMEN_I18N.md) - Resumen ejecutivo de i18n

## 🎓 Aprendizajes y Buenas Prácticas

Este proyecto demuestra:

### Arquitectura y Diseño

- ✅ **Arquitectura Hexagonal** en fullstack (Ports & Adapters)
- ✅ **Clean Code** y principios SOLID
- ✅ **Separación de responsabilidades** en capas (Domain, Application, Infrastructure)
- ✅ **Inversión de dependencias** con interfaces y repositorios
- ✅ **Diseño de APIs RESTful** con convenciones estándar

### Tecnologías Modernas

- ✅ **TypeScript avanzado** con tipado estricto
- ✅ **Next.js 16** con App Router y React 19
- ✅ **NestJS 11** con módulos y decoradores
- ✅ **Prisma ORM** con migraciones y relaciones
- ✅ **Tailwind CSS 4** con sistema de diseño consistente

### Gestión de Estado

- ✅ **Zustand** para estado global (auth, ui, language)
- ✅ **React Query** para estado asíncrono y caché
- ✅ **Persistencia** en localStorage
- ✅ **Optimistic updates** y invalidación de caché

### Seguridad

- ✅ **Autenticación JWT** con Passport
- ✅ **Guards y Strategies** en NestJS
- ✅ **Validación de datos** en ambos lados
- ✅ **Hashing de contraseñas** con bcrypt
- ✅ **CORS** configurado correctamente

### Internacionalización

- ✅ **i18n completo** en backend y frontend
- ✅ **Múltiples idiomas** con cambio en tiempo real
- ✅ **Sincronización** entre cliente y servidor
- ✅ **Fácil extensión** para nuevos idiomas

### UI/UX

- ✅ **Diseño moderno** tipo dashboard administrativo
- ✅ **Responsive design** para todos los dispositivos
- ✅ **Temas claro/oscuro** con persistencia
- ✅ **Animaciones suaves** y transiciones
- ✅ **Feedback visual** con notificaciones toast
- ✅ **Componentes reutilizables** estilo Shadcn

### DevOps y Herramientas

- ✅ **Docker** para base de datos
- ✅ **Variables de entorno** para configuración
- ✅ **Migraciones de base de datos** con Prisma
- ✅ **Linting y formateo** con ESLint y Prettier
- ✅ **Código mantenible y escalable**

## 🚀 Roadmap

### ✅ Completado Recientemente

- ✅ Filtros y ordenamiento de tareas
- ✅ Página de perfil con actualización de datos
- ✅ Cambio de contraseña seguro
- ✅ Mejoras en componentes Select
- ✅ Sidebar responsive con cierre automático
- ✅ Notificaciones traducidas
- ✅ Manejo completo de errores en autenticación

### 🔜 Próximas Mejoras

- [ ] Tests unitarios y de integración
- [ ] Tests E2E con Playwright
- [ ] Paginación de tareas y usuarios
- [ ] Búsqueda de tareas por texto
- [ ] Categorías y etiquetas para tareas
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Exportar tareas a PDF/CSV
- [ ] Calendario de tareas
- [ ] Colaboración entre usuarios
- [ ] Comentarios en tareas
- [ ] Adjuntar archivos a tareas
- [ ] Más idiomas (francés, alemán, portugués)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Integración con servicios externos (Google Calendar, Slack)
- [ ] Dashboard con gráficos y estadísticas avanzadas

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la sección de [Troubleshooting](#-troubleshooting)
2. Consulta la [documentación adicional](#-documentación-adicional)
3. Abre un issue en el repositorio

## 📊 Estado del Proyecto

- ✅ **Backend**: Completamente funcional
- ✅ **Frontend**: Completamente funcional
- ✅ **Autenticación**: Implementada y segura
- ✅ **CRUD de Tareas**: Completo con filtros y ordenamiento
- ✅ **CRUD de Usuarios**: Completo
- ✅ **Gestión de Perfil**: Actualización de datos y cambio de contraseña
- ✅ **Filtros de Tareas**: Por estado, prioridad, con ordenamiento múltiple
- ✅ **Internacionalización**: Inglés y Español (100% traducido)
- ✅ **Temas**: Claro y Oscuro
- ✅ **Responsive**: Móvil, Tablet, Desktop
- ✅ **Sidebar Móvil**: Cierre automático al navegar
- ✅ **Notificaciones**: Toast traducidas y contextuales
- ✅ **Manejo de Errores**: Completo en autenticación y operaciones
- ✅ **Arquitectura Hexagonal**: Implementada en ambos lados

---

**¡Gracias por usar Task Manager!** 🚀

Desarrollado con ❤️ usando las mejores prácticas de desarrollo fullstack y arquitectura hexagonal.
