<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
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

## Summary
以下の資料で基礎知識を補填してから、プライベートの隙間時間で実装を行いました。

### 参考文献
- [ドメイン駆動設計 モデリング/実装ガイド](https://little-hands.booth.pm/items/1835632)
- [ドメイン駆動設計 サンプルコード&FAQ](https://little-hands.booth.pm/items/3363104)
- [ドメイン駆動設計入門 ボトムアップでわかる！ドメイン駆動設計の基本](https://www.amazon.co.jp/dp/B082WXZVPC/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)
- [Clean Architecture 達人に学ぶソフトウェアの構造と設計](https://www.amazon.co.jp/Clean-Architecture-%E9%81%94%E4%BA%BA%E3%81%AB%E5%AD%A6%E3%81%B6%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%81%AE%E6%A7%8B%E9%80%A0%E3%81%A8%E8%A8%AD%E8%A8%88-Robert-C-Martin/dp/4048930656/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1653750498&sr=1-1)

### タイムライン
- 2022年3月上旬： 参考文献読み込み期間
- 2022年3月中旬〜4月上旬頃: 実装期間

### それ以降に読んだ文献
- [セキュア・バイ・デザイン](https://www.amazon.co.jp/%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2%E3%83%BB%E3%83%90%E3%82%A4%E3%83%BB%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3-Dan-Bergh-Johnsson-ebook/dp/B09F697K2V/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2IR1UALYIGV1I&keywords=%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2%E3%83%90%E3%82%A4%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3&qid=1653750884&s=books&sprefix=%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2%E3%83%90%E3%82%A4%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%2Cstripbooks%2C268&sr=1-1)
- [実践ドメイン駆動設計](https://www.amazon.co.jp/%E5%AE%9F%E8%B7%B5%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88-%E3%83%B4%E3%82%A1%E3%83%BC%E3%83%B3%E3%83%BB%E3%83%B4%E3%82%A1%E3%83%BC%E3%83%8E%E3%83%B3-ebook/dp/B00UX9VJGW/ref=sr_1_3?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=16HHWUI7QOVIZ&keywords=%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88&qid=1653750914&s=digital-text&sprefix=%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%2Cdigital-text%2C215&sr=1-3)  

## Domain Model Diagram

![domain-model-diagram](https://user-images.githubusercontent.com/58926229/163914302-61509406-7333-4c00-9705-c42107317c35.png)

## Entity Relationship Diagram

![entity-relationship-diagram](https://user-images.githubusercontent.com/58926229/163914257-36769a5b-e414-4eb6-b6ed-99a4d57963b7.png)

## Startup

```bash
$ docker compose up -d
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Migration

```bash
# prisma setup
$ yarn prisma:generate

# db-test: migrate & seeding
$ yarn migrate:test

# db: reset
$ yarn migrate:reset

# db: reset & seeding
$ yarn migrate:init

# db: migrate & seeding
$ yarn migrate:dev
```

## Test

```bash
# unit tests & db-reset
$ yarn test:reset

# unit tests
$ yarn test
```
