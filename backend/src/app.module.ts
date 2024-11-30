import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '12345678',
      database: 'test_db',
      autoLoadEntities: true, // 엔티티 자동 로드
      synchronize: true, // 개발 중에만 사용 (프로덕션에서는 false)
      logging: true, // SQL 로깅 활성화
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
