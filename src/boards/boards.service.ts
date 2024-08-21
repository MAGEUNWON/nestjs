import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid } from 'uuid' // 유니크한 id 값을 주기 위해 설치
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board2 } from './board.entity';
import { Repository } from 'typeorm';


@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    
    // 레포지토리 추가 
    constructor(
        @InjectRepository(Board2)
        private boardsRepository: Repository<Board2>,
    ) {}
    

    getAllBoards(): Board[] {
      return this.boards;
    }

    // 게시물 생성하기
    createBoard(CreateBoardDto: CreateBoardDto) {
        // Dto 적용
        const { title, description } = CreateBoardDto;

        const board: Board = {
            id: uuid(), 
            title,
            description,
            status: BoardStatus.PUBLIC // 기본 설정 public
        }

        this.boards.push(board);
        return board;
    }

    // 특정 id로 게시물 가져오기
    getBoardById(id: string) : Board {
        const found =  this.boards.find((board) => board.id === id);

        // 특정 게시물을 찾을 때 없는 경우 결과 값(에러값) 처리
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // 특정 id로 게시물 지우기
    deleteBoard(id: string): void { // rerurn 값을 클라이언트에 주지 않을 것이기 때문에 void로 타입 설정
        // 없는 게시물을 지우려 할 때 결과 값 처리
        const found = this.getBoardById(id); // 없으면 위에 처리된 에러 문구가 나오게 됨. 찾으면 삭제 시킴
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    // 특정 id로 게시물 상태 업데이트
    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
