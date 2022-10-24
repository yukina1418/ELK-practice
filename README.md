>NestJS에서 ELK STACK을 사용하여 나만의 주소 검색 엔진을 간단하게 만들어봤습니다.

먼저 아래의 압축파일을 다운받아주세요.

https://drive.google.com/file/d/1WRI7i_X-i0PxZOnrKhGp1aJ4XQXF8VCw/view?usp=sharing

해당 파일은 우체국에서 제공하는 DB 정보를 UFT-8로 인코딩한 파일들입니다.

신뢰할 수 없다고 생각하신다면 하단의 우체국에서 직접 다운로드를 받으신 후 UFT-8로 인코딩을 진행해주세요.

다운로드를 받으셔야하는 정보는 두가지입니다.

1. 지역별 주소 DB
2. 우편번호 변경분 DB

우체국 => https://www.epost.go.kr/search/zipcode/areacdAddressDown.jsp

>해당 압축파일을 해당 위치에 넣어주세요.

**db/address_file/**

![image](https://user-images.githubusercontent.com/82861572/197435274-3c24332a-0d37-48ca-b1d7-73979dae2464.png)

위와 같은 구조가 되면 이제 테스트를 할 준비가 완료됐습니다.
