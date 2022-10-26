import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { PrismaService } from '../prisma/prisma.service';
import { AddressResolver } from './address.resolver';
import { ElasticService } from './elasticsearch.service';
import { PrismaQueryService } from './prisma.service';
import { TypeORMQueryService } from './typeorm.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: `http://elasticsearch:9200`,
    }),
  ],
  providers: [AddressResolver, PrismaService, TypeORMQueryService, PrismaQueryService, ElasticService],
})
export class AddressModule {}
