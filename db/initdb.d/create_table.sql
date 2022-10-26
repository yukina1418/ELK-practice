CREATE DATABASE address;

use address;

SET GLOBAL local_infile=1;

CREATE TABLE Main_address ( 
`ZIP_NO` VARCHAR(5) NULL COMMENT '우편번호',
`SIDO` VARCHAR(20) NULL COMMENT '시도',
`SIDO_ENG` VARCHAR(40) NULL COMMENT '시도(영문)',
`SIGUNGU` VARCHAR(20) NULL COMMENT '시군구',
`SIGUNGU_ENG` VARCHAR(40) NULL COMMENT '시군구(영문)',
`EUPMYUN` VARCHAR(20) NULL COMMENT '읍면',
`EUPMYUN_ENG` VARCHAR(40) NULL COMMENT '읍면(영문)',
`DORO_CD` VARCHAR(12) NULL COMMENT '도로명코드',
`DORO` VARCHAR(80) NULL COMMENT '도로명',
`DORO_ENG` VARCHAR(80) NULL COMMENT '도로명(영문)',
`UNDERGROUND_YN` CHAR(1) NULL COMMENT '지하여부',
`BUILD_NO1` INT NULL COMMENT '건물번호본번',
`BUILD_NO2` INT NULL COMMENT '건물번호부번',
`BUILD_NO_MANAGE_NO` VARCHAR(25) NULL COMMENT '건물관리번호',
`DARYANG_NM` VARCHAR(40) NULL COMMENT '다량배달처명',
`BUILD_NM` VARCHAR(200) NULL COMMENT '시군구용건물명',
`DONG_CD` VARCHAR(10) NULL COMMENT '법정동코드',
`DONG_NM` VARCHAR(20) NULL COMMENT '법정동명',
`RI` VARCHAR(20) NULL COMMENT '리명',
`H_DONG_NM` VARCHAR(40) NULL COMMENT '행정동명',
`SAN_YN` VARCHAR(1) NULL COMMENT '산여부',
`ZIBUN1` INT NULL COMMENT '지번본번',
`EUPMYUN_DONG_SN` VARCHAR(2) NULL COMMENT '읍면동일련번호',
`ZIBUN2` INT NULL COMMENT '지번부번' ,
`ZIP_NO_OLD` VARCHAR(4) NULL COMMENT '구우편번호' ,
`ZIP_SN` VARCHAR(2) NULL COMMENT '우편일련번호',
`CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`UPDATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

CREATE TABLE Update_address (
`ZIP_NO` VARCHAR(5) NULL COMMENT '우편번호',
`SIDO` VARCHAR(20) NULL COMMENT '시도',
`SIGUNGU` VARCHAR(20) NULL COMMENT '시군구',
`EUPMYUN` VARCHAR(20) NULL COMMENT '읍면',
`DORO_CD` VARCHAR(12) NULL COMMENT '도로명코드',
`DORO` VARCHAR(80) NULL COMMENT '도로명',
`UNDERGROUND_YN` CHAR(1) NULL COMMENT '지하여부',
`BUILD_NO1` INT NULL COMMENT '건물번호본번',
`BUILD_NO2` INT NULL COMMENT '건물번호부번',
`BUILD_NO_MANAGE_NO` VARCHAR(25) NULL COMMENT '건물관리번호',
`DARYANG_NM` VARCHAR(40) NULL COMMENT '다량배달처명',
`BUILD_NM` VARCHAR(200) NULL COMMENT '시군구용건물명',
`DONG_CD` VARCHAR(10) NULL COMMENT '법정동코드',
`DONG_NM` VARCHAR(20) NULL COMMENT '법정동명',
`RI` VARCHAR(20) NULL COMMENT '리명',
`H_DONG_NM` VARCHAR(40) NULL COMMENT '행정동명',
`SAN_YN` VARCHAR(1) NULL COMMENT '산여부',
`ZIBUN1` INT NULL COMMENT '지번본번',
`ZIBUN2` INT NULL COMMENT '지번부번' ,
`MOVE_CD`VARCHAR(2) NULL COMMENT '이동사유코드',
`BEFORE_EUPMYUN_DONG_SN`  VARCHAR(2) NULL COMMENT '변경 전 읍면동일련번호',
`AFTER_EUPMYUN_DONG_SN`  VARCHAR(2) NULL COMMENT '변경 후 읍면동일련번호',
`UPDATE_DATE` VARCHAR(14) COMMENT '연계일시',
`ZIP_NO_OLD` VARCHAR(4) NULL COMMENT '구우편번호' ,
`ZIP_SN` VARCHAR(2) NULL COMMENT '우편일련번호',
`CREATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`UPDATED_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;