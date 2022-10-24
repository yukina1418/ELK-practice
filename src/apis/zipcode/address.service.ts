import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PrismaService } from '../prisma/prisma.service';
import { Source } from './address.dto';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  /**
   * findMany를 사용하여 다량의 주소 정보를 가져온다.
   *
   * @param zipCode 정보를 찾을 우편번호 5자리
   * @returns 해당하는 Address []
   */
  public async findByZipCode(zipCode: string): Promise<Address[]> {
    const address = await this.prisma.main_address.findMany({
      where: { ZIP_NO: zipCode },
    });

    return address;
  }

  /**
   * 엘라스틱서치에 들어있는 정보 중 우편번호를 기준으로 주소정보를 가져온다.
   *
   * @param zipCode 정보를 찾을 우편번호 5자리
   * @returns 유사도 스코어가 높은 순서로 정렬된 주소정보 10개 Source[]
   */
  public async searchByZipCode(zipCode: string): Promise<Source[]> {
    const document = await this.elasticsearchService.search({
      index: 'address',
      size: 10,
      query: {
        match: {
          zip_code: zipCode,
        },
      },
    });

    const result = document.hits.hits.map((val) => {
      if (this.isSource(val._source)) {
        return val._source;
      }
    });

    return result;
  }

  /**
   * 엘라스틱서치에 들어있는 정보 중 주소를 기반으로 주소정보를 가져온다.
   *
   * @param address 상세주소가 포함되어있는 통짜 주소
   * @returns 관련되어있는 모든 주소 정보 Source[]
   *
   * @description 엘라스틱서치는 특정 플러그인을 깔지 않는다면 한번에 가져오는 데이터는 1만개다.
   */
  public async searchManyByAddress(address: string): Promise<Source[]> {
    const document = await this.elasticsearchService.search({
      index: 'address',
      size: 10000,
      query: {
        match: {
          doro_address: address,
        },
      },
    });

    const result = document.hits.hits.map((val) => {
      if (this.isSource(val._source)) {
        return val._source;
      }
    });

    return result;
  }

  /**
   * 엘라스틱서치에 들어있는 정보 중 주소를 기반으로 주소정보를 가져온다.
   *
   * @param address 상세주소가 포함되어있는 통짜 주소
   * @returns 유사도 스코어가 제일 높은 주소 정보 1개 Source[]
   */
  public async searchByAddress(address: string): Promise<Source[]> {
    const document = await this.elasticsearchService.search({
      index: 'address',
      size: 10,
      query: {
        match: {
          doro_address: address,
        },
      },
    });

    const result = document.hits.hits.map((val) => {
      if (this.isSource(val._source)) {
        return val._source;
      }
    });

    return result;
  }

  public async searchCheckByAddress(data: string[][]) {
    data.forEach(async (val) => {
      const document = await this.elasticsearchService.search({
        index: 'address',
        size: 1,
        query: {
          multi_match: {
            query: val[0],
            type: 'cross_fields',
            operator: 'OR',
            fields: ['doro_address', 'zibun_address', 'build_name'],
          },
        },
      });

      const result = document.hits.hits.map((val) => {
        if (this.isSource(val._source)) {
          return val._source;
        }
      });

      if (result[0].zip_code === val[1]) {
        console.log('일치!');
      } else {
        console.log(val, '||', result[0]);
      }
    });
  }

  private isSource(data: unknown): data is Source {
    return (
      typeof data === 'object' &&
      data !== null &&
      'manage_code' in data &&
      'build_name' in data &&
      'zibun_address' in data &&
      'updated_at' in data &&
      'created_at' in data &&
      'zip_code' in data &&
      'doro_address' in data
    );
  }
}
