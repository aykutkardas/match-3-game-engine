import { expect } from "chai";
import "mocha";

import Board from "../src/board";
import Item from "../src/item";

describe("Board Tests", () => {
  it("Square Board 3x3", () => {
    const board = new Board({ x: 3, y: 3 }).board;

    expect(board).to.deep.equal({
      "0|0": { item: null },
      "0|1": { item: null },
      "0|2": { item: null },
      "1|0": { item: null },
      "1|1": { item: null },
      "1|2": { item: null },
      "2|0": { item: null },
      "2|1": { item: null },
      "2|2": { item: null },
    });
  });

  it("Rectangle Board 3x5", () => {
    const board = new Board({ x: 3, y: 5 }).board;

    expect(board).to.deep.equal({
      "0|0": { item: null },
      "0|1": { item: null },
      "0|2": { item: null },
      "0|3": { item: null },
      "0|4": { item: null },
      "1|0": { item: null },
      "1|1": { item: null },
      "1|2": { item: null },
      "1|3": { item: null },
      "1|4": { item: null },
      "2|0": { item: null },
      "2|1": { item: null },
      "2|2": { item: null },
      "2|3": { item: null },
      "2|4": { item: null },
    });
  });

  it("Rectangle Board 5x3", () => {
    const board = new Board({ x: 5, y: 3 }).board;

    expect(board).to.deep.equal({
      "0|0": { item: null },
      "0|1": { item: null },
      "0|2": { item: null },
      "1|0": { item: null },
      "1|1": { item: null },
      "1|2": { item: null },
      "2|0": { item: null },
      "2|1": { item: null },
      "2|2": { item: null },
      "3|0": { item: null },
      "3|1": { item: null },
      "3|2": { item: null },
      "4|0": { item: null },
      "4|1": { item: null },
      "4|2": { item: null },
    });
  });

  it("Set Item Method", () => {
    const board = new Board({ x: 3, y: 3 });
    const item = new Item({
      rules: {
        movement: {
          angular: true,
          linear: true,
          stepCount: 4,
        },
      },
    });

    board.setItem("0|1", item);

    expect(board.board).to.deep.equal({
      "0|0": { item: null },
      "0|1": { item: item },
      "0|2": { item: null },
      "1|0": { item: null },
      "1|1": { item: null },
      "1|2": { item: null },
      "2|0": { item: null },
      "2|1": { item: null },
      "2|2": { item: null },
    });
  });

  it("Move Item Method", () => {
    const board = new Board({ x: 3, y: 3 });
    const item = new Item({
      rules: {
        movement: {
          angular: true,
          linear: true,
          stepCount: 4,
        },
      },
    });

    board.setItem("0|1", item);
    board.moveItemToCoord("0|1", "1|1");

    expect(board.board).to.deep.equal({
      "0|0": { item: null },
      "0|1": { item: null },
      "0|2": { item: null },
      "1|0": { item: null },
      "1|1": { item: item },
      "1|2": { item: null },
      "2|0": { item: null },
      "2|1": { item: null },
      "2|2": { item: null },
    });
  });
});
