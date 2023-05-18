import express from "express";
import cors from "cors";
import { Sudoku } from "./Sudoku.js"
import { Util } from "./Util.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`);
});

app.get("/puzzle", (req, res) => {
    let sudoku = new Sudoku();
    let puzzle = sudoku.puzzle;
    res.status(200).send({ game: puzzle });
});

app.post("/solve", (req, res) => {
    let puzzle = [];
    // Util.print2DArray(puzzle);
    Util.copyGrid(req.body.board, puzzle);
    let sudoku = new Sudoku(puzzle);
    let solution = sudoku.isSolvable();
    let solvedSudoku;
    let status;
    if (solution) {
        solvedSudoku = sudoku.solvedPuzzle;
        // Util.print2DArray(solvedSudoku);
        status = true;
    }
    else {
        solvedSudoku = req.body.board;
        status = false;
    }
    res.status(200).send({ solution: solvedSudoku, status: status });
});


app.post("/validate", (req, res) => {
    let puzzle = [];
    Util.copyGrid(req.body.board, puzzle);
    let sudoku = new Sudoku(puzzle);
    let status = sudoku.validate();
    res.status(200).send({ status: status });
})

