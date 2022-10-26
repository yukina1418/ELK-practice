import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Source } from './address.dto';

@Injectable()
export class ElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async searchNgamByAddress(address: string): Promise<Source[]> {
    const document = await this.elasticsearchService.search({
      index: 'check',
      size: 5,
      query: {
        multi_match: {
          query: address,
          type: 'cross_fields',
          operator: 'OR',
          fields: ['low_zibun_address', 'low_doro_address', 'build_name'],
        },
      },
    });

    console.dir(document, { depth: null });

    const result = document.hits.hits.map((val) => {
      if (this.isSource(val._source)) {
        return val._source;
      }
    });

    return result;
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
   * @param payload 상세주소가 포함되어있는 통짜 주소
   * @returns 유사도 스코어가 제일 높은 주소 정보 1개 Source[]
   */
  public async searchByAddress(payload: string): Promise<Source[]> {
    const array_address = payload.split(' ');

    const address = this.updateAddress(array_address);

    const regexAddress = this.regex(address);

    const isZibun = array_address.some((val) => {
      return val[val.length - 1] === '동' || '리';
    });

    let boosting = '';

    console.log(isZibun);

    if (isZibun) {
      boosting = 'doro_address';
    } else {
      boosting = 'zibun_address';
    }

    const document = await this.elasticsearchService.search({
      index: 'address',
      size: 10,
      query: {
        multi_match: {
          query: address,
          type: 'cross_fields',
          operator: 'OR',
          fields: ['zibun_address'],
        },
      },
    });

    // console.dir(document, { depth: null });

    const result = document.hits.hits.map((val) => {
      if (this.isSource(val._source)) {
        return val._source;
      }
    });

    return result;
  }

  /**
   * 입력된 정보를 주소에 맞게 보정한다
   *
   * @param address 주소정보
   * @returns 보정된 주소
   */
  private updateAddress(address: string[]): string {
    if (address[0].match('경기') !== null) {
      address[0] = '경기도';
    } else if (address[0].match('서울') !== null) {
      address[0] = '서울특별시';
    } else if (address[0].match('대전') !== null) {
      address[0] = '대전광역시';
    } else if (address[0].match('인천') !== null) {
      address[0] = '인천광역시';
    } else if (address[0].match('부산') !== null) {
      address[0] = '부산광역시';
    } else if (address[0].match('울산') !== null) {
      address[0] = '울산광역시';
    } else if (address[0].match('세종') !== null) {
      address[0] = '세종특별자치시';
    } else if (address[0].match('광주') !== null) {
      const isGwangju_Metropolitan_City = address.some((val) => {
        return val === '광산구' || '북구' || '서구' || '동구' || '남구';
      });
      isGwangju_Metropolitan_City ? (address[0] = '광주광역시') : (address[0] = '광주시');
    }
    return address.join(' ');
  }

  /**
   * 주소와 상세주소를 분리하고, 건물명과 건물 번호를 분리한다.
   *
   * @param address 주소정보
   * @returns 분리된 결과값
   */
  private regex(address: string): string {
    const reg = new RegExp(/(^0-9*?가-힣|\s){1,}[0-9$-?0-9$?]{1,10}[^\(]/);

    const address4 = address.match(reg);

    let address1 = address.split(reg)[0];
    let address2 = '';
    const address3 = address.split(reg)[1];

    console.log();
    if (address4[0] === '동' || '리' || '로' || '길') {
      address1 += address4[0][0];
      address2 = address4[0].slice(1);
    }

    console.log(address1);
    console.log(address2);
    console.log(address3);
    return address2;
  }
  //  [동|리|로|길|\s]{1}[$0-9$-?$0-9$][^가-힣]{1,10}
  /**
   * unknown타입의 엘라스틱서치 도큐먼트에 타입을 지정한다.
   *
   * @param data 엘라스틱서치 도큐먼트
   * @returns 타입 지정이 된 data
   */
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
