function isPromise(result) { return result && typeof result.then === 'function'; }
function isIterable(result) { return result && typeof result[Symbol.iterator] === 'function'; }
function isAsyncIterable(result) { return result && typeof result[Symbol.asyncIterator] === 'function'; }

function try_(callback) {
  const syncCall = (function () {
    try {
      return TryResult.ok(callback());
    } catch (e) {
      return TryResult.error(e);
    }
  }).apply(this) as TryResult<any>;

  if (!syncCall.ok) return syncCall;

  if (isPromise(syncCall.value)) {
    return syncCall.value.then(
      (value) => TryResult.ok(value),
      (e) => TryResult.error(e)
    );
  }
  // Returns the value returned by that iterator when it's closed (when done is true).
  if (isIterable(syncCall.value)) {
    return (function* () {
      try {
        return TryResult.ok(yield* syncCall.value);
      } catch (e) {
        return TryResult.error(e);
      }
    }).bind(this)();
  }

  if (isAsyncIterable(syncCall.value)) {
    return (async function* () {
      try {
        return TryResult.ok(yield* syncCall.value);
      } catch (e) {
        return TryResult.error(e);
      }
    }).bind(this)();
  }

}


async function* demo() {
  // try "hello"
  const [ok, error, value] = try_("hello");

  // try await "hello"
  const [ok, error, value] = await try_(async () => await "hello");

  // try yield "hello"
  const [ok, error, value] = yield* try_(function* () { return "hello"; });

  // try yield await "hello"
  const [ok, error, value] = yield* try_(async function* () { return await "hello"; });

}
