import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.status.enum";

// 커스텀 파이프를 사용해서 status에 public, private 만 들어가고 나머지 에러 처리하는 유효성 검사
export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }
}

