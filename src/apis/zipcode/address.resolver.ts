import { Args, Query, Resolver } from '@nestjs/graphql';
import { Source } from './address.dto';
import { Address } from './address.entity';
import { ElasticService } from './elasticsearch.service';
import { PrismaQueryService } from './prisma.service';
import { TypeORMQueryService } from './typeorm.service';

@Resolver()
export class AddressResolver {
  constructor(
    private readonly prisma: PrismaQueryService,
    private readonly typeORM: TypeORMQueryService,
    private readonly elasticSearch: ElasticService
  ) {}

  // ANCHOR -  Prisma
  @Query(() => [Address])
  fetchByZipCode(@Args({ name: 'zipCode', type: () => String }) zipCode: string): Promise<Address[]> {
    return this.prisma.findByZipCode(zipCode);
  }

  // ANCHOR -  TypeORM
  @Query(() => [Address])
  findByZipCode(@Args({ name: 'zipCode', type: () => String }) zipCode: string): Promise<Address[]> {
    return this.typeORM.findByZipCode(zipCode);
  }

  // ANCHOR -  ElasticSearch
  @Query(() => [Source])
  searchByZipCode(@Args({ name: 'zipCode', type: () => String }) zipCode: string): Promise<Source[]> {
    return this.elasticSearch.searchByZipCode(zipCode);
  }

  @Query(() => [Source])
  searchListByAddress(@Args({ name: 'address', type: () => String }) address: string): Promise<Source[]> {
    return this.elasticSearch.searchManyByAddress(address);
  }

  @Query(() => [Source])
  searchOneByAddress(@Args({ name: 'address', type: () => String }) address: string): Promise<Source[]> {
    return this.elasticSearch.searchByAddress(address);
  }

  @Query(() => [Source])
  searchNByAddress(@Args({ name: 'address', type: () => String }) address: string): Promise<Source[]> {
    return this.elasticSearch.searchNgamByAddress(address);
  }

  @Query(() => [Source])
  searchManyByAddress(@Args({ name: 'address', type: () => [[String]] }) address: string[][]) {
    console.log(1);
  }
}
