import { appConfig } from '@src/shared/config'
import * as mongoose from 'mongoose'

beforeAll(async () => {
  await mongoose.connect(appConfig.storage.database.mongodb.uri)
})

afterAll(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    if (collection.collectionName !== 'users') {
      await collection.drop()
    }
  }

  await mongoose.connection.close()
})
