export interface LiteralKeyword<A> { readonly _tag: "LiteralKeyword", literal: A } // union should merge at typelevel

/*
 * ast0 - ast types with no arguments
 */

export interface NumberKeyword { readonly _tag: "NumberKeyword" }
export interface BooleanKeyword { readonly _tag: "BooleanKeyword" }
export interface StringKeyword { readonly _tag: "StringKeyword" }
export interface BigintKeyword { readonly _tag: "BigintKeyword" }
export interface NeverKeyword { readonly _tag: "NeverKeyword" }

export interface AST0Map {
  "NumberKeyword": NumberKeyword;
  "StringKeyword": StringKeyword;
  "BooleanKeyword": BooleanKeyword;
  "BigintKeyword": BigintKeyword;
  "NeverKeyword": NeverKeyword;
}

export type AST0 = AST0Map[keyof AST0Map]

export interface AST0TypeMap {
  "NumberKeyword": number;
  "StringKeyword": string;
  "BooleanKeyword": boolean;
  "BigintKeyword": bigint;
  "NeverKeyword": never;
}

/*
 * ast1 - ast types with one argument
 */

export interface ArrayKeyword<A1 extends AST> {
  readonly _tag: "ArrayKeyword"
  readonly optional: A1
}

export interface OptionalKeyword<A extends AST> {
  readonly _tag: "OptionalKeyword"
  readonly optional: A
}

interface AST1Map<A extends AST> { 
  "ArrayKeyword": ArrayKeyword<A>;
  "OptionalKeyword": OptionalKeyword<A>;
}

export type AST1<A extends AST> = AST1Map<A>[keyof AST1Map<A>]

export interface AST1TypeMap<A extends AST> {
  "ArrayKeyword": A[];
  "OptionalKeyword": A | undefined;
}

/*
 * ast2 - ast types with two arguments
 */

export interface FunctionKeyword<A1 extends AST, A2 extends AST> {
  readonly _tag: "FunctionKeyword"
  readonly input: A1
  readonly output: A2
}

export interface UnionKeyword<A1 extends AST, A2 extends AST> {
  readonly _tag: "UnionKeyword"
  readonly left: A1
  readonly right: A2
}

export interface IntersectionKeyword<A1 extends AST, A2 extends AST> {
  readonly _tag: "IntersectionKeyword"
  readonly left: A1
  readonly right: A2
}

interface AST2Map<A1 extends AST, A2 extends AST> { 
  "FunctionKeyword": FunctionKeyword<A1, A2>;
  "UnionKeyword": UnionKeyword<A1, A2>;
  "IntersectionKeyword": IntersectionKeyword<A1, A2>;
}

export type AST2<A1 extends AST, A2 extends AST> = AST2Map<A1, A2>[keyof AST2Map<A1, A2>]

export interface AST2TypeMap<A extends AST> {
  "ArrayKeyword": A[];
  "OptionalKeyword": A | undefined;
}

/*
 * astN - ast types with N arguments (i.e. a tuple of ASTs)
 */

export interface TupleKeyword<A extends ASTArray> {
  readonly _tag: "TupleKeyword"
  readonly tuple: A
}

interface ASTNMap<A extends ReadonlyArray<AST>> { 
  "TupleKeyword": TupleKeyword<A>;
}

export type ASTN<A extends ASTArray> = ASTNMap<A>[keyof ASTNMap<A>]

/*
 * ast - the union of all AST types
*/

export type AST = AST0 
  | ASTArray
  | AST1<AST0 | ASTArray> 
  | AST1<AST1<AST0 | ASTArray>> 
  | AST1<AST1<AST1<AST0 | ASTArray>>>
  | AST1<AST1<AST1<AST1<AST0 | ASTArray>>>>

export type ASTArray = ReadonlyArray<AST>