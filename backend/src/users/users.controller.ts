import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10); // 문자열로 받은 id를 숫자로 변환
    if (isNaN(userId)) {
      throw new Error(`유효하지 않은 ID: ${id}`);
    }
    return this.usersService.find(userId);
  }

  @Put(':id') // HTTP PUT 메서드
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  // 행 삭제 엔드포인트
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
