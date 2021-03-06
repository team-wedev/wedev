import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Video } from '../../entity/video.entity';

import { UserSerializerModule } from '../serializer/user-serializer.module';
import { UserSerializerService } from '../serializer/user-serializer.service';
import { UserService } from './user.service';
import { UserListQueryDto } from './dto/user-list-query.dto';

import { USER_ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from '../common/constants';
import { USER_LIST_BY_KEYWORD_JAVA } from './user.test.dummy.data';

describe('-- UserService --', () => {
  let userService: UserService;
  let userSerializerService: UserSerializerService;
  let testingModule: TestingModule;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [UserSerializerModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAndCount: jest
              .fn()
              .mockResolvedValue(USER_LIST_BY_KEYWORD_JAVA),
          },
        },
        {
          provide: getRepositoryToken(Video),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = testingModule.get<UserService>(UserService);
    userSerializerService = testingModule.get<UserSerializerService>(
      UserSerializerService,
    );
    userRepository = testingModule.get<Repository<User>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findUsers', () => {
    it('should return an array of search result users with page and keyword', () => {
      const userListQueryDto = new UserListQueryDto(1, 'java');
      const repoSpy = jest.spyOn(userRepository, 'findAndCount');

      expect(userService.findUsers(userListQueryDto)).resolves.toEqual(
        USER_LIST_BY_KEYWORD_JAVA,
      );

      expect(repoSpy).toBeCalledWith({
        where: { username: Like(`%java%`), status: 1 },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: USER_ITEMS_PER_PAGE,
      });
    });

    it('should return an array of search result users with keyword', () => {
      const userListQueryDto = new UserListQueryDto(NaN, 'java');
      const repoSpy = jest.spyOn(userRepository, 'findAndCount');

      expect(userService.findUsers(userListQueryDto)).resolves.toEqual(
        USER_LIST_BY_KEYWORD_JAVA,
      );

      expect(repoSpy).toBeCalledWith({
        where: { username: Like(`%java%`), status: 1 },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: SEARCHED_ITEM_NUMBER,
      });
    });
  });
});
