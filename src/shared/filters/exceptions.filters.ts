import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { MongoError } from 'mongodb'
import { Response } from 'express'

@Catch(MongoError)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    switch (exception.code) {
      case 11000: {
        const { keyValue, keyPattern } = exception as any
        const field = Object.keys(keyPattern)[0]
        const value = keyValue[field]

        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `Sorry, there's a conflict. The "${value}" already exists.`,
        })
        break
      }

      default: {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error',
        })
        break
      }
    }
  }
}
