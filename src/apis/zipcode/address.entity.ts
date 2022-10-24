import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime';
import { Transform, Type } from 'class-transformer';
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class Address {
  @Field(() => Int, { description: '고유 ID' })
  id: number;

  @Field(() => String, { description: '우편번호' })
  ZIP_NO: string;

  @Field(() => String, { description: '시도' })
  SIDO: string;

  @Field(() => String, { description: '시도(영문)' })
  SIDO_ENG: string;

  @Field(() => String, { description: '시군구' })
  SIGUNGU: string;

  @Field(() => String, { description: '시군구(영문)' })
  SIGUNGU_ENG: string;

  @Field(() => String, { description: '읍면' })
  EUPMYUN: string;

  @Field(() => String, { description: '읍면(영문)' })
  EUPMYUN_ENG: string;

  @Field(() => String, { description: '도로 명 코드' })
  DORO_CD: string;

  @Field(() => String, { description: '도로 명' })
  DORO: string;

  @Field(() => String, { description: '도로 명(영문)' })
  DORO_ENG: string;

  @Field(() => String, { description: '지하여부' })
  UNDERGROUND_YN: string;

  @Field(() => GraphQLDecimal, { description: '건물번호 본번' })
  @Type(() => Object)
  @Transform(transformToDecimal)
  BUILD_NO1: Decimal;

  @Field(() => GraphQLDecimal, { description: '건물번호 부번' })
  @Type(() => Object)
  @Transform(transformToDecimal)
  BUILD_NO2: Decimal;

  @Field(() => String, { description: '건물관리 번호(PK)' })
  BUILD_NO_MANAGE_NO: string;

  @Field(() => String, { description: '다량 배달처명' })
  DARYANG_NM: string;

  @Field(() => String, { description: '시군구용 건물명' })
  BUILD_NM: string;

  @Field(() => String, { description: '법정동 코드' })
  DONG_CD: string;

  @Field(() => String, { description: '법정동 명' })
  DONG_NM: string;

  @Field(() => String, { description: '리 명' })
  RI: string;

  @Field(() => String, { description: '행정동 명' })
  H_DONG_NM: string;

  @Field(() => String, { description: '산 여부' })
  SAN_YN: string;

  @Field(() => GraphQLDecimal, { description: '지번 본번' })
  @Type(() => Object)
  @Transform(transformToDecimal)
  ZIBUN1: Decimal;

  @Field(() => String, { description: '읍면동 일련번호' })
  EUPMYUN_DONG_SN: string;

  @Field(() => GraphQLDecimal, { description: '지번 부번' })
  @Type(() => Object)
  @Transform(transformToDecimal)
  ZIBUN2: Decimal;

  @Field(() => String, { description: '구 우편번호' })
  ZIP_NO_OLD: string;

  @Field(() => String, { description: '우편 일련 번호' })
  ZIP_SN: string;

  @Field(() => Date, { description: 'DB에 인서트 된 날짜' })
  CREATED_AT: Date;

  @Field(() => Date, { description: '업데이트 된 날짜' })
  UPDATED_AT: Date;
}
