import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid } from 'uuid' // 유니크한 id 값을 주기 위해 설치

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
      return this.boards;
    }

    // 게시물 생성하기
    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuid(), 
            title,
            description,
            status: BoardStatus.PUBLIC // 기본 설정 public
        }

        this.boards.push(board);
        return board;
    }
}
