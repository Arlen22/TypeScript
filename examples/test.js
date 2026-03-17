var TryResult = /** @class */ (function () {
  function TryResult(ok, error, value) {
      this.ok = ok;
      this.error = error;
      this.value = value;
  }
  TryResult.prototype[Symbol.iterator] = function () {
      return [this.ok, this.error, this.value].values();
  };
  TryResult.ok = function (value) {
      return new TryResult(true, undefined, value);
  };
  TryResult.error = function (error) {
      return new TryResult(false, error, undefined);
  };
  return TryResult;
}());
export const test = (function () { try { return TryResult.ok(JSON.parse("")); } catch (e) { return TryResult.error(e); } }.bind(this)());
const { ok, error, value } = test;
const [ok2, error2, value2] = test;
// const {[Symbol.iterator]:test4} = test[Symbol.iterator];
if (!ok2 && !ok) {
    console.log(error);
    const t1 = error2;
    const t2 = error2;
    // const t1: {ok2: never} = {ok2} as const;
    const test2 = [ok, error, value];
    const test3 = [ok2, error2, value2];
    throw void 0;
}
//# sourceMappingURL=test.js.map