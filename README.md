# Code Insight AI

## Ingeniería Inversa Automatizada de Repositorios

Solución Fullstack desarrollada para analizar repositorios de código mediante análisis estático y presentar información técnica sobre su estructura, tecnologías, arquitectura, componentes, persistencia, APIs, hallazgos, recomendaciones y riesgos.

---

## 1. Descripción de la solución

**Code Insight AI** permite cargar un repositorio en formato `.zip` desde una aplicación web Angular.

El archivo es enviado a un backend desarrollado con Spring Boot, donde se realiza un análisis estático del contenido del repositorio.

El resultado es presentado en una interfaz organizada por secciones para facilitar la comprensión técnica del proyecto analizado.

### Flujo general

```text
┌─────────────────────┐
│       Usuario       │
└──────────┬──────────┘
           │
           │ Selecciona ZIP
           ▼
┌─────────────────────┐
│   Angular Frontend  │
│      :4200          │
└──────────┬──────────┘
           │
           │ HTTP REST
           ▼
┌─────────────────────┐
│ Spring Boot Backend │
│      :8080          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Repository Analyzer │
│    Análisis estático│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Resultado del       │
│ análisis            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Visualización en    │
│ Angular              │
└─────────────────────┘
```

---

## 2. Arquitectura

La solución está dividida en dos aplicaciones:

```text
code-insight-ai/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── README.md
```

### Backend

Desarrollado con Spring Boot utilizando una arquitectura por capas:

```text
Controller
    ↓
Service
    ↓
Repository / Analyzer
    ↓
DTO / Result
```

Principales paquetes:

```text
controller
service
repository
entity
dto
exception
config
```

### Frontend

Desarrollado con Angular utilizando:

```text
Components
Pages
Services
Models
```

---

## 3. Tecnologías

### Backend

* Java 21
* Spring Boot
* Spring Web
* Maven
* Lombok
* JUnit 5
* Mockito
* Springdoc OpenAPI
* Swagger

### Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* RxJS

### Herramientas

* Eclipse + Spring Tools Suite
* Git
* GitHub
* Postman
* Swagger UI

---

## 4. Funcionalidades implementadas

La solución permite:

* Cargar repositorios en formato ZIP.
* Validar el archivo recibido.
* Identificar el nombre del proyecto.
* Identificar el lenguaje principal.
* Identificar el framework principal.
* Inferir la arquitectura.
* Contabilizar archivos.
* Identificar Controllers.
* Identificar Services.
* Identificar Repositories.
* Identificar Models / Entities.
* Identificar componentes Angular.
* Identificar endpoints.
* Identificar tecnologías de persistencia.
* Identificar bases de datos.
* Identificar APIs consumidas.
* Generar evidencias del análisis.
* Generar hallazgos.
* Generar recomendaciones.
* Identificar riesgos estructurales.
* Visualizar los resultados mediante pestañas.

---

## 5. Arquitecturas identificadas

El análisis estático permite inferir, según las evidencias encontradas:

* Monolith
* MVC
* N-Layers
* Microservices
* No determinado

La arquitectura inferida se acompaña de evidencias para facilitar la interpretación del resultado.

---

## 6. Manejo de errores

El backend implementa un manejo global de excepciones mediante `@RestControllerAdvice`.

Actualmente se contemplan principalmente:

### HTTP 400

Archivo:

* Vacío.
* No enviado.
* Con extensión diferente a `.zip`.

### HTTP 500

Errores durante el procesamiento del archivo o errores internos no controlados.

El frontend muestra al usuario el mensaje correspondiente cuando ocurre un error.

---

## 7. API principal

### Analizar repositorio

```text
POST /api/v1/analysis/upload
```

Recibe:

```text
multipart/form-data
file = repository.zip
```

Ejemplo:

```bash
curl -X POST \
  http://localhost:8080/api/v1/analysis/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@repository.zip"
```

---

## 8. Ejecución del proyecto

### Backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Ejecutar:

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### Frontend

Ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
ng serve
```

Frontend:

```text
http://localhost:4200
```

---

## 9. Swagger

La API dispone de documentación OpenAPI.

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI:

```text
http://localhost:8080/v3/api-docs
```

---

## 10. Pruebas

El backend cuenta con pruebas unitarias utilizando:

* JUnit 5
* Mockito

Ejecutar:

```bash
mvn clean test
```

El proyecto debe finalizar con:

```text
BUILD SUCCESS
```

El frontend puede compilarse mediante:

```bash
ng build
```

---

## 11. Consideraciones de seguridad

Para las pruebas se deben utilizar repositorios públicos o proyectos de prueba.

No se deben cargar repositorios que contengan:

* Contraseñas.
* API Keys.
* Tokens.
* Credenciales.
* Información bancaria real.
* Información personal sensible.
* Código fuente confidencial.

---

## 12. Alcance del MVP

La implementación actual se concentra en el análisis estático de repositorios enviados como archivos `.zip`.

La integración con modelos de inteligencia artificial, despliegue en AWS, autenticación y análisis avanzado de código se consideran extensiones futuras y no forman parte del MVP actual.

---

## 13. Mejoras futuras

Como evolución de la solución se podrían incorporar:

* Análisis mediante IA generativa.
* Soporte para URL de repositorios Git.
* Análisis avanzado de dependencias.
* Diagramas automáticos de arquitectura.
* Análisis de vulnerabilidades.
* Autenticación y autorización.
* Dockerización.
* CI/CD.
* Despliegue en AWS.

---

## 14. Estado de la solución

### Backend

* API REST funcional.
* Análisis estático funcional.
* Manejo global de excepciones.
* Swagger/OpenAPI.
* Pruebas unitarias.
* Compilación verificada.

### Frontend

* Interfaz Angular funcional.
* Carga de repositorios ZIP.
* Integración REST con backend.
* Indicador de procesamiento.
* Manejo de errores.
* Visualización de resultados.
* Navegación mediante pestañas.
* Compilación verificada.

---

## 15. Proyecto

**Code Insight AI**

**Reto:** Kata Senior - Fullstack/Cloud | Code Insight AI: Ingeniería Inversa Automatizada de Repositorios
