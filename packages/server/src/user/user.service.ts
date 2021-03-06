import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { User } from '../../entity/user.entity';
import { Video } from '../../entity/video.entity';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { getOffset } from '../libs/get-offset';
import {
  USER_ITEMS_PER_PAGE,
  SEARCHED_ITEM_NUMBER,
  USER_VIDEO_ITEMS_PER_PAGE,
  VIDEO_QUERY_SELECT_COLUMNS,
  LATEST,
  POPULAR,
} from '../common/constants';
import { ParsedGithubUserDetail } from './model/parsed-github-user-detail';
import { SignUpFormDataDto } from './dto/sign-up-user-form.dto';
import { SignUpUserData } from './model/sign-up-form-data';
import { UserSessionService } from '../user-session/user-session.service';

@Injectable()
export class UserService {
  public constructor(
    private readonly userSessionService: UserSessionService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findUsers(
    userListQueryDto: UserListQueryDto,
  ): Promise<[User[], number]> {
    const { page, keyword } = userListQueryDto;

    const skip = page ? getOffset(page, USER_ITEMS_PER_PAGE) : 0;
    const take = keyword && !page ? SEARCHED_ITEM_NUMBER : USER_ITEMS_PER_PAGE;

    return await this.userRepository.findAndCount({
      where: { username: Like(`%${keyword}%`), status: 1 },
      order: {
        videosCount: 'DESC',
        id: 'DESC',
      },
      skip,
      take,
    });
  }

  public async registerUser(
    parsedGithubUserDetail: ParsedGithubUserDetail,
    signUpFormDataDto: SignUpFormDataDto,
  ): Promise<User> {
    const formData = new SignUpUserData(
      parsedGithubUserDetail,
      signUpFormDataDto,
    );

    const user = this.userRepository.create(formData);
    await this.userRepository.save(user);

    return user;
  }

  public async instructToSerialize(userEntity: User): Promise<string> {
    const tokenId = await this.userSessionService.serializeUser(userEntity);

    return tokenId;
  }

  public async findUserByName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  public async findUser(id): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where({
        id,
      })
      .getOne();
  }

  public async findVideosByUser({
    id,
    page,
    sort,
  }): Promise<[Video[], number]> {
    const offset = getOffset(page, USER_VIDEO_ITEMS_PER_PAGE);

    const qb = this.videoRepository
      .createQueryBuilder()
      .where({
        user: {
          id,
        },
      })
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .limit(USER_VIDEO_ITEMS_PER_PAGE)
      .offset(offset);

    if (sort === LATEST) {
      return qb.orderBy('Video_createdAt', 'DESC').getManyAndCount();
    }

    if (sort === POPULAR) {
      return qb.orderBy('Video_popularity', 'DESC').getManyAndCount();
    }
  }
}
