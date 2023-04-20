import { Injectable } from '@nestjs/common';
import slug from 'slug';

@Injectable()
export class AppService {
  getData(): { message: string } {
    const message = slug('Hello, World!!!');
    return { message };
  }
}
