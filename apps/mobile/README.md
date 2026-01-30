# 🐾 Petly

Petly es una aplicación móvil desarrollada con **React Native** que permite a usuarios reservar turnos para servicios relacionados con el cuidado de mascotas (peluquería, veterinaria, etc.) y realizar pagos desde la app.

El proyecto está pensado como una **plataforma genérica**, usable por cualquier negocio pet, y construido con una base técnica **escalable, mantenible y profesional**, aplicando **Clean Architecture** y **Redux**.

---

## 🎯 Objetivo del proyecto

- Permitir a usuarios reservar turnos desde el móvil
- Integrar pagos dentro de la aplicación (ej. Mercado Pago)
- Mantener una separación clara de responsabilidades
- Aplicar principios de **Programación Orientada a Objetos**
- Facilitar la escalabilidad y el testing

---

## 🧱 Arquitectura

Petly sigue los principios de **Clean Architecture**, separando el sistema en capas bien definidas:

Presentation (UI + Redux)
↓
Application (Use Cases)
↓
Domain (Business Rules)
↓
Data / Infrastructure (APIs, Storage, Payments)

---

## 📁 Estructura del proyecto

src/
├── app/
│   ├── store/
│   └── navigation/
├── features/
│   ├── auth/
│   ├── booking/
│   ├── payments/
│   ├── pets/
│   └── profile/
├── shared/
│   ├── domain/
│   ├── ui/
│   ├── utils/
│   └── constants/
└── main.tsx

---

## 🧠 Capas explicadas

### Domain
Contiene la lógica de negocio pura (entidades, interfaces, casos de uso).
No depende de React ni Redux.

### Application
Casos de uso que representan acciones del sistema.

### Data / Infrastructure
Implementaciones concretas: APIs, pagos, storage.

### Presentation
Pantallas, componentes y Redux para manejar estado de UI.

---

## 🗂 Redux

Redux se usa únicamente para estado de la interfaz:
loading, errores y datos listos para mostrar.

---

## 💳 Pagos

Flujo de pagos:

UI → Redux → Use Case → PaymentRepository → API de Pagos

---

## 🚀 Escalabilidad

Arquitectura preparada para crecer, testear y mantener a largo plazo.

---

## 🐶 Petly

Base sólida para construir aplicaciones reales y profesionales.
