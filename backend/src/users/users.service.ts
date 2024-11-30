import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new Error('사용자 목록을 가져오는 데 실패했습니다.');
    }
  }

  async find(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id }); // 특정 ID 검색
      if (!user) {
        throw new Error(`ID가 ${id}인 사용자를 찾을 수 없습니다.`);
      }
      return user;
    } catch (error) {
      throw new Error(`사용자를 가져오는 데 실패했습니다: ${error.message}`);
    }
  }
  
  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`ID가 ${id}인 사용자를 찾을 수 없습니다.`);
    }
    Object.assign(user, updateData); // 업데이트 데이터 적용
    return this.usersRepository.save(user); // 저장
  }

  async create(user: Partial<User>): Promise<User> {
    try {
      const newUser = this.usersRepository.create(user);
      await validateOrReject(newUser); // 데이터 유효성 검사 추가
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new Error('사용자 생성에 실패했습니다.');
    }
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
