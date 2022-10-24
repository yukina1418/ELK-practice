>NestJS에서 ELK STACK을 사용하여 나만의 주소 검색 엔진을 간단하게 만들어봤습니다.

두달차 개발자가 작업한 것이라 완성도가 떨어지는 점 유의해주세요!

### 목차


## 1. 데이터베이스에 넣을 파일 다운로드

먼저 아래의 압축파일을 다운받아주세요.

https://drive.google.com/file/d/1WRI7i_X-i0PxZOnrKhGp1aJ4XQXF8VCw/view?usp=sharing

해당 파일은 우체국에서 제공하는 DB 정보를 UTF-8로 인코딩한 파일들입니다.

신뢰할 수 없다고 생각하신다면 하단의 우체국에서 직접 다운로드를 받으신 후 UTF-8로 인코딩을 진행해주세요.

다운로드를 받으셔야하는 정보는 두가지입니다.

1. 지역별 주소 DB
2. 우편번호 변경분 DB

우체국 => https://www.epost.go.kr/search/zipcode/areacdAddressDown.jsp

>해당 압축파일을 해당 위치에 넣어주세요.

**db/address_file/**

![image](https://user-images.githubusercontent.com/82861572/197435274-3c24332a-0d37-48ca-b1d7-73979dae2464.png)

위와 같은 구조가 되면 이제 테스트를 할 준비가 완료됐습니다.

## 2. 도커를 실행시켜서 주소 정보를 데이터베이스에 넣기

>처음에는 데이터베이스만 실행시켜서 값을 넣어줘야합니다.

데이터베이스를 제외한 모든 설정값은 주석처리를 하고 실행시켜주세요. (이렇게 주석처리 안하고 따로따로 키는 방법..아시는..분?)

![image](https://user-images.githubusercontent.com/82861572/197447394-b47bbf44-9a1b-4a6a-9556-09cd17c3b14c.png)

1. docker-compose build
2. docker-compose up

>어, 에러가 뜨면서 도커가 꺼지는데요?

![image](https://user-images.githubusercontent.com/82861572/197447777-7c842abb-5324-45f1-b8b2-a08f5f03c81e.png)

**정상입니다...**

File Load를 하기 위해서 local_infile 옵션을 true로 바꿔주는 작업이 필요한데, **해당 설정값이 적용이 한번에 되지 않는 이슈가 있습니다.**

**다시 한번 도커를 다시 올려주시면 해결됩니다.**

## 3. 데이터베이스를 로그스태시로 전처리를 하여 엘라스틱서치에 주소 정보를 집어넣기

![image](https://user-images.githubusercontent.com/82861572/197448569-7cc5b23d-8fc0-456a-8324-cbfeeedf079c.png)


위의 사진처럼 로그스태시 볼륨의 3번째 줄, 업데이트 conf를 주석처리해주세요.

그 후 동일하게 도커를 실행시켜주시면 됩니다.

1. docker-compose build
2. docker-compose up

>해당 작업은 컴퓨터의 많은 리소스를 할당하여 작업이 진행되는 점을 유의해주세요.

또한 주소 정보가 매우 많은 관계로 긴 시간이 소요됩니다.

Intel Mac Pro 기준으로 모든 데이터가 입력되는데 대략 1시간 30분가량 걸립니다. (도큐먼트가 대략 630만개정도 들어갑니다.)

## 4. 한달 주기로 올라오는 정보를 기준으로 엘라스틱서치 도큐먼트 업데이트하기

![image](https://user-images.githubusercontent.com/82861572/197448943-f7dad658-adc3-4b17-8199-4f82f675e229.png)


우체국에서 제공하는 정보는 한달 주기로 데이터가 업데이트됩니다.

PK는 건물 관리 번호라는 것을 기준으로 잡혀있는데, 로그스태시를 통하여 값을 넣을 때 건물 관리 번호를 기준으로 넣게 작업을 해놨습니다.

>그래서 같은 건물 관리 번호가 나올 경우 해당 도큐먼트를 삭제하고, 새로 인서트를 해줍니다.

**이러한 이유때문에 두개의 conf 파일을 동시에 올리실 경우 문제가 발생할 수 있습니다.**

## 5. 키바나에서 데이터가 잘 들어갔는지 확인하기

![image](https://user-images.githubusercontent.com/82861572/197448774-26152de5-6709-4eb3-a875-af14a593a2c2.png)

데이터는 한번만 들어가고, 한달 단위로 업데이트가 이뤄질 예정이기에 불필요한 로그스태시는 켜놓지 않아도 됩니다.

**위의 사진처럼 로그스태시를 주석처리하시고, 키바나는 주석을 풀어서 도커를 실행해주세요.**

>키바나의 로컬 접속은 localhost:5601입니다.

<img width="315" alt="image" src="https://user-images.githubusercontent.com/82861572/197449520-38104c7a-77f0-4b20-8d59-ea0d8253e151.png">

사진처럼 정상적으로 접속을 하셨다면 위의 사진처럼 햄버거를 누르신 후 **Discover**를 클릭해주세요.

만약 템플릿을 정의하라고 나온다면 address를 치신 후 아래 리스트에 필드 정의 X를 누르신 다음 생성버튼을 누르시면 됩니다.

**그 후 다시 Discover를 누르셨을 때 아래 화면처럼 나오면 성공입니다!**

![image](https://user-images.githubusercontent.com/82861572/197449768-87e57c7b-90c7-4ab1-b6a9-db64c5d8de7d.png)

## 6. 서버에 연결해서 엘라스틱서치에서 데이터 호출해보기

![image](https://user-images.githubusercontent.com/82861572/197449853-c861622a-72aa-48bb-8d0e-d9128f9de6ec.png)도커파일
![image](https://user-images.githubusercontent.com/82861572/197449853-c861622a-72aa-48bb-8d0e-d9128f9de6ec.png
