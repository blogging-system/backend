import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { appConfig } from '@src/shared/config'
import { AppModule } from '@src/app.module'
import * as request from 'supertest'

describe('🏠 Auth Module (E2E Tests)', () => {
  let app: INestApplication
  const path: string = '/auth/login'
  const method: string = 'POST'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  describe(`➡ "${path}" (${method})`, () => {
    it(`Should return 201 and created session tokens`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const result = await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(201)
      expect(result.body.accessToken).toBeDefined()
      expect(result.body.refreshToken).toBeDefined()
    })

    it(`Should throw UnAuthorizedException for invalid email`, async () => {
      const loginPayload = { email: 'invalidEmail@gmail.com', password: appConfig.seeders.rootUser.password }

      const result = await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(401)
    })

    it(`Should throw UnAuthorizedException for invalid password`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: 'invalidPassword' }

      const result = await request(app.getHttpServer()).post(path).send(loginPayload)
      expect(result.status).toBe(401)
    })

    it(`Should throw BadRequestException if the credentials aren't given`, async () => {
      const result = await request(app.getHttpServer()).post(path)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the credentials were empty`, async () => {
      const loginPayload = {}

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the email is not of type string`, async () => {
      const loginPayload = { email: 1243, password: appConfig.seeders.rootUser.password }

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the password is not of type string`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.password, password: 1234 }

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the email is too short`, async () => {
      const loginPayload = { email: 'q@g.m', password: appConfig.seeders.rootUser.password }

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the email is too long`, async () => {
      const loginPayload = { email: `${'1'.repeat(500)}@gmail.com`, password: appConfig.seeders.rootUser.password }

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the password is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.password, password: '1' }

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the password is too long`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.password, password: '1234'.repeat(500) }

      const result = await await request(app.getHttpServer()).post(path).send(loginPayload)

      expect(result.status).toBe(400)
    })
  })
})
