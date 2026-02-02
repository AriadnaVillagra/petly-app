# 🐾 Petly Backend

Backend del proyecto **Petly**, una plataforma para peluquerías caninas donde los clientes pueden registrar sus mascotas, reservar turnos y pagar servicios desde una app móvil.

Este backend sigue **Clean Architecture**, está construido con **Node.js + TypeScript**, utiliza **AWS Cognito** para autenticación, **MongoDB** como base de datos y se desplegará en **AWS EC2**.

---

## 🎯 Objetivos del backend

- Ser la **fuente de verdad** del sistema
- Validar identidad y autorización (no confiar en el frontend)
- Persistir usuarios, mascotas, turnos y pagos
- Integrarse con servicios externos (Cognito, MercadoPago)
- Escalar sin romper el frontend

---

## 🧠 Principios de arquitectura

- Clean Architecture
- Separación de responsabilidades
- Dominio independiente de frameworks
- Infraestructura desacoplada
- Frontend como cliente (no autoridad)

---

## 🛠️ Stack tecnológico

### Lenguaje y runtime
- Node.js
- TypeScript

### Framework HTTP
- Express

### Base de datos
- MongoDB
- Mongoose

### Autenticación
- AWS Cognito (User Pools)
- JWT validation en backend

### Pagos
- MercadoPago SDK
- Webhooks

### Infraestructura
- AWS EC2
- Nginx (reverse proxy)
- PM2 (process manager)

---

## 📁 Estructura del proyecto

```text
src/
├── application/
│   ├── usecases/
│   └── dtos/
│
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── services/
│
├── infrastructure/
│   ├── config
│   ├── http
│   └── persistence
│
├── interfaces/
│   ├── controller
│   └── middleware
│
└── index.ts
```

---

## 🔐 Autenticación (AWS Cognito)

- El backend **no maneja passwords**
- El frontend se autentica con Cognito
- El backend valida el JWT en cada request protegida

---

## 🐾 Mascotas (Pets)

- Cada mascota pertenece a un usuario autenticado
- El `ownerId` se obtiene del token
- El frontend no decide ownership

---

## 📅 Turnos (Bookings)

- Un turno pertenece a una mascota
- Estados:
  - PENDING
  - PAID
  - CANCELLED

---

## 💳 Pagos (MercadoPago)

- Creación de pagos
- Validación por webhook
- Actualización de estado

---

## 🌍 Deploy

- AWS EC2
- PM2
- Nginx
- HTTPS

---

## 🚀 Roadmap

1. Skeleton backend
2. Auth middleware
3. Pets / Bookings
4. Pagos
5. Deploy

---

## 👩‍💻 Autora

Ariadna Villagra
