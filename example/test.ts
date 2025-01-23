export { };

function* test() {
  try {
    const test2 = yield (yield fetch("url")).json()
    console.log("success")
  } catch (e) {
    console.log("failed");
  }
  console.log("continue");
}

async function tester(arg: any) {
  try {
    // const test2 = try await (await fetch("")).json();
    // const test3 = try JSON.parse();
    // const test2 = await (async () => { try { return await (await fetch("")).json(); } catch (e) { return e; } })();
    // const test3 = (() => { try { return JSON.parse(); } catch (e) { return e; } })();
    console.log("it worked");
  } catch (e) {
    console.log("it didn't")
  }
  console.log("keep going");
}



// async function examples() {
//   array.map((fn) => try fn()).filter((result) => result.ok);
//   let result;
//   result = try expr1; // literally any expression
//   result = try data?.someProperty.anotherFunction?.(await someData()).andAnotherOne()
//   result = try await fetch("https://api.example.com/data", { headers: {} })
//   result = try expression1 || expression2; // the try covers both, same as an arrow function body
//   result = try check ? expression1 : expression2; // try covers the entire expression
//   result = try expression1 ?? expresssion2; // again covers the entire expression
//   result = try (expression1, expression2); // covers all, returning the last one
//   result = try ({ "my": await fetch() }); // convers everything inside the object
//   result = try [await (await fetch()).json(), expression1, anythingelse]; // covers everything inside the array
//   result = try this.test = this.test2 = await fetch(); // covers everything
// }

async function* examples2() {
  // function test2() { console.log(arguments) }
  const expression = "hello";
  console.log(try await expression);
  console.log(try yield expression);
  console.log(try yield await expression);
  console.log(yield try expression);
  console.log(yield try await expression);
  console.log(yield try yield await expression);
  await Promise.resolve("hello");
}

(async () => {
  for await (const t of examples2()) console.log(t);
})();
