import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './zipcode/address.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [AddressModule, GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
