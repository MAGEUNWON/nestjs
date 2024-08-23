import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    // 회원가입 기능
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password } = authCredentialsDto;
        const user = this.userRepository.create({ username, password });

        // nestjs에서 에러 발생시 try, catch로 잡아주지 않으면 에러가 controller 레벨로 가서 그냥 500 에러를 던짐. 
        try {
            await this.userRepository.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }


}
