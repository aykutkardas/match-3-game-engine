import useCoord from "../../utils/useCoord";
import { ItemType } from "./item";

export type DistanceType = {
  x: number;
  y: number;
};

export type BoardConfig = {
  x: number;
  y: number;
};

export type ColumnType = {
  item: ItemType;
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
    Object.entries(this.board).forEach(([coord, data]) => {
      const [rowId, colId] = useCoord(coord);
      const item = { coord, ...data };
      if (matrix[rowId]) {
        matrix[rowId][colId] = item;
      } else {
        matrix[rowId] = [item];
      }
    });

    return matrix;
  };

  getItem = (coord: string): ItemType => {
    const isExistCoord = this.isExistCoord(coord);

    if (!isExistCoord) return;

    return this.board[coord].item;
  };

  setItem = (coord: string, item: ItemType) => {
    const isExistCoord = this.isExistCoord(coord);

    if (!isExistCoord) return;

    this.board[coord].item = item;
  };

  removeItem = (coord: string) => {
    const isExistCoord = this.isExistCoord(coord);

    if (!isExistCoord) return;

    this.board[coord].item = null;
  };

  selectItem = (coord: string) => {
    const isExistCoord = this.isExistCoord(coord);

    if (!isExistCoord) return;

    const item = this.board[coord].item;

    if (item) {
      item.selected = true;
    }
  };

  deselectItem = (coord: string) => {
    const isExistCoord = this.isExistCoord(coord);

    if (!isExistCoord) return;

    const item = this.board[coord].item;

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

  // [TODO]: Write Test
  getDirection = (fromCoord: string, toCoord: string): string => {
    const isExistFromCoord = this.isExistCoord(fromCoord);
    const isExistToCoord = this.isExistCoord(toCoord);

    if (!isExistFromCoord || !isExistToCoord) return;

    const [fromRowId, fromColId] = useCoord(fromCoord);
    const [toRowId, toColId] = useCoord(toCoord);

    if (fromColId > toColId && fromRowId < toRowId) return "bottomLeft";
    if (fromColId < toColId && fromRowId < toRowId) return "bottomRight";
    if (fromColId > toColId && fromRowId > toRowId) return "topLeft";
    if (fromColId < toColId && fromRowId > toRowId) return "topRight";
    if (fromColId < toColId && fromRowId == toRowId) return "right";
    if (fromColId > toColId && fromRowId == toRowId) return "left";
    if (fromColId == toColId && fromRowId > toRowId) return "top";
    if (fromColId == toColId && fromRowId < toRowId) return "bottom";
  };

  getDistanceBetweenTwoCoords = (
    fromCoord: string,
    toCoord: string
  ): DistanceType => {
    const isExistFromCoord = this.isExistCoord(fromCoord);
    const isExistToCoord = this.isExistCoord(toCoord);

    if (!isExistFromCoord || !isExistToCoord) return;

    const [fromRowId, fromColId] = useCoord(fromCoord);
    const [toRowId, toColId] = useCoord(toCoord);

    return { y: toRowId - fromRowId, x: toColId - fromColId };
  };

  isEmpty = (coord: string): boolean => {
    const isExistCoord = this.isExistCoord(coord);

    if (!isExistCoord) return;

    return !this.board[coord].item;
  };

  moveItem = (fromCoord: string, toCoord: string) => {
    const isExistFromCoord = this.isExistCoord(fromCoord);
    const isExistToCoord = this.isExistCoord(toCoord);

    if (!isExistFromCoord || !isExistToCoord) return;

    const { item } = this.board[fromCoord];
    this.board[fromCoord].item = null;
    this.board[toCoord].item = item;
  };

  switchItem = (fromCoord: string, toCoord: string) => {
    const isExistFromCoord = this.isExistCoord(fromCoord);
    const isExistToCoord = this.isExistCoord(toCoord);

    if (!isExistFromCoord || !isExistToCoord) return;

    const { item: fromItem } = this.board[fromCoord];
    const { item: toItem } = this.board[toCoord];

    this.board[fromCoord].item = toItem;
    this.board[toCoord].item = fromItem;
  };

  isExistCoord = (coord: string): boolean => {
    return !!this.board[coord];
  };
}

export default Board;
