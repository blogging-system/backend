/**
 * This module exports the `BaseRepository` class for creating MongoDB repositories.
 *
 * A repository is an abstraction over the database persistence layer that encapsulates
 * all database interactions related to a specific model or entity in the application.
 * The `BaseRepository` provides a generic implementation of commonly used database
 * operations such as `find`, `findOne`, `create`, `updateOne`, and `deleteOne`.
 *
 * Example usage:
 *  ```
 *      import { BaseRepository } from './baseRepository';
 *      import { User } from './models/user';
 *
 *      class UserRepository extends BaseRepository<User> {
 *        constructor() {
 *          super(User);
 *        }
 *      }
 *  ```
 */

import BaseRepository from "./baseRepository";

export { BaseRepository };
