# Implementación de Internacionalización (i18n)

## 📋 Resumen

Se ha implementado internacionalización completa en el proyecto Task Manager, tanto en el backend (NestJS) como en el frontend (Next.js), respetando la arquitectura hexagonal existente.

## 🎯 Características Implementadas

### Backend (NestJS)

- ✅ Soporte para inglés (en) y español (es)
- ✅ Detección automática del idioma mediante header `Accept-Language`
- ✅ Mensajes traducidos en respuestas de API
- ✅ Integración con `nestjs-i18n`
- ✅ Respeta la arquitectura hexagonal

### Frontend (Next.js)

- ✅ Soporte para inglés (en) y español (es)
- ✅ Botón de cambio de idioma en el sidebar
- ✅ Persistencia del idioma seleccionado en localStorage
- ✅ Traducción automática de toda la interfaz
- ✅ Envío automático del idioma al backend
- ✅ Integración con `next-intl`
- ✅ Respeta la arquitectura hexagonal

## 📁 Estructura de Archivos

### Backend

```
backend/
├── src/
│   ├── i18n/
│   │   ├── en/
│   │   │   └── messages.json          # Traducciones en inglés
│   │   └── es/
│   │       └── messages.json          # Traducciones en español
│   ├── domain/
│   │   └── services/
│   │       └── i18n.service.interface.ts  # Interface del servicio (Puerto)
│   ├── infrastructure/
│   │   └── services/
│   │       └── i18n.service.ts        # Implementación del servicio (Adaptador)
│   └── app.module.ts                  # Configuración de I18nModule
```

### Frontend

```
frontend/
├── src/
│   ├── i18n/
│   │   ├── messages/
│   │   │   ├── en.json                # Traducciones en inglés
│   │   │   └── es.json                # Traducciones en español
│   │   ├── config.ts                  # Configuración de i18n
│   │   └── request.ts                 # Request config
│   ├── application/
│   │   └── stores/
│   │       └── language.store.ts      # Store de Zustand para idioma
│   ├── components/
│   │   ├── providers/
│   │   │   └── i18n-provider.tsx      # Provider de i18n
│   │   └── language-switcher.tsx      # Componente de cambio de idioma
│   └── infrastructure/
│       └── http/
│           └── http-client.ts         # Cliente HTTP con header de idioma
```

## 🚀 Uso

### Backend

#### Agregar Traducciones

1. Edita los archivos JSON en `backend/src/i18n/`:

   - `en/messages.json` para inglés
   - `es/messages.json` para español

2. Usa el servicio de i18n en los controladores:

```typescript
import { I18nService } from "nestjs-i18n";

@Controller("example")
export class ExampleController {
  constructor(private readonly i18n: I18nService) {}

  @Get()
  async example(@Headers("accept-language") lang?: string) {
    return {
      message: this.i18n.translate("messages.example.key", { lang }),
    };
  }
}
```

#### Estructura de Mensajes

```json
{
  "auth": {
    "loginSuccess": "Login successful",
    "registerSuccess": "Registration successful"
  },
  "task": {
    "created": "Task created successfully",
    "updated": "Task updated successfully"
  }
}
```

### Frontend

#### Usar Traducciones en Componentes

```typescript
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("common.title")}</h1>
      <p>{t("common.description")}</p>
    </div>
  );
}
```

#### Cambiar Idioma

El usuario puede cambiar el idioma usando el botón en el sidebar:

- El idioma se guarda automáticamente en localStorage
- Todas las traducciones se actualizan instantáneamente
- El idioma se envía automáticamente al backend en cada petición

#### Agregar Nuevas Traducciones

1. Edita los archivos JSON en `frontend/src/i18n/messages/`:

   - `en.json` para inglés
   - `es.json` para español

2. Usa las claves en tus componentes:

```typescript
const t = useTranslations();
<button>{t("common.save")}</button>;
```

## 🔧 Configuración

### Backend

El módulo de i18n está configurado en `app.module.ts`:

```typescript
I18nModule.forRoot({
  fallbackLanguage: "en",
  loaderOptions: {
    path: path.join(__dirname, "/i18n/"),
    watch: true,
  },
  resolvers: [
    { use: QueryResolver, options: ["lang"] },
    AcceptLanguageResolver,
  ],
});
```

### Frontend

El provider de i18n está configurado en `layout.tsx`:

```typescript
<I18nProvider>{children}</I18nProvider>
```

## 📝 Idiomas Soportados

- 🇺🇸 Inglés (en) - Idioma por defecto
- 🇪🇸 Español (es)

## 🎨 Componentes Traducidos

### Páginas

- ✅ Login
- ✅ Register
- ✅ Dashboard
- ✅ Tasks
- ✅ Users

### Componentes

- ✅ Sidebar
- ✅ Header
- ✅ Task Card
- ✅ Language Switcher
- ✅ Theme Toggle

## 🔄 Flujo de Traducción

1. **Usuario cambia idioma** → Click en botón de idioma
2. **Store actualiza** → Zustand guarda en localStorage
3. **UI se actualiza** → next-intl re-renderiza con nuevas traducciones
4. **Backend recibe idioma** → HTTP client envía header `Accept-Language`
5. **Backend responde** → Mensajes en el idioma solicitado

## 🏗️ Arquitectura Hexagonal

La implementación respeta la arquitectura hexagonal:

### Backend

- **Dominio**: Interface `II18nService` (puerto)
- **Aplicación**: Casos de uso usan la interface
- **Infraestructura**: `I18nService` implementa la interface (adaptador)

### Frontend

- **Dominio**: Tipos e interfaces de idioma
- **Aplicación**: Store de Zustand para estado del idioma
- **Infraestructura**: HTTP client con header de idioma
- **Presentación**: Componentes con traducciones

## 📦 Dependencias Instaladas

### Backend

```json
{
  "nestjs-i18n": "^latest"
}
```

### Frontend

```json
{
  "next-intl": "^latest"
}
```

## 🧪 Testing

Para probar la internacionalización:

1. Inicia el backend: `cd backend && npm run start:dev`
2. Inicia el frontend: `cd frontend && npm run dev`
3. Accede a `http://localhost:3000`
4. Haz login o regístrate
5. Click en el botón de idioma en el sidebar
6. Observa cómo toda la interfaz cambia de idioma
7. Las respuestas del backend también estarán en el idioma seleccionado

## 🎯 Próximos Pasos

Para agregar más idiomas:

1. Crea nuevos archivos JSON en `backend/src/i18n/[locale]/messages.json`
2. Crea nuevos archivos JSON en `frontend/src/i18n/messages/[locale].json`
3. Agrega el locale a `frontend/src/i18n/config.ts`
4. Actualiza el componente `LanguageSwitcher` para incluir el nuevo idioma

## 📚 Recursos

- [nestjs-i18n Documentation](https://nestjs-i18n.com/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

**¡La internacionalización está lista para usar!** 🎉
