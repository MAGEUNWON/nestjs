import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards()
    }

    // 게시물 생성 
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        // Dto 적용
        @Body() CreateBoardDto: CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(CreateBoardDto)
    }

    // 특정 id로 게시물 가져오기 설정(@Body 대신 @Parma으로 설정)
    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    // 특정 id로 게시물 지우기
    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    // 특정 id로 게시물 상태 업데이트
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status)
    }
}
