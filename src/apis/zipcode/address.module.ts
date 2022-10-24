import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { PrismaService } from '../prisma/prisma.service';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: `http://elasticsearch:9200`,
    }),
  ],
  providers: [AddressService, AddressResolver, PrismaService],
})
export class AddressModule {}
