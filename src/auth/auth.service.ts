import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    // 회원가입 기능
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ username, password: hashedPassword });

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

     // 로그인 기능
     async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if(user && (await bcrypt.compare(password, user.password))) {
            return 'login success';
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

}
