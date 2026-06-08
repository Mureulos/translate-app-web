# 🌐 Translate App

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Aplicação de tradução com front-end em Angular, API em .NET e tradução feita por um modelo de IA rodando localmente via Ollama. Usuários podem criar conta, fazer login e salvar traduções favoritas.

O projeto tem duas branches:

- **`mvp`** — desafio original do [devChallenges.io](https://devchallenges.io/), focado em front-end com dados simulados no navegador
- **`main`** — versão expandida com back-end, banco de dados, autenticação e IA integrada

---

## 🛠️ Stack

**Front-end**
- Angular 18 (Signals, Standalone Components)
- Tailwind CSS, PrimeNG, Angular Material
- RxJS

**Back-end**
- C# / .NET 8 Web API
- Entity Framework Core
- MediatR (CQRS)
- OllamaSharp + modelo `translategemma:4b`

**Infraestrutura**
- Docker & Docker Compose
- Nginx
- PostgreSQL

---

## ⚙️ Rodando localmente

Você precisa ter o **Docker** e o **Docker Compose** instalados.

```bash
git clone <link-do-repositorio>
cd translate-app
docker compose up
```
