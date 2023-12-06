import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '@src/app.module'
import * as request from 'supertest'

describe('🏠 AppController (e2e Tests)', () => {
  let app: INestApplication

  let sayHelloPath: string = '/',
    pingPath: string = '/ping'

  let sayHelloMethod: string = 'GET',
    pingMethod: string = 'GET'

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

  describe(`➡ "${sayHelloPath}" (${sayHelloMethod})`, () => {
    it('Should return 200 status code', async () => {
      const { status } = await request(app.getHttpServer()).get(sayHelloPath)

      expect(status).toBe(HttpStatus.OK)
    })
  })

  describe(`➡ "${pingPath}" (${pingMethod})`, () => {
    it('Should return 200 status code)', async () => {
      const { status } = await request(app.getHttpServer()).get(pingPath)

      expect(status).toBe(HttpStatus.OK)
    })
  })
})
