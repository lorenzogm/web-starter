export interface MathOperation {
  id: number;
  type: "addition" | "subtraction" | "multiplication";
  num1: number;
  num2: number;
  answer: number;
  difficulty: "easy" | "medium";
}

export interface OperationsData {
  operations: Array<MathOperation>;
}
