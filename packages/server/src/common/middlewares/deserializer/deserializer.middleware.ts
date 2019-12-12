import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserSessionService } from '../../../user-session/user-session.service';
import { SessionJWTData } from '../../../authentication/model/session-jwt-data';
import { UserToken } from '../../../user-session/model/user-session-token';

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

@Injectable()
export class DeserializerMiddleware implements NestMiddleware {
  public constructor(private readonly userSessionService: UserSessionService) {}

  public async use(
    request: Request,
    response: Response,
    next: () => void,
  ): Promise<void> {
    const sessionToken = request.cookies.SessionToken;

    if (!sessionToken) {
      return next();
    }

    // tslint:disable-next-line: no-any
    const token: any = jwt.verify(sessionToken, process.env.JWT_SECRET);

    const tokenData = new SessionJWTData(
      token.data.sessionId,
      token.data.userPublicInfo,
    );

    if (!tokenData.sessionId) {
      return next();
    }

    const userToken = JSON.parse(
      await this.userSessionService.find(tokenData.sessionId),
    );

    if (userToken) {
      request.user = userToken;
    }

    return next();
  }
}
