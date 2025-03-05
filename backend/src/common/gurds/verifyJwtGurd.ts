import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class VerifyJwtGurd implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const access_token = request.cookies['access_token'];
    if (!access_token) return false;

    //checking access_token
    try {
      const payload = this.jwtService.verify(access_token);
      request['payload'] = payload;
      return true;
    } catch (err) {
      throw new HttpException(err.message || 'invalid token', 403);
    }
  }
}
