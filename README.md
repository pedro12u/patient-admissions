# Patient Admissions

Aplicação Full-Stack para gestão de pacientes e internações, desenvolvida como desafio técnico com foco em clean architecture, boas práticas e clareza de raciocínio técnico.

## Visão Geral

O sistema permite o gerenciamento de pacientes e suas internações, garantindo regras de negócio como:
- Apenas uma internação ativa por paciente
- Validação de dados de domínio
- Separação clara entre camadas de aplicação

## Arquitetura

O projeto segue princípios de **Clean Architecture**, com separação clara entre:

- Domain
- Application (Use Cases)
- Infrastructure
- Interfaces (API - Frontend)

Cada camada possui responsabilidades bem definidas, evitando acoplamento entre regras de negócio e frameworks.

## Estrutura do Projeto

```text
patient-admissions/
├── backend
├── frontend
└── README.md
```

## Tecnologias Utilizadas

- Backend: NestJS, Prisma ORM, PostgreSQL
- Frontend: Tailwind CSS
- Banco de dados: PostgreSQL
- Infraestrutura: Docker
- OUtros: SQL  puro para filtros avançados

## Como Executar o Projeto

As instruções detalhadas para execução estão disponíveis nos READMEs específicos de cada modulo:

- Backend
- Frontend

## Decisões Técnicas

Algumas decisões importantes adotadas neste projeto:

- Uso de SQL puro para consultas complexas
- Domínio independente de frameworks
- Casos de uso isolados da camada HTTP
- Histórico de commits granular e semântico
