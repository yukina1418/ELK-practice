import { Injectable } from '@nestjs/common';
import { DATA_SOURCE } from '../typeorm/dataSource';
import { Address } from './address.entity';

@Injectable()
export class TypeORMQueryService {
  /**
   * findMany를 사용하여 다량의 주소 정보를 가져온다.
   *
   * @param zipCode 정보를 찾을 우편번호 5자리
   * @returns 해당하는 Address []
   */
  public async findByZipCode(zipCode: string): Promise<Address[]> {
    const address = await DATA_SOURCE.manager.find(Address, {
      where: { ZIP_NO: zipCode },
    });

    return address;
  }
}
