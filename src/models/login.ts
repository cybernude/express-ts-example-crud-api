"use strict";
import { Knex, knex } from 'knex'

export class LoginModel {
  login(knex: Knex, username: string, password: string) {
    return knex('user')
      .where({
        "username": username,
        "password": password,
      });
  }
}
