/////////////////////////////
/// Arlen22 Fork Additions
/////////////////////////////

interface SymbolConstructor { readonly iterableIndex: unique symbol; }
interface IndexedIterable<T extends any[] | { [x: number]: any }> {
  [Symbol.iterator]: () => Iterator<T[number]>
  [Symbol.iterableIndex]: T;
}

interface TryResultErrorObject extends IndexedIterable<{
  0: false, 1: Error, 2: undefined
}> {
  ok: false; error: Error; value: undefined;
}

interface TryResultValueObject<V> extends IndexedIterable<{
  0: true, 1: undefined, 2: V
}> {
  ok: true; error: undefined; value: V;
}

type TryResult<V> = TryResultError | TryResultValue<V>

interface ResultConstructor {
  /**
   * Creates a result from a tuple
   *
   * @example
   *
   * new Result(true, undefined, 42)
   * new Result(false, new Error('Something went wrong'))
   */
  new <V>(...args: TryResultValueTuple<V> | TryResultErrorTuple): TryResult<V>

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
