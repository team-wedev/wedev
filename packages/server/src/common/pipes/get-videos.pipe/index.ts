import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { GetVideosPipeDto } from './dto';
import { LATEST, POPULAR, PERIODS } from 'src/video/constants';
import { VideosQueryDto } from 'src/video/dto/videos-query.dto';

const defaultValue: VideosQueryDto = {
  page: 1,
  sort: POPULAR,
};

@Injectable()
export class GetVideosPipe implements PipeTransform {
  public async transform(getVideosPipeDto: GetVideosPipeDto) {
    const { page, sort, period } = getVideosPipeDto;

    const value = defaultValue;

    if (!this.validateGetVideosPipeDto(getVideosPipeDto)) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.sort = sort;
    value.period = period;

    return value;
  }

  private validateGetVideosPipeDto({ page, sort, period }: GetVideosPipeDto) {
    return (
      this.validatePage(page) &&
      this.validateSort(sort) &&
      this.validatePeriod(period, sort)
    );
  }

  private validatePage(page: string) {
    const parsedPage = parseInt(page, 10);
    return page && !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateSort(sort: string) {
    return sort && (sort === LATEST || sort === POPULAR);
  }

  private validatePeriod(period: string, sort: string) {
    let isValid = true;

    if (sort === POPULAR && !period) {
      isValid = false;
    }

    if (
      sort === POPULAR &&
      period !== PERIODS.week &&
      period !== PERIODS.month &&
      period !== PERIODS.year &&
      period !== PERIODS.all
    ) {
      isValid = false;
    }

    if (sort !== POPULAR && period) {
      isValid = false;
    }

    return isValid;
  }
}