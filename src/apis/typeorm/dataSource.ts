import { DataSource } from 'typeorm';

export const DATA_SOURCE = new DataSource({
  type: 'mysql',
  host: 'database',
  port: 3306,
  username: 'root',
  password: 'root',
  entities: [__dirname + './../**/*hanjin*.entity{.ts,.js}'],
  dropSchema: false, // 절대 false!!
  synchronize: false, // 절대 false!!
  logging: true,
});

if (!DATA_SOURCE.isInitialized) {
  DATA_SOURCE.initialize()
    .then(() => {
      console.log('데이터 소스 연결!');
    })
    .catch((err) => {
      console.error('데이터 소스 실패!', err);
    });
}
