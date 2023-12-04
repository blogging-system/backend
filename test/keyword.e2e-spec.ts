import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { appConfig } from '@src/shared/config'
import { AppModule } from '@src/app.module'
import * as request from 'supertest'

describe('🏠 Auth Module (E2E Tests)', () => {
  let app: INestApplication
  let loginPath: string = '/auth/login',
    whoAmIPath: string = '/admin/auth/whoami',
    logOutPath: string = '/admin/auth/logout'

  let whoAmIMethod: string = 'GET',
    logOutMethod: string = 'POST'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
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

      expect(status).toBe(200)
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

      expect(status).toBe(200)
      expect(body.message).toBeDefined()
    })
  })
})
