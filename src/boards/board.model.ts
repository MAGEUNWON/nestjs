export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus;
}

// status는 공개, 비공개만 들어가야 하기 때문에 만들어 줌. 
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}