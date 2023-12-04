import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { appConfig } from '@src/shared/config'
import { AppModule } from '@src/app.module'
import * as request from 'supertest'

describe('🏠 Auth Module (E2E Tests)', () => {
  let app: INestApplication
  const loginPath: string = '/auth/login'
  const path: string = '/admin/auth/whoami'
  const method: string = 'GET'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  describe(`➡ "${path}" (${method})`, () => {
    it(`Should be a private endpoint`, async () => {
      const { status, body } = await request(app.getHttpServer()).get(path)

      expect(status).toBe(401)
    })

    it(`Should return 201 and current user data`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { status, body } = await request(app.getHttpServer())
        .get(path)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(status).toBe(200)
      expect(Object.keys(body).length).toBe(4)
    })
  })
})
