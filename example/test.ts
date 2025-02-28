export { };




async function examples() {
  // array.map((fn) => try fn()).filter((result) => result.ok);
  const data = {} as any;
  const expr1 = Promise.resolve("hello");
  const expr2 = Promise.resolve("world");
  const check = true;
  let result;
  result = try expr1; // literally any expression
  result = try expr1 || expr2; // the try covers both, same as an arrow function body
  result = try check ? expr1 : expr2; // try covers the entire expression
  result = try expr1 ?? expr2; // again covers the entire expression
  result = try data?.someProperty.anotherFunction?.(await fetch("")).andAnotherOne()
  result = try await fetch("https://api.example.com/data", { headers: {} })
  result = try (await expr1, await expr2); // covers all, returning the last one
  result = try ({ "my": await expr1 }); // convers everything inside the object
  result = try [await (await fetch("")).json(), expr1, expr2]; // covers everything inside the array
  // result = try this.test = this.test2 = await fetch(""); // covers everything

  const test = try await createUser((try await (await fetch("")).json() as {hello: true}).value)

  // const exprsync = try expr1;
  const exprsync = try expr1;
  // const exprasync = try await expr1;
  const exprasync = try await expr1;
  // const expryield = try yield expr1;
  const expryield = try yield expr1;
  // const expryieldasync = try yield await expr1;
  const expryieldasync = try yield await expr1;
  // const exprsyncyield = yield try expr1;
  const exprsyncyield = yield try expr1;
  // const exprsyncyieldasync = yield try await expr1;
  const exprsyncyieldasync = yield try await expr1;
  // const expryieldyieldasync = yield try yield await expr1;
  const expryieldyieldasync = yield try yield await expr1;

}

async function* examples2() {

  const expression = "hello";
  console.log(try expression);
  console.log(try await expression);
  console.log(try yield expression);
  console.log(try yield await expression);
  console.log(yield try expression);
  console.log(yield try await expression);
  console.log(yield try yield await expression);
  const result = try expression;
  await Promise.resolve("hello");
}

(async () => {
  for await (const t of examples2()) console.log(t);
})();
