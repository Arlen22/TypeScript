import {
  Bundle,
  chainBundle,
  EmitFlags,
  isFunctionLikeDeclaration,
  ModifierFlags,
  Node,
  setEmitFlags,
  SourceFile,
  SyntaxKind,
  TransformationContext,
  TryExpression,
  UnscopedEmitHelper,
  visitEachChild,
  VisitResult,
} from "../_namespaces/ts.js";
const TryResultConstructor: UnscopedEmitHelper = {
  name: "typescript:tryresult",
  importName: "__TryResultConstructor",
  scoped: false,
  priority: 3,
  text: `
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
`,
};
/** @internal */
export function transformTryExpression(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
  const {
    factory,
    hoistVariableDeclaration,
    requestEmitHelper,

  } = context;

  return chainBundle(context, transformSourceFile);

  function transformSourceFile(node: SourceFile) {
    if (node.isDeclarationFile) {
      return node;
    }

    return visitEachChild(node, visitor, context);
  }

  function visitor(node: Node): VisitResult<Node> {
    switch (node.kind) {
      case SyntaxKind.TryExpression:
        return visitTryExpression(node as TryExpression);
      default:
        return visitEachChild(node, visitor, context);
    }
  }

  function visitTryExpression(node: TryExpression): VisitResult<Node> {
    let hasAwait = false, hasYield = false;;
    function checkForAwait(node: Node) {
      if (node.kind === SyntaxKind.AwaitExpression) hasAwait = true;
      if (node.kind === SyntaxKind.YieldExpression) hasYield = true;
      if (isFunctionLikeDeclaration(node)) return node;
      return visitEachChild(node, checkForAwait, context);
    }
    checkForAwait(node);
    const expression = visitEachChild(node.expression, visitor, context);
    const catchVar = factory.createIdentifier("e");
    requestEmitHelper(TryResultConstructor);

    const callExpression = factory.createCallExpression(
      factory.createFunctionBindCall(
        factory.createFunctionExpression(
          factory.createModifiersFromModifierFlags(+hasAwait && ModifierFlags.Async),
          hasYield ? factory.createToken(SyntaxKind.AsteriskToken) : undefined,
          /*name*/ undefined,
          /*typeParameters*/ undefined,
          [],
          /*type*/ undefined,
          factory.createBlock([
            setEmitFlags(factory.createTryStatement(
              setEmitFlags(
                factory.createBlock([
                  factory.createReturnStatement(
                    factory.createGlobalMethodCall("TryResult", "ok", [
                      expression
                    ])
                  )
                ]),
                EmitFlags.SingleLine
              ),
              factory.createCatchClause(
                catchVar,
                setEmitFlags(
                  factory.createBlock([
                    factory.createReturnStatement(
                      factory.createGlobalMethodCall("TryResult", "error", [
                        catchVar
                      ])
                    )
                  ]),
                  EmitFlags.SingleLine
                ),
              ),
              /*finallyBlock*/ undefined
            ), EmitFlags.SingleLine)
          ])
        ),
        factory.createThis(),
        []
      ),
      /*typeArguments*/ undefined,
      []
    );
    // yield handles both sync and async
    if (hasYield) {
      return factory.createYieldExpression(
        factory.createToken(SyntaxKind.AsteriskToken),
        callExpression
      )
    } else if (hasAwait) {
      return factory.createAwaitExpression(callExpression);
    } else {
      return callExpression;
    }

  }

}