import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';

import {
  VIDEO_ITEMS_PER_PAGE,
  PERIODS,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
  VIDEO_QUERY_SELECT_COLUMNS,
  USER_QUERY_SELECT_COLUMNS,
  SEARCHED_ITEM_NUMBER,
  VIDEO_SEARCH_QUERY,
  LATEST,
  POPULAR,
} from 'common/constants';

import { getOffset } from 'libs/get-offset';

import { VideoListQueryDto } from 'video/dto/video-list-query.dto';

import { Video } from '../../../typeorm/src/entity/video.entity';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  private async popularityQuery(qb): Promise<[Video[], number]> {
    return await qb
      .orderBy('Video_popularity', 'DESC')
      .addOrderBy('Video_createdAt', 'DESC')
      .addOrderBy('Video_id', 'DESC')
      .getManyAndCount();
  }

  public async findVideos(
    videoListQueryDto: VideoListQueryDto,
  ): Promise<[Video[], number]> {
    const { page, sort, period, keyword } = videoListQueryDto;

    const offset = getOffset(page, VIDEO_ITEMS_PER_PAGE);

    const qb = this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS);

    if (!keyword) {
      if (sort === LATEST) {
        return await qb
          .limit(VIDEO_ITEMS_PER_PAGE)
          .offset(offset)
          .orderBy('Video_createdAt', 'DESC')
          .addOrderBy('Video_popularity', 'DESC')
          .addOrderBy('Video_id', 'DESC')
          .getManyAndCount();
      }

      if (sort === POPULAR) {
        if (period !== PERIODS.all) {
          const startDatetime = moment()
            .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[period])
            .format(MOMENT_DATETIME_FORMAT);

          qb.where('Video.createdAt > :startDatetime', { startDatetime });
        }
        return await this.popularityQuery(
          qb.limit(VIDEO_ITEMS_PER_PAGE).offset(offset),
        );
      }
    }

    const search = await qb.where(VIDEO_SEARCH_QUERY, {
      titleKeyword: '%' + keyword + '%',
      descriptionKeyword: '%' + keyword + '%',
    });

    if (page) {
      return await this.popularityQuery(
        search.limit(VIDEO_ITEMS_PER_PAGE).offset(offset),
      );
    }

    return await this.popularityQuery(search.limit(SEARCHED_ITEM_NUMBER));
  }

  public async findVideo(id: number): Promise<Video> {
    return await this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS)
      .where({
        id,
      })
      .getOne();
  }
}
