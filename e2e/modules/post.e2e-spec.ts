import { HttpStatus, INestApplication } from '@nestjs/common'
import { CreateKeywordDto } from '@src/app/keyword/dtos'
import { CreateSeriesDto } from '@src/app/series/dtos'
import { CreatePostDto } from '@src/app/post/dtos'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateTagDto } from '@src/app/tag/dtos'
import { appConfig } from '@src/shared/config'
import { AppModule } from '@src/app.module'
import * as request from 'supertest'

describe('🏠 Keyword Module (E2E Tests)', () => {
  let app: INestApplication
  let loginPath: string = '/auth/login',
    createPostPath: string = '/admin/posts',
    updatePostPath: string = '/admin/posts',
    deletePostPath: string = '/admin/posts',
    publishPostPath: string = '/admin/posts/publish',
    unPublishPostPath: string = '/admin/posts/unpublish',
    getLatestPosts: string = '/admin/posts/latest',
    getPublishedPosts: string = '/admin/posts/published',
    getUnPublishedPosts: string = '/admin/posts/unpublished',
    getPopularPosts: string = '/admin/posts/popular',
    getUnPopularPosts: string = '/admin/posts/unpopular',
    getTrendingPosts: string = '/admin/posts/trending',
    getPostBySlug: string = '/admin/posts',
    getAllPosts: string = '/admin/posts',
    getAllPublishedPostsCountForGivenTagIdPath: string = '/admin/posts/analytics/published/count/tags',
    getAllUnPublishedPostsCountForGivenTagIdPath: string = '/admin/posts/analytics/unpublished/count/tags',
    getAllPostsCountWithGivenTagIdPath: string = '/admin/posts/analytics/count/tags',
    getAllPublishedPostsCountForGivenKeywordIdPath: string = '/admin/posts/analytics/published/count/keywords',
    getAllUnPublishedPostsCountForGivenKeywordIdPath: string = '/admin/posts/analytics/unpublished/count/keywords',
    getAllPostsCountWithGivenKeywordIdPath: string = '/admin/posts/analytics/count/keywords',
    getAllPublishedPostsCountForGivenTSeriesIdPath: string = '/admin/posts/analytics/published/count/series',
    getAllUnPublishedPostsCountForGivenSeriesIdPath: string = '/admin/posts/analytics/unpublished/count/series',
    getAllPostsCountWithGivenSeriesIdPath: string = '/admin/posts/analytics/count/series',
    getAllPublishedPostsCountPath: string = '/admin/posts/analytics/published/count',
    getAllUnPublishedPostsCountPath: string = '/admin/posts/analytics/unpublished/count',
    getAllPostsCountPath: string = '/admin/posts/analytics/count',
    createTagPath: string = '/admin/tags',
    createKeywordPath: string = '/admin/keywords',
    createSeriesPath: string = '/admin/series'

  let createPostMethod: string = 'POST',
    updatePostMethod: string = 'PATCH',
    deletePostMethod: string = 'DELETE',
    publishPostMethod: string = 'POST',
    unPublishPostMethod: string = 'POST',
    getMethod: string = 'GET'

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

  describe(`➡ "${createPostPath}" (${createPostMethod})`, () => {
    it(`Should be a private endpoint`, async () => {
      const { status } = await request(app.getHttpServer()).post(createPostPath)

      expect(status).toBe(401)
    })

    it(`Should return 201 and created post`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status, body } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(201)
      expect(Object.keys(body).length).toBe(13)
    })

    it(`Should return ResourceConflictException if I tried to create duplicated post`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(409)
    })

    it(`Should return BadRequestException if the given post payload is empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({} as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if no given post payload at all `, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if title is empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '',
          description: 'description',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if title is not given`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          description: 'description',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if title is not of type string`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 123 as any,
          description: 'description',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if title is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 123 as any,
          description: 'description',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if title is too long`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(500),
          description: 'description',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if description is is not given`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(500),

          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if the description is given but empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(500),
          description: '',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if description is not of type string`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'dddddddddddddddddddddddddddddddddddd123',
          description: 123 as any,
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if description is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(10),
          description: 'de',
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if description is too long`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(500),
          content: 'content',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if content is not given`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if content is given but empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: '',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if content is not of type string`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          content: 'content'.repeat(500),
          description: 'description'.repeat(300),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if content is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: '12342',
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if content is too long`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(10_000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if imageUrl is not given at all`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if imageUrl is given but empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: '',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if imageUrl is not of type string`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: 123 as any,
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if imageUrl is not a valid link`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: 'asd'.repeat(50),
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if imageUrl is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: 'https://1.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if imageUrl is too short`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if keywords is not given at all`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if keywords is given but empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if keywords is not of type array`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: 'sdf' as any,
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if keywords is not a valid mongodb ID`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: ['assdfasdf'],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if given keywords aren't unique `, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [createdKeyword._id, createdKeyword._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if series is not given at all`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          keywords: [createdKeyword._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if series is given but empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [],
          keywords: [createdKeyword._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if series is not of type array`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: 'as' as any,
          keywords: [createdKeyword._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if series is not a valid mongodb ID`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: ['asfasdf'],
          keywords: [createdKeyword._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if given series aren't unique `, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id, createdSeries._id],
          keywords: [createdKeyword._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if tags is not given at all`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [createdKeyword._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if tags is given but empty`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [createdKeyword._id],
          tags: [],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if tags is not of type array`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [createdTag._id],
          tags: 'sdfas' as any,
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if tags is not a valid mongodb ID`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [createdKeyword._id],
          tags: ['sfsdf'],
        } as CreatePostDto)

      expect(status).toBe(400)
    })

    it(`Should return BadRequestException if given tags aren't unique `, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { status } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: '123'.repeat(20),
          description: 'description'.repeat(300),
          content: 'content'.repeat(1000),
          imageUrl: `https://${'1'.repeat(500)}.com`,
          series: [createdSeries._id],
          keywords: [createdKeyword._id],
          tags: [createdTag._id, createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(400)
    })
  })

  describe(`➡ "${updatePostPath}" (${updatePostMethod})`, () => {
    it(`Should be a private endpoint`, async () => {
      const { status } = await request(app.getHttpServer()).patch(updatePostPath + '/1')

      expect(status).toBe(401)
    })

    it(`Should return 200 and the updated post`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { body: createdPost } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      const { status, body } = await request(app.getHttpServer())
        .patch(updatePostPath + `/${createdPost._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'updatedTitle'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(HttpStatus.OK)
      expect(Object.keys(body).length).toBe(13)
      expect(body.title).toBe('updatedTitle'.repeat(10))
    })

    it(`Should throw NotFoundException if the need post to be updated is not found`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { body: createdPost } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      const { status, body } = await request(app.getHttpServer())
        .patch(updatePostPath + `/${createdKeyword._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'updatedTitle'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      expect(status).toBe(404)
    })
  })

  describe(`➡ "${deletePostPath}" (${deletePostMethod})`, () => {
    it(`Should be a private endpoint`, async () => {
      const { status } = await request(app.getHttpServer()).delete(deletePostPath + '/1')

      expect(status).toBe(401)
    })

    it(`Should return 200 and and a success message`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { body: createdPost } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      const { status, body } = await request(app.getHttpServer())
        .delete(deletePostPath + `/${createdPost._id}`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(status).toBe(HttpStatus.OK)
      expect(body.message).toBeDefined()
    })

    it(`Should throw NotFoundException if the post is not found`, async () => {
      const loginPayload = { email: appConfig.seeders.rootUser.email, password: appConfig.seeders.rootUser.password }

      const {
        body: { accessToken },
      } = await request(app.getHttpServer()).post(loginPath).send(loginPayload)

      const { body: createdTag } = await request(app.getHttpServer())
        .post(createTagPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateTagDto)

      const { body: createdKeyword } = await request(app.getHttpServer())
        .post(createKeywordPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'test' } as CreateKeywordDto)

      const { body: createdSeries } = await request(app.getHttpServer())
        .post(createSeriesPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'title', description: 'description', imageUrl: 'https://example.com' } as CreateSeriesDto)

      const { body: createdPost } = await request(app.getHttpServer())
        .post(createPostPath)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'title'.repeat(10),
          description: 'description'.repeat(20),
          content: 'content'.repeat(1000),
          imageUrl: 'https://example.com',
          keywords: [createdKeyword._id],
          series: [createdSeries._id],
          tags: [createdTag._id],
        } as CreatePostDto)

      const { status, body } = await request(app.getHttpServer())
        .delete(deletePostPath + `/${createdKeyword._id}`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(status).toBe(404)
      expect(body.message).toBeDefined()
    })
  })
})
