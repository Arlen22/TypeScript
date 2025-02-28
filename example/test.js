var TryResult = /** @class */ (function() {
    function TryResult(ok, error, value) {
        this.ok = ok;
        this.error = error;
        this.value = value;
    }
    TryResult.prototype[Symbol.iterator] = function() {
        return [this.ok, this.error, this.value].values();
    };
    TryResult.ok = function(value) {
        return new TryResult(true, undefined, value);
    };
    TryResult.error = function(error) {
        return new TryResult(false, error, undefined);
    };
    return TryResult;
}());
async function examples() {
    // array.map((fn) => try fn()).filter((result) => result.ok);
    const data = {};
    const expr1 = Promise.resolve("hello");
    const expr2 = Promise.resolve("world");
    const check = true;
    let result;
    result = function() { try { return TryResult.ok(expr1); } catch(e) { return TryResult.error(e); } }.bind(this)(); // literally any expression
    result = function() { try { return TryResult.ok(expr1 || expr2); } catch(e) { return TryResult.error(e); } }.bind(this)(); // the try covers both, same as an arrow function body
    result = function() { try { return TryResult.ok(check ? expr1 : expr2); } catch(e) { return TryResult.error(e); } }.bind(this)(); // try covers the entire expression
    result = function() { try { return TryResult.ok(expr1 ?? expr2); } catch(e) { return TryResult.error(e); } }.bind(this)(); // again covers the entire expression
    result = await async function() { try { return TryResult.ok(data?.someProperty.anotherFunction?.(await fetch("")).andAnotherOne()); } catch(e) { return TryResult.error(e); } }.bind(this)();
    result = await async function() { try { return TryResult.ok(await fetch("https://api.example.com/data", { headers: {} })); } catch(e) { return TryResult.error(e); } }.bind(this)();
    result = await async function() { try { return TryResult.ok((await expr1, await expr2)); } catch(e) { return TryResult.error(e); } }.bind(this)(); // covers all, returning the last one
    result = await async function() { try { return TryResult.ok(({ "my": await expr1 })); } catch(e) { return TryResult.error(e); } }.bind(this)(); // convers everything inside the object
    result = await async function() { try { return TryResult.ok([await (await fetch("")).json(), expr1, expr2]); } catch(e) { return TryResult.error(e); } }.bind(this)(); // covers everything inside the array
    // result = try this.test = this.test2 = await fetch(""); // covers everything
    const test = await async function() { try { return TryResult.ok(await createUser((await async function() { try { return TryResult.ok(await (await fetch("")).json()); } catch(e) { return TryResult.error(e); } }.bind(this)()).value)); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const exprsync = try expr1;
    const exprsync = function() { try { return TryResult.ok(expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const exprasync = try await expr1;
    const exprasync = await async function() { try { return TryResult.ok(await expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const expryield = try yield expr1;
    const expryield = yield * function*() { try { return TryResult.ok(yield expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const expryieldasync = try yield await expr1;
    const expryieldasync = yield * async function*() { try { return TryResult.ok(yield await expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const exprsyncyield = yield try expr1;
    const exprsyncyield = yield function() { try { return TryResult.ok(expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const exprsyncyieldasync = yield try await expr1;
    const exprsyncyieldasync = yield await async function() { try { return TryResult.ok(await expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
    // const expryieldyieldasync = yield try yield await expr1;
    const expryieldyieldasync = yield yield * async function*() { try { return TryResult.ok(yield await expr1); } catch(e) { return TryResult.error(e); } }.bind(this)();
}
async function* examples2() {
    const expression = "hello";
    console.log(function() { try { return TryResult.ok(expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    console.log(await async function() { try { return TryResult.ok(await expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    console.log(yield* function*() { try { return TryResult.ok(yield expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    console.log(yield* async function*() { try { return TryResult.ok(yield await expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    console.log(yield function() { try { return TryResult.ok(expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    console.log(yield await async function() { try { return TryResult.ok(await expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    console.log(yield yield* async function*() { try { return TryResult.ok(yield await expression); } catch(e) { return TryResult.error(e); } }.bind(this)());
    const result = function() { try { return TryResult.ok(expression); } catch(e) { return TryResult.error(e); } }.bind(this)();
    await Promise.resolve("hello");
}
(async () => {
    for await(const t of examples2())
        console.log(t);
})();
export {};
