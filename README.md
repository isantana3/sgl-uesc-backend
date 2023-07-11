<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Sobre SGL UESC Backend

## Sistema de Gerenciamento de Laboratórios

O sistema de gerenciamento de laboratórios é um sistema desenvolvido inicialmente para o Colegiado de Ciência da Computação (COLCIC) da Universdidade Estadual de Santa Cruz (UESC), com o objetivo de auxiliar na dinâmica organizacional das salas e laboratórios da universidade.
Dado o problema já conhecido de existirem muitas salas/laboratórios, com diferentes infraestruturas e recursos em pavilhões diferentes. Elaborar um cronograma de horários para reservas de salas/laboratórios durante o semestre, é um desafio muito grande e trabalhoso para ser resolvido através de planilhas do excel. Por isso surgiu a ideia de um sistema facilitador para que essa gerencia se torne menos trabalhosa.
O SGL conta com módulos de cadastro para diferentes tipos de usuários, cadastro, edição e exclusão de itens de infraestrutura, salas/laboratórios, pavilhões, usuários e de reservas de salas.
O SGL também conta com uma interface de usuário amigável que se encontra em outro repositório. Abaixo listaremos os requisítos do sistema que já foram concluídos até o presente momento (11/07/23)

## O que Concluímos
### CRUDs
  - Users
  - Salas/Labs
  - Pavilhões
  - Itens de infra
  - Reservas

### Regras de negócio
  - As reservas precisam ser aprovadas por um admin
  - Só deve ser possível reservar uma sala vaga (não reservada)
  - Na listagem de reservas, deve ser possível filtrar pos sala, pavilhão, reservante, dia e hora
  - Reserva simples (dia único)
  - Reserva semestral (precisa ser melhor testada)
  - Validação de email @uesc

### Casos de uso
  - Login
  - Esqueci minha senha
  - Cadastro
  - Admin listar pedidos e aprovar reservas
  - listagem de salas, pavilhões e itnes (Paginado)
  - listagem de reservas com filtros (paginado)
  - Edição de perfil de Usuário

### Extras
  - Documentação swagger
  - Testes unitários

## O que faltou ser feito
  - Testes mais aprofundados na funcionalidade de reserva semestral
  - Integração entre reserva semestral e front-end
  - Adicionar filtro por usuário na rota de agendamento

## Ideias e melhorias
  - Melhorar a qualidade do código em si, não que foi feito com gambiarras, mas o curto prazo nos impossibilitou de aplicar as melhores práticas de progração em alguns casos.
  - Melhoria na cobertura dos testes unitários

