import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PageOptionDto } from './types/pagination.types';
import { PageDto, PageMetaDto } from './dto/page.dto';

@Injectable()
export class PaginationService {
  async getpage<T>(
    pageOptions: PageOptionDto,
    queryBuilder: SelectQueryBuilder<T>,
  ) {
    pageOptions.category
      ? queryBuilder
          .skip(pageOptions.skip)
          .take(pageOptions.take)
          .where('category=:category', { category: pageOptions.category })
      : queryBuilder.skip(pageOptions.skip).take(pageOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: pageOptions,
    });
    return new PageDto(entities, pageMetaDto);
  }
}
