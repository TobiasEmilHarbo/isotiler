interface Number {
  equals(other: number, precision?: number): boolean;
  equalOrLessThan(other: number, precision?: number): boolean;
  lessThan(other: number, precision?: number): boolean;
}
