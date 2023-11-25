import { Injectable } from '@nestjs/common'
import { ResultMessage } from './shared/types'

interface ApiLinks {
  linkedIn: string
  leetCode: string
  github: string
}

interface ApiInfo {
  title: string
  description: string
  architecture: string
  type: string
  environment: string
  documentation: string
}

export interface WelcomeResponse {
  message: string
  data: {
    api: ApiInfo
    author: string
    links: ApiLinks
  }
}
@Injectable()
export class AppService {
  getHello(): WelcomeResponse {
    return {
      message: `Welcome to my personal blog!`,
      data: {
        author: 'Ahmed Elgaidi',
        links: {
          linkedIn: 'https://www.linkedin.com/in/ahmedelgaidi',
          leetCode: 'https://leetcode.com/ahmedelgaidi',
          github: 'https://github.com/AhmedElgaidi',
        },
        api: {
          title: 'Backend API',
          description: 'This is the server side code of my personal blog!',
          architecture: 'Monolith',
          type: 'RESTful API',
          environment: process.env.NODE_ENV,
          documentation: 'https://documenter.getpostman.com/view/8694181/2s9YeD8Yr5',
        },
      },
    }
  }

  ping(): ResultMessage {
    return {
      message: 'The ping was successful!',
    }
  }
}
