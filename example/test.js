"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
function examples() {
    return __awaiter(this, void 0, void 0, function* () {
        // array.map((fn) => try fn()).filter((result) => result.ok);
        const data = {};
        const expr1 = Promise.resolve("hello");
        const expr2 = Promise.resolve("world");
        const check = true;
        let result;
        result = function () { try { return TryResult.ok(expr1); } catch (e) { return TryResult.error(e); } }.bind(this)(); // literally any expression
        result = function () { try { return TryResult.ok(expr1 || expr2); } catch (e) { return TryResult.error(e); } }.bind(this)(); // the try covers both, same as an arrow function body
        result = function () { try { return TryResult.ok(check ? expr1 : expr2); } catch (e) { return TryResult.error(e); } }.bind(this)(); // try covers the entire expression
        result = function () { try { return TryResult.ok(expr1 !== null && expr1 !== void 0 ? expr1 : expr2); } catch (e) { return TryResult.error(e); } }.bind(this)(); // again covers the entire expression
        result = yield function () {
            return __awaiter(this, void 0, void 0, function* () { var _a, _b; try { return TryResult.ok((_b = data === null || data === void 0 ? void 0 : (_a = data.someProperty).anotherFunction) === null || _b === void 0 ? void 0 : _b.call(_a, yield fetch("")).andAnotherOne()); } catch (e) { return TryResult.error(e); } });
        }.bind(this)();
        result = yield function () {
            return __awaiter(this, void 0, void 0, function* () { try { return TryResult.ok(yield fetch("https://api.example.com/data", { headers: {} })); } catch (e) { return TryResult.error(e); } });
        }.bind(this)();
        result = yield function () {
            return __awaiter(this, void 0, void 0, function* () { try { return TryResult.ok((yield expr1, yield expr2)); } catch (e) { return TryResult.error(e); } });
        }.bind(this)(); // covers all, returning the last one
        result = yield function () {
            return __awaiter(this, void 0, void 0, function* () { try { return TryResult.ok(({ "my": yield expr1 })); } catch (e) { return TryResult.error(e); } });
        }.bind(this)(); // convers everything inside the object
        result = yield function () {
            return __awaiter(this, void 0, void 0, function* () { try { return TryResult.ok([yield (yield fetch("")).json(), expr1, expr2]); } catch (e) { return TryResult.error(e); } });
        }.bind(this)(); // covers everything inside the array
        // result = try this.test = this.test2 = await fetch(""); // covers everything
    });
}
function examples2() {
    return __asyncGenerator(this, arguments, function* examples2_1() {
        const expression = "hello";
        console.log(function () { try { return TryResult.ok(expression); } catch (e) { return TryResult.error(e); } }.bind(this)());
        console.log(yield __await(function () {
            return __awaiter(this, void 0, void 0, function* () { try { return TryResult.ok(yield expression); } catch (e) { return TryResult.error(e); } });
        }.bind(this)()));
        console.log(yield __await(yield* __asyncDelegator(__asyncValues(function* () { try { return TryResult.ok(yield expression); } catch (e) { return TryResult.error(e); } }.bind(this)()))));
        console.log(yield __await(yield* __asyncDelegator(__asyncValues(function () { return __asyncGenerator(this, arguments, function* () { try { return yield __await(TryResult.ok(yield yield __await(yield __await(expression)))); } catch (e) { return yield __await(TryResult.error(e)); } }); }.bind(this)()))));
        console.log(yield yield __await(function () { try { return TryResult.ok(expression); } catch (e) { return TryResult.error(e); } }.bind(this)()));
        console.log(yield yield __await(yield __await(function () {
            return __awaiter(this, void 0, void 0, function* () { try { return TryResult.ok(yield expression); } catch (e) { return TryResult.error(e); } });
        }.bind(this)())));
        console.log(yield yield __await(yield __await(yield* __asyncDelegator(__asyncValues(function () { return __asyncGenerator(this, arguments, function* () { try { return yield __await(TryResult.ok(yield yield __await(yield __await(expression)))); } catch (e) { return yield __await(TryResult.error(e)); } }); }.bind(this)())))));
        const result = function () { try { return TryResult.ok(expression); } catch (e) { return TryResult.error(e); } }.bind(this)();
        yield __await(Promise.resolve("hello"));
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        for (var _d = true, _e = __asyncValues(examples2()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
            _d = false;
            const t = _c;
            console.log(t);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
}))();
