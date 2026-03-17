export const test = (try JSON.parse("") as { hello: "world" }[]);

const { ok, error, value } = test;
const [ok2, error2, value2] = test;

// const {[Symbol.iterator]:test4} = test[Symbol.iterator];

if (!ok2 && !ok) {
  console.log(error);
  const t1: Error = error2;
  const t2: undefined = error2;
  // const t1: {ok2: never} = {ok2} as const;
  const test2 = [ok, error, value] as const;
  const test3 = [ok2, error2, value2] as const;
  throw void 0;
}
// const t2: {ok2: never} = {ok2} as const;

declare global {

  interface SymbolConstructor { readonly iterableIndex: unique symbol; }
  interface IndexedIterable<T extends { [x: number]: any }> {
    [Symbol.iterator]: () => Iterator<T[number]>
    [Symbol.iterableIndex]: T;
  }
  // type inferer<T> = T extends IndexedIterable<infer R> ? R : never;
  // interface InferIterableIndex<T> extends inferer<T> { }

  interface TryResultErrorObject {
    0: false, 1: Error, 2: undefined
    ok: false; error: Error; value: undefined;
    [Symbol.iterator]: () => Iterator<any>;
    [Symbol.iterableIndex]: any;
  }

  interface TryResultValueObject<V> {
    0: true, 1: undefined, 2: V
    ok: true; error: undefined; value: V;
    [Symbol.iterator]: () => Iterator<any>;
    [Symbol.iterableIndex]: any;
  }

  // interface TryResultErrorObject {
  //   ok: false; error: Error; value: undefined;
  //   [Symbol.iterator]: () => Iterator<any>;
  //   [Symbol.iterableIndex]: {
  //     0: false, 1: Error, 2: undefined
  //   }
  // }

  // interface TryResultValueObject<V> {
  //   ok: true; error: undefined; value: V;
  //   [Symbol.iterator]: () => Iterator<any>;
  //   [Symbol.iterableIndex]: {
  //     0: true, 1: undefined, 2: V
  //   }
  // }

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

  const TryResult: ResultConstructor

}