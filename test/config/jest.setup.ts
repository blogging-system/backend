import { appConfig } from '@src/shared/config'
import * as mongoose from 'mongoose'

beforeEach(async () => {
  await mongoose.connect(appConfig.storage.database.mongodb.uri)
})

afterEach(async () => {
  const collections = await mongoose.connection.db.collections()

  // This is just for not deleting the seeded user!
  for (const collection of collections) {
    if (collection.collectionName !== 'users') {
      await collection.drop()
    }
  }

  await mongoose.connection.close()
})
