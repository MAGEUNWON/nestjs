import { isNotEmpty, IsNotEmpty } from "class-validator";

// DTO생성
export class CreateBoardDto {
    // pipe 사용해서 유효성 검사 추가(빈 값 들어오면 에러내는 것)
    
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}