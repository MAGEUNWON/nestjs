import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // 인증된 사람만 게시물 접근 할 수 있도록 설정
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards()
    // }

    // 게시물 생성 
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto,
    @GetUser() user:User): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto, user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     // Dto 적용
    //     @Body() CreateBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(CreateBoardDto)
    // }

    // 모든 게시물 가져오기
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }
  

    // 특정 id로 게시물 가져오기 설정(@Body 대신 @Parma으로 설정)
    @Get('/:id')
    getBoardById(@Param('id') id:number): Promise<Board> {
        return this.boardsService.getBoardById(id)
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

  
    // 특정 id로 게시물 지우기
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardsService.deleteBoard(id)
    }


    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // 특정 id로 게시물 상태 업데이트
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status)
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status)
    // }
}
