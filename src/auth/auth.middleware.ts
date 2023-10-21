import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import * as env from 'dotenv';

env.config()
@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: () => void) {
    if (req.headers['x-api-key'] !== process.env.API_KEY) {
      throw new HttpException('Chave API inválida', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
