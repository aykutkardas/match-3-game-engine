import useCoord from "./utils/useCoord";
import { ItemType } from "./items/default-item";
import { CheckersItemType } from "./items/checkers-item";

export type DistanceType = {
  x: number;
  y: number;
};

export type BoardConfig = {
  x: number;
  y: number;
};

export type ColumnType = {
  item: ItemType | CheckersItemType;
};

export type BoardType = {
  [key: string]: ColumnType;
};

class Board {
  config: BoardConfig;

  board: BoardType = {};

  constructor(config: BoardConfig) {
    const board = Board.createBoard(config);

    this.config = config;
    this.board = board;

    return this;
  }

  static createBoard = (config: BoardConfig): BoardType => {
    const { x, y } = config;
    const board: BoardType = {};

    for (let rowIndex = 0; rowIndex < x; rowIndex += 1) {
      for (let colIndex = 0; colIndex < y; colIndex += 1) {
        board[`${rowIndex}|${colIndex}`] = { item: null };
      }
    }

    return board;
  };

  getBoardMatrix = () => {
    const matrix = [];
    Object.entries(this.board).forEach(([id, data]) => {
      const [rowId, colId] = useCoord(id);
      const item = { id, ...data };
      if (matrix[rowId]) {
        matrix[rowId][colId] = item;
      } else {
        matrix[rowId] = [item];
      }
    });

    return matrix;
  };

  getItem = (id: string): ItemType | CheckersItemType => {
    const isExistCoord = this.isExistCoord(id);

    if (!isExistCoord) return;

    return this.board[id].item;
  };

  setItem = (id: string, item: ItemType | CheckersItemType) => {
    const isExistCoord = this.isExistCoord(id);

    if (!isExistCoord) return;

    this.board[id].item = item;
  };

  removeItem = (id: string) => {
    const isExistCoord = this.isExistCoord(id);

    if (!isExistCoord) return;

    this.board[id].item = null;
  };

  selectItem = (id: string) => {
    const isExistCoord = this.isExistCoord(id);

    if (!isExistCoord) return;

    const item = this.board[id].item;

    if (item) {
      item.selected = true;
    }
  };

  deselectItem = (id: string) => {
    const isExistCoord = this.isExistCoord(id);

    if (!isExistCoord) return;

    const item = this.board[id].item;

    if (item) {
      item.selected = false;
    }
  };

  deselectAllItems = () => {
    Object.keys(this.board).forEach((coord) => {
      const item = this.board[coord].item;
      if (item) {
        item.selected = false;
      }
    });
  };

  getDirection = (fromId: string, toId: string): string => {
    const isExistFromCoord = this.isExistCoord(fromId);
    const isExistToCoord = this.isExistCoord(toId);

    if (!isExistFromCoord || !isExistToCoord) return;

    const [fromRowId, fromColId] = useCoord(fromId);
    const [toRowId, toColId] = useCoord(toId);

    if (fromColId > toColId && fromRowId < toRowId) return "leftTop";
    if (fromColId > toColId && fromRowId > toRowId) return "leftBottom";
    if (fromColId < toColId && fromRowId < toRowId) return "rightTop";
    if (fromColId < toColId && fromRowId > toRowId) return "rightBottom";
    if (fromColId < toColId && fromRowId == toRowId) return "right";
    if (fromColId > toColId && fromRowId == toRowId) return "left";
    if (fromColId == toColId && fromRowId > toRowId) return "top";
    if (fromColId == toColId && fromRowId < toRowId) return "bottom";
  };

  getDistanceBetweenTwoCoords = (
    fromId: string,
    toId: string
  ): DistanceType => {
    const isExistFromCoord = this.isExistCoord(fromId);
    const isExistToCoord = this.isExistCoord(toId);

    if (!isExistFromCoord || !isExistToCoord) return;

    const [fromRowId, fromColId] = useCoord(fromId);
    const [toRowId, toColId] = useCoord(toId);

    return { y: toRowId - fromRowId, x: toColId - fromColId };
  };

  isEmpty = (id: string): boolean => {
    const isExistCoord = this.isExistCoord(id);

    if (!isExistCoord) return;

    return !this.board[id].item;
  };

  moveItem = (fromId: string, toId: string) => {
    const isExistFromCoord = this.isExistCoord(fromId);
    const isExistToCoord = this.isExistCoord(toId);

    if (!isExistFromCoord || !isExistToCoord) return;

    const { item } = this.board[fromId];
    this.board[fromId].item = null;
    this.board[toId].item = item;
  };

  switchItem = (fromId: string, toId: string) => {
    const isExistFromCoord = this.isExistCoord(fromId);
    const isExistToCoord = this.isExistCoord(toId);

    if (!isExistFromCoord || !isExistToCoord) return;

    const { item: fromItem } = this.board[fromId];
    const { item: toItem } = this.board[toId];

    this.board[fromId].item = toItem;
    this.board[toId].item = fromItem;
  };

  isExistCoord = (id: string): boolean => {
    return !!this.board[id];
  };
}

export default Board;
