
function* test() {

  return yield* function*(){
    try {
      console.log(yield "hello");
      console.log(yield "world");
      return "done";
    } catch (e){
      return e;
    }
  }.bind(this)();
}
// const test = (while(!i.done) {i = gen.next(yield i.value);})
const gen = test(1);
console.log(gen.next());
console.log(gen.next("welcome"));
console.log(gen.next("finished"));
