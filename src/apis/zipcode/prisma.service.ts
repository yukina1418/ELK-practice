import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Address } from './address.entity';

@Injectable()
export class PrismaQueryService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
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
}
