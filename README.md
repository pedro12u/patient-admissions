# Patient Admissions

Backend para gestão de pacientes e internações, desenvolvido como desafio técnico com foco em
Clean Architecture, boas práticas e clareza de raciocínio técnico.

## Status

**Backend em desenvolvimento ativo.** Módulos de Paciente e Internação (CRUD/regras de negócio)
implementados e funcionais. Autenticação tem as portas (interfaces) definidas no domínio -
implementação em progresso. Frontend ainda não foi iniciado.

| Módulo | Status |
|---|---|
| Patients (CRUD) | ✅ Implementado |
| Admissions (regras de internação) | ✅ Implementado |
| Auth (login, refresh token, MFA) | 🚧 Portas definidas, implementação pendente |
| Frontend | 📋 Planejado |

## Visão Geral

O sistema permite o gerenciamento de pacientes e suas internações, garantindo regras de negócio como:
- Apenas uma internação ativa por paciente
- Internação não pode ser criada para paciente inexistente
- Validação de dados de domínio (nome, sexo, data de nascimento, transições de status)
- Separação clara entre camadas de aplicação

## Arquitetura

O projeto segue princípios de **Clean Architecture**, com separação clara entre:

- **Domain**: entidades com regras de negócio e validação, independentes de framework
- **Application**: casos de uso e portas (interfaces) de repositório
- **Infrastructure**: implementações concretas (Prisma) das portas
- **Interfaces**: controllers, DTOs e módulos HTTP (NestJS)

Cada camada possui responsabilidades bem definidas, evitando acoplamento entre regras de negócio e frameworks.
Os casos de uso dependem apenas de interfaces (`PatientRepository`, `AdmissionRepository`), nunca
de Prisma diretamente - a implementação concreta é injetada via módulo NestJS.

## Estrutura do Projeto

```text
patient-admissions/
├── backend
│   └── src
│       ├── domain            # Entidades e regras de negócio
│       ├── application       # Casos de uso e portas
│       ├── infrastructure    # Implementações concretas (Prisma)
│       └── interfaces        # Controllers, DTOs, módulos HTTP
└── README.md
```

## Tecnologias Utilizadas

- Backend: NestJS, Prisma ORM (client raw SQL adapter), PostgreSQL
- Infraestrutura: Docker
- Outros: SQL puro para consultas e filtros avançados

## Como Executar o Projeto

As instruções detalhadas para execução estão disponíveis no README do backend.

## Decisões Técnicas

Algumas decisões importantes adotadas neste projeto:

- Uso de SQL puro para consultas complexas, Prisma Client para escrita
- Domínio independente de frameworks (entidades sem decorators, sem import de NestJS/Prisma)
- Casos de uso isolados da camada HTTP, testáveis sem subir o servidor
- `CreateAdmissionUseCase` valida existência do paciente via `PatientRepository` antes de criar a
  internação - um exemplo de como bounded contexts diferentes colaboram sem se acoplar
  diretamente (dependem da porta, não da implementação um do outro)
- Exclusão de pacientes é deliberadamente **não implementada**: dado histórico médico, hard-delete
  não é uma operação de domínio válida neste contexto
- Histórico de commits granular e semântico
