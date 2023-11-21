import { Injectable } from '@nestjs/common';

export interface WelcomeResponse {
  message: string;
  author: string;
  links: {
    linkedIn: string;
    leetCode: string;
    github: string;
  };
}
@Injectable()
export class AppService {
  getHello(): WelcomeResponse {
    return {
      message: `Welcome to my personal blog backend API!`,
      author: 'Ahmed Elgaidi',
      links: {
        linkedIn: 'https://www.linkedin.com/in/ahmedelgaidi',
        leetCode: 'https://leetcode.com/ahmedelgaidi',
        github: 'https://github.com/AhmedElgaidi',
      },
    };
  }
}
