# 🐾 Petly (Mobile)

Petly es una aplicación móvil desarrollada con **React Native** que permite a usuarios reservar turnos para servicios relacionados con el cuidado de mascotas (peluquería, veterinaria, etc.).

El proyecto está pensado como una **plataforma genérica**, usable por cualquier negocio pet, y construido con una base técnica **escalable, mantenible y profesional**, aplicando **Clean Architecture**, **Redux** y una arquitectura modular por feature.

---

## 🎯 Objetivo del proyecto

* Permitir a usuarios reservar turnos desde el móvil
* Integrar autenticación real con **AWS Cognito**
* Integrar pagos dentro de la aplicación (ej. Mercado Pago)
* Mantener una separación clara de responsabilidades
* Aplicar principios de **Programación Orientada a Objetos**
* Facilitar la escalabilidad, el testing y la evolución por feature

---

## 🧱 Arquitectura

Petly sigue los principios de **Clean Architecture**, adaptados al contexto de frontend:

```
Presentation (UI + Redux)
↓
Application (Use Cases)
↓
Domain (Business Rules)
↓
Data / Infrastructure (APIs, Auth, Payments)
```

Cada feature es **autónoma** y contiene sus propias capas internas.

---

## 📁 Estructura del proyecto

```text
src/
├── app/
│   ├── config/          # Configuración global (env, providers)
│   ├── store/           # Redux store
│   └── navigation/      # Navegación
│
├── features/
│   ├── auth/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── data/
│   │   │   ├── repositories/
│   │   │   └── http/
│   │   └── presentation/
│   │
│   ├── booking/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── data/
│   │   │   ├── repositories/
│   │   │   └── http/
│   │   └── presentation/
│   │
│   ├── pets/
│   └── profile/
│
├── shared/
│   ├── http/            # Infraestructura HTTP compartida (axios, interceptors)
│   ├── auth/            # Helpers de autenticación (token)
│   ├── ui/              # Componentes reutilizables
│   └── utils/
│
└── main.tsx
```

---

## 🧠 Capas explicadas

### Domain

* Entidades
* Interfaces de repositorios
* Reglas de negocio
* No depende de React, Redux ni APIs

### Application

* Casos de uso
* Orquestan acciones del sistema
* Dependencias invertidas vía interfaces

### Data / Infrastructure

* Implementaciones concretas:

  * APIs HTTP (axios)
  * Autenticación (AWS Cognito)
  * Pagos
* Repositorios reales y mocks intercambiables

### Presentation

* Screens
* Componentes
* Redux (estado de UI)

---

## 🔌 Comunicación con APIs

* Se utiliza **axios** como cliente HTTP
* Cada feature define su propio **API client**
* El backend se configura por **provider** vía `.env`

Ejemplo:

```env
BOOKING_PROVIDER=http://10.0.2.2:3000
PETS_PROVIDER=mock
```

Esto permite:

* Activar features de forma independiente
* Usar mocks y APIs reales en paralelo
* Escalar hacia múltiples servicios sin refactor

---

## 🔐 Autenticación

* Autenticación real con **AWS Cognito**
* Manejo de sesión y JWT
* Inyección automática del token mediante interceptors HTTP
* El dominio y los casos de uso no dependen de Cognito

---

## 🗂 Redux

Redux se utiliza **únicamente para estado de interfaz**:

* loading
* errores
* datos listos para mostrar

No contiene lógica de negocio.

---

## 💳 Pagos

Flujo de pagos:

```
UI → Redux → Use Case → PaymentRepository → API de Pagos
```

---

## 🚀 Escalabilidad

La arquitectura está preparada para:

* Agregar nuevas features sin impacto global
* Cambiar backends por feature
* Testear dominio y casos de uso sin UI
* Evolucionar de mocks a APIs reales progresivamente

---

## 🐶 Petly

Una base sólida para construir **aplicaciones móviles reales**, con foco en arquitectura, mantenibilidad y crecimiento a largo plazo.
