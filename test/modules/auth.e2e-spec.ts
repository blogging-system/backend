import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { appConfig } from '@src/shared/config'
import { AppModule } from '@src/core/app.module'
import * as request from 'supertest'

describe('🏠 Auth Module (E2E Tests)', () => {
  let app: INestApplication
  let loginPath: string = '/auth/login',
    whoAmIPath: string = '/admin/auth/whoami',
    logOutPath: string = '/admin/auth/logout'

  let loginMethod: string = 'POST',
    whoAmIMethod: string = 'GET',
    logOutMethod: string = 'POST'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe(`➡ "${loginPath}" (${loginMethod})`, () => {
    it(`Should return 201 and created session tokens`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const { status, body } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(status).toBe(201)
      expect(body.accessToken).toBeDefined()
      expect(body.refreshToken).toBeDefined()
      expect(Object.keys(body).length).toBe(2)
    })

    it(`Should throw UnAuthorizedException for invalid email`, async () => {
      const loginPayload = { email: 'invalidEmail@gmail.com', password: appConfig.seeders.rootUser.password }

      const result = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(401)
    })

    it(`Should throw UnAuthorizedException for invalid password`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: 'invalidPassword' }

      const result = await request(app.getHttpServer()).post(loginPath).send(loginPayload)
      expect(result.status).toBe(401)
    })

    it(`Should throw TooManyRequestException for invalid password`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: 'invalidPassword' }

      for (let i = 0; i < 5; i++) {
        await request(app.getHttpServer()).post(loginPath).send(loginPayload)
      }

      const { status, body } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(status).toBe(429)
    })

    it(`Should throw BadRequestException if the credentials aren't given`, async () => {
      const result = await request(app.getHttpServer()).post(loginPath)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the credentials were empty`, async () => {
      const loginPayload = {}

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the email is not of type string`, async () => {
      const loginPayload = { email: 1243, password: appConfig.seeders.rootUser.password }

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the password is not of type string`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.password, password: 1234 }

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the email is too short`, async () => {
      const loginPayload = { email: 'q@g.m', password: appConfig.seeders.rootUser.password }

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the email is too long`, async () => {
      const loginPayload = { email: `${'1'.repeat(500)}@gmail.com`, password: appConfig.seeders.rootUser.password }

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the password is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.password, password: '1' }

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })

    it(`Should throw BadRequestException if the password is too long`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.password, password: '1234'.repeat(500) }

      const result = await await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      expect(result.status).toBe(400)
    })
  })

  describe(`➡ "${whoAmIPath}" (${whoAmIMethod})`, () => {
    it(`Should be a private endpoint`, async () => {
      const { status } = await request(app.getHttpServer()).get(whoAmIPath)

      expect(status).toBe(401)
    })

    it(`Should return 200 and current user data`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { status, body } = await request(app.getHttpServer())
        .get(whoAmIPath)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(status).toBe(HttpStatus.OK)
      expect(Object.keys(body).length).toBe(4)
    })
  })

  describe(`➡ "${logOutPath}" (${logOutMethod})`, () => {
    it(`Should be a private endpoint`, async () => {
      const { status } = await request(app.getHttpServer()).post(logOutPath)

      expect(status).toBe(401)
    })

    it(`Should return 200 and success message`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { status, body } = await request(app.getHttpServer())
        .post(logOutPath)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(status).toBe(HttpStatus.OK)
      expect(body.message).toBeDefined()
    })
  })
})
