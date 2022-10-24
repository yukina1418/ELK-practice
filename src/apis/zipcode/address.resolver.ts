import { Args, Query, Resolver } from '@nestjs/graphql';
import { Source } from './address.dto';
import { Address } from './address.entity';
import { AddressService } from './address.service';

@Resolver()
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => [Address])
  fetchByZipCode(@Args({ name: 'zipCode', type: () => String }) zipCode: string): Promise<Address[]> {
    return this.addressService.findByZipCode(zipCode);
  }

  @Query(() => [Source])
  searchByZipCode(@Args({ name: 'zipCode', type: () => String }) zipCode: string): Promise<Source[]> {
    return this.addressService.searchByZipCode(zipCode);
  }

  @Query(() => [Source])
  searchListByAddress(@Args({ name: 'address', type: () => String }) address: string): Promise<Source[]> {
    return this.addressService.searchManyByAddress(address);
  }

  @Query(() => [Source])
  searchOneByAddress(@Args({ name: 'address', type: () => String }) address: string): Promise<Source[]> {
    return this.addressService.searchByAddress(address);
  }

  @Query(() => String)
  searchCheckByAddress(@Args({ name: 'data', type: () => [[String]] }) data: string[][]) {
    this.addressService.searchCheckByAddress(data);
  }
}
