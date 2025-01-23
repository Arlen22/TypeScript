

/**
 * Error result type expressed as object
 */
type TryResultErrorObject = { ok: false; error: unknown; value: undefined }

/**
 * Error result type expressed as tuple.
 *
 * - `error` type depends on `useUnknownInCatchVariables` tsconfig option
 */
type TryResultErrorTuple = [ok: false, error: unknown, value: undefined]

/**
 * An error result is a object that can be either destructured {@link TryResultErrorObject} or accessed by index {@link TryResultErrorTuple}
 */
type TryResultError = TryResultErrorObject & TryResultErrorTuple

/**
 * Value result type expressed as object
 */
type TryResultValueObject<V> = { ok: true; error: undefined; value: V }

/**
 * Value result type expressed as tuple
 */
type TryResultValueTuple<V> = [ok: true, error: undefined, value: V]

/**
 * A value result is a object that can be either destructured {@link TryResultValueObject} or accessed by index {@link TryResultValueTuple}
 */
type TryResultValue<V> = TryResultValueObject<V> & TryResultValueTuple<V>

/**
 * A result is a object that can represent the result of either a failed or successful operation.
 */
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
