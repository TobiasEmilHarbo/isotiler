interface Number {
  equals(other: number, precision?: number): boolean;
  lessThanOrEqualTo(other: number, precision?: number): boolean;
  greaterThanOrEqualTo(other: number, precision?: number): boolean;
  lessThan(other: number, precision?: number): boolean;
}
