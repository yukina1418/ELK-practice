import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Source {
  @Field(() => String)
  manage_code: string;

  @Field(() => String)
  build_name: string;

  @Field(() => String)
  zibun_address: string;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  created_at: Date;

  @Field(() => String)
  zip_code: string;

  @Field(() => String)
  doro_address: string;
}
