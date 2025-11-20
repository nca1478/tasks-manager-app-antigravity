# Task Manager Backend

Backend API para la aplicación de gestión de tareas construido con NestJS y arquitectura hexagonal.

## 🏗️ Arquitectura

Este proyecto sigue la **Arquitectura Hexagonal** (también conocida como Ports & Adapters), que proporciona:

- **Separación de responsabilidades**: Lógica de negocio independiente de frameworks
- **Testabilidad**: Fácil de testear gracias a la inversión de dependencias
- **Mantenibilidad**: Código organizado y escalable
- **Flexibilidad**: Fácil cambio de implementaciones (ej: cambiar de base de datos)

### Estructura de Carpetas

```
backend/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── domain/                # Capa de Dominio (Núcleo)
│   │   ├── entities/          # Entidades de negocio
│   │   │   ├── user.entity.ts
│   │   │   └── task.entity.ts
│   │   └── repositories/      # Interfaces de repositorios (Ports)
│   │       ├── user.repository.ts
│   │       └── task.repository.ts
│   │
│   ├── application/           # Capa de Aplicación (Casos de Uso)
│   │   ├── dtos/              # Data Transfer Objects
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   └── task/
│   │   └── use-cases/         # Casos de uso (lógica de aplicación)
│   │       ├── user/
│   │       │   ├── create-user.use-case.ts
│   │       │   ├── get-all-users.use-case.ts
│   │       │   ├── get-user-by-id.use-case.ts
│   │       │   ├── update-user.use-case.ts
│   │       │   └── delete-user.use-case.ts
│   │       └── task/
│   │           ├── create-task.use-case.ts
│   │           ├── get-tasks-by-user.use-case.ts
│   │           ├── get-task-by-id.use-case.ts
│   │           ├── update-task.use-case.ts
│   │           └── delete-task.use-case.ts
│   │
│   ├── infrastructure/        # Capa de Infraestructura (Adaptadores)
│   │   ├── auth/              # Autenticación y autorización
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local.strategy.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── local-auth.guard.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── controllers/       # Controladores HTTP
│   │   │   ├── user.controller.ts
│   │   │   └── task.controller.ts
│   │   ├── database/          # Configuración de base de datos
│   │   │   └── prisma.service.ts
│   │   ├── repositories/      # Implementaciones de repositorios (Adapters)
│   │   │   ├── prisma-user.repository.ts
│   │   │   └── prisma-task.repository.ts
│   │   └── modules/           # Módulos de NestJS
│   │       ├── auth.module.ts
│   │       ├── user.module.ts
│   │       └── task.module.ts
│   │
│   ├── app.module.ts          # Módulo principal
│   └── main.ts                # Punto de entrada
│
├── docker-compose.yml         # Configuración de Docker
├── .env                       # Variables de entorno
└── package.json
```

## 🛠️ Tecnologías

- **Framework**: NestJS 11.1.9
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL (última versión)
- **ORM**: Prisma (última versión)
- **Autenticación**: JWT + Passport
- **Validación**: class-validator, class-transformer
- **Contenedor**: Docker

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Docker y Docker Compose

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y ajusta las variables según tu entorno:

```bash
cp .env.example .env
```

Variables importantes:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskmanager?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV=development
```

### 3. Iniciar la base de datos con Docker

```bash
docker-compose up -d
```

Esto iniciará un contenedor de PostgreSQL en el puerto 5432.

### 4. Ejecutar migraciones de Prisma

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3001/api`

## 📡 API Endpoints

### Autenticación

#### Registro de Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Usuarios (Requiere autenticación)

Incluye el token JWT en el header:
```
Authorization: Bearer {access_token}
```

#### Obtener perfil actual
```http
GET /api/users/me
```

#### Obtener todos los usuarios
```http
GET /api/users
```

#### Obtener usuario por ID
```http
GET /api/users/:id
```

#### Actualizar usuario
```http
PATCH /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### Eliminar usuario
```http
DELETE /api/users/:id
```

### Tareas (Requiere autenticación)

#### Crear tarea
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Completar proyecto",
  "description": "Finalizar el desarrollo del backend",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59Z"
}
```

Prioridades disponibles: `low`, `medium`, `high`

#### Obtener todas las tareas del usuario
```http
GET /api/tasks
```

#### Obtener tarea por ID
```http
GET /api/tasks/:id
```

#### Actualizar tarea
```http
PATCH /api/tasks/:id
Content-Type: application/json

{
  "title": "Título actualizado",
  "status": "in_progress",
  "priority": "medium"
}
```

Estados disponibles: `pending`, `in_progress`, `completed`

#### Eliminar tarea
```http
DELETE /api/tasks/:id
```

## 🔒 Seguridad

- **Autenticación JWT**: Todas las rutas de usuarios y tareas están protegidas
- **Hashing de contraseñas**: Las contraseñas se hashean con bcrypt
- **Validación de datos**: Validación automática con class-validator
- **Autorización**: Los usuarios solo pueden acceder a sus propias tareas

## 🗄️ Base de Datos

### Modelos

#### User
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}
```

#### Task
```prisma
model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  status      String    @default("pending")
  priority    String    @default("medium")
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      String
  user        User      @relation(fields: [userId], references: [id])
}
```

### Comandos útiles de Prisma

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Crear y aplicar migraciones
npm run prisma:migrate

# Abrir Prisma Studio (GUI para la base de datos)
npm run prisma:studio

# Resetear base de datos
npx prisma migrate reset
```

## 🏃 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev        # Inicia el servidor en modo desarrollo

# Producción
npm run build            # Compila el proyecto
npm run start:prod       # Inicia el servidor en modo producción

# Utilidades
npm run format           # Formatea el código con Prettier
npm run lint             # Ejecuta el linter

# Prisma
npm run prisma:generate  # Genera el cliente de Prisma
npm run prisma:migrate   # Ejecuta migraciones
npm run prisma:studio    # Abre Prisma Studio
```

## 🐳 Docker

### Iniciar base de datos
```bash
docker-compose up -d
```

### Detener base de datos
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f
```

## 🎯 Principios de Arquitectura Hexagonal

### 1. Domain Layer (Núcleo)
- **Entities**: Contienen la lógica de negocio pura
- **Repository Interfaces**: Definen contratos (ports) para acceso a datos
- **Sin dependencias externas**: No depende de frameworks ni infraestructura

### 2. Application Layer
- **Use Cases**: Orquestan la lógica de aplicación
- **DTOs**: Definen la estructura de datos de entrada/salida
- **Depende solo del dominio**: No conoce detalles de infraestructura

### 3. Infrastructure Layer (Adaptadores)
- **Controllers**: Manejan peticiones HTTP
- **Repositories**: Implementan las interfaces del dominio
- **Auth**: Implementa autenticación y autorización
- **Database**: Configuración de Prisma y base de datos
- **Modules**: Configuración de inyección de dependencias

## 📝 Buenas Prácticas Implementadas

✅ Separación de responsabilidades  
✅ Inversión de dependencias (SOLID)  
✅ Validación de DTOs  
✅ Manejo de errores consistente  
✅ Código tipado con TypeScript  
✅ Autenticación y autorización  
✅ Variables de entorno  
✅ Documentación clara  

## 🤝 Contribución

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Realiza tus cambios y haz commit: `git commit -m 'Agrega nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Crea un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ usando NestJS y Arquitectura Hexagonal
