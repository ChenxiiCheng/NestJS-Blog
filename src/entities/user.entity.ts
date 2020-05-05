import { AbstractEntity } from './abstract-entity';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { hash, compare } from 'bcryptjs';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  // TODO: add following

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
