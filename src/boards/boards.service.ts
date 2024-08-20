import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid } from 'uuid' // 유니크한 id 값을 주기 위해 설치
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

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
        return this.boards.find((board) => board.id === id);
    }

    // 특정 id로 게시물 지우기
    deleteBoard(id: string): void { // rerurn 값을 클라이언트에 주지 않을 것이기 때문에 void로 타입 설정
        this.boards.filter((board) => board.id !== id)
    }

    // 특정 id로 게시물 상태 업데이트
    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
