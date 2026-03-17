/////////////////////////////
/// Arlen22 Fork Additions
/////////////////////////////

interface SymbolConstructor { readonly iterableIndex: unique symbol; }
interface IndexedIterable<T extends { [x: number]: any }> {
  [Symbol.iterator]: () => Iterator<T[number]>
  [Symbol.iterableIndex]: T;
}

interface TryResultErrorObject {
  ok: false; error: Error; value: undefined;
  [Symbol.iterator]: () => Iterator<any>;
  [Symbol.iterableIndex]: {
    0: false, 1: Error, 2: undefined
  }
}

interface TryResultValueObject<V> {
  ok: true; error: undefined; value: V;
  [Symbol.iterator]: () => Iterator<any>;
  [Symbol.iterableIndex]: {
    0: true, 1: undefined, 2: V
  }
}

type TryResult<V> = TryResultErrorObject | TryResultValueObject<V>

interface ResultConstructor {
  /**
   * Creates a result for a successful operation
   */
  ok<V>(value: V): TryResult<V>

  /**
   * Creates a result for a failed operation
   */
  error<V>(error: unknown): TryResult<V>
}

declare const TryResult: ResultConstructor
