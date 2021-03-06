import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { GithubApiService } from '../third-party-api/github-api/github-api.service';
import { User } from '../../entity/user.entity';
import { GithubOauthCodeDto } from '../third-party-api/github-api/dto/github-oauth-code.dto';
import { GithubUserDetail } from '../third-party-api/model/github-user-detail';
import { ONE_MINUTE_SECONDS } from '../common/constants';
import { UserSessionService } from '../user-session/user-session.service';
import { Request } from 'express';
import { SessionJWTData } from './model/session-jwt-data';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly githubApiService: GithubApiService,
    private readonly userSessionService: UserSessionService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async logoutUser(request: Request) {
    const sessionId = request.cookies.sessionId;

    // tslint:disable-next-line: no-any
    const token: any = jwt.verify(sessionId, process.env.JWT_SECRET);

    const tokenData = new SessionJWTData(token.data.sessionId);

    await this.userSessionService.remove(tokenData.sessionId);
  }

  public async getGithubUserDetail(
    codeDto: GithubOauthCodeDto,
  ): Promise<GithubUserDetail> {
    const { code } = codeDto;

    const accessToken = await this.githubApiService.requestAccessToken(code);

    const userDetail = await this.githubApiService.requestUserDetail(
      accessToken,
    );

    userDetail.setAccessToken(accessToken);

    return userDetail;
  }

  public async findRegisterdGithubUser(githubId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { githubId },
    });

    return user;
  }

  public async instructToSerialize(userEntity: User): Promise<string> {
    const tokenId = await this.userSessionService.serializeUser(userEntity);

    return tokenId;
  }

  public async updateUserGithubAccessToken(
    userEntity: User,
    accessToken: string,
  ) {
    userEntity.githubAccessToken = accessToken;
    await this.userRepository.save(userEntity);
  }

  public makeGithubUserJWT(githubUserDetail: GithubUserDetail): string {
    const githubAccessTokenJWT = jwt.sign(
      {
        avatar: githubUserDetail.avatar,
        email: githubUserDetail.email,
        githubId: githubUserDetail.githubId,
        githubAccessToken: githubUserDetail.getAccessToken(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: ONE_MINUTE_SECONDS * 15,
      },
    );

    return githubAccessTokenJWT;
  }
}
