import {
  BinaryExpression,
  Bundle,
  chainBundle,
  Debug,
  EmitFlags,
  Expression,
  FunctionExpression,
  isAsyncFunction,
  isElementAccessExpression,
  isExpression,
  isFunctionDeclaration,
  isFunctionExpression,
  isFunctionLike,
  isFunctionLikeDeclaration,
  isFunctionLikeKind,
  isPropertyAccessExpression,
  ModifierFlags,
  modifierToFlag,
  Node,
  setEmitFlags,
  setTextRange,
  SourceFile,
  SyntaxKind,
  TransformationContext,
  TransformFlags,
  TryExpression,
  UnscopedEmitHelper,
  visitEachChild,
  visitNode,
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
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [4 /*yield*/, this.ok];
              case 1:
                  _a.sent();
                  return [4 /*yield*/, this.error];
              case 2:
                  _a.sent();
                  return [4 /*yield*/, this.value];
              case 3:
                  _a.sent();
                  return [2 /*return*/];
          }
      });
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
          undefined,
          undefined,
          [],
          undefined,
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
              undefined
            ), EmitFlags.SingleLine)
          ])
        ),
        factory.createThis(),
        []
      ),
      undefined,
      []
    );
    // if(hasYield){
    //   const _1 = factory.createPropertyAccessExpression(callExpression, "next");
    //   const _2 = factory.createCallExpression(_1, undefined, undefined);
    //   const _3 = factory.createPropertyAccessExpression(_2, "value");
    //   return _3;
    // }
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
  function create_try_await_helper(node: TryExpression, hasAwait: boolean) {


  }

  /**
   * Gets an identifier for the name of an *unscoped* emit helper.
   */
  function getUnscopedHelperName(name: string) {
    return setEmitFlags(factory.createIdentifier(name), EmitFlags.HelperName | EmitFlags.AdviseOnEmitNode);
  }
  // function createTryStatement(){
  //     return factory.createTryStatement(
  //         factory.createBlock([
  //             factory.restoreEnclosingLabel(
  //                 forStatement,
  //                 outermostLabeledStatement,
  //             ),
  //         ]),
  //         factory.createCatchClause(
  //             factory.createVariableDeclaration(catchVariable),
  //             setEmitFlags(
  //                 factory.createBlock([
  //                     factory.createExpressionStatement(
  //                         factory.createAssignment(
  //                             errorRecord,
  //                             factory.createObjectLiteralExpression([
  //                                 factory.createPropertyAssignment("error", catchVariable),
  //                             ]),
  //                         ),
  //                     ),
  //                 ]),
  //                 EmitFlags.SingleLine,
  //             ),
  //         ),
  //         factory.createBlock([
  //             factory.createTryStatement(
  //                 /*tryBlock*/ factory.createBlock([
  //                     setEmitFlags(
  //                         factory.createIfStatement(
  //                             factory.createLogicalAnd(
  //                                 factory.createLogicalAnd(
  //                                     factory.createLogicalNot(nonUserCode),
  //                                     factory.createLogicalNot(done),
  //                                 ),
  //                                 factory.createAssignment(
  //                                     returnMethod,
  //                                     factory.createPropertyAccessExpression(iterator, "return"),
  //                                 ),
  //                             ),
  //                             factory.createExpressionStatement(createDownlevelAwait(callReturn)),
  //                         ),
  //                         EmitFlags.SingleLine,
  //                     ),
  //                 ]),
  //                 /*catchClause*/ undefined,
  //                 /*finallyBlock*/ setEmitFlags(
  //                     factory.createBlock([
  //                         setEmitFlags(
  //                             factory.createIfStatement(
  //                                 errorRecord,
  //                                 factory.createThrowStatement(
  //                                     factory.createPropertyAccessExpression(errorRecord, "error"),
  //                                 ),
  //                             ),
  //                             EmitFlags.SingleLine,
  //                         ),
  //                     ]),
  //                     EmitFlags.SingleLine,
  //                 ),
  //             ),
  //         ]),
  //     );
  // }
  // function visitExponentiationAssignmentExpression(node: BinaryExpression) {
  //     let target: Expression;
  //     let value: Expression;
  //     const left = visitNode(node.left, visitor, isExpression);
  //     const right = visitNode(node.right, visitor, isExpression);
  //     if (isElementAccessExpression(left)) {
  //         // Transforms `a[x] **= b` into `(_a = a)[_x = x] = Math.pow(_a[_x], b)`
  //         const expressionTemp = factory.createTempVariable(hoistVariableDeclaration);
  //         const argumentExpressionTemp = factory.createTempVariable(hoistVariableDeclaration);
  //         target = setTextRange(
  //             factory.createElementAccessExpression(
  //                 setTextRange(factory.createAssignment(expressionTemp, left.expression), left.expression),
  //                 setTextRange(factory.createAssignment(argumentExpressionTemp, left.argumentExpression), left.argumentExpression),
  //             ),
  //             left,
  //         );
  //         value = setTextRange(
  //             factory.createElementAccessExpression(
  //                 expressionTemp,
  //                 argumentExpressionTemp,
  //             ),
  //             left,
  //         );
  //     }
  //     else if (isPropertyAccessExpression(left)) {
  //         // Transforms `a.x **= b` into `(_a = a).x = Math.pow(_a.x, b)`
  //         const expressionTemp = factory.createTempVariable(hoistVariableDeclaration);
  //         target = setTextRange(
  //             factory.createPropertyAccessExpression(
  //                 setTextRange(factory.createAssignment(expressionTemp, left.expression), left.expression),
  //                 left.name,
  //             ),
  //             left,
  //         );
  //         value = setTextRange(
  //             factory.createPropertyAccessExpression(
  //                 expressionTemp,
  //                 left.name,
  //             ),
  //             left,
  //         );
  //     }
  //     else {
  //         // Transforms `a **= b` into `a = Math.pow(a, b)`
  //         target = left;
  //         value = left;
  //     }
  //     return setTextRange(
  //         factory.createAssignment(
  //             target,
  //             setTextRange(factory.createGlobalMethodCall("Math", "pow", [value, right]), node),
  //         ),
  //         node,
  //     );
  // }

  // function visitExponentiationExpression(node: BinaryExpression) {
  //     // Transforms `a ** b` into `Math.pow(a, b)`
  //     const left = visitNode(node.left, visitor, isExpression);
  //     const right = visitNode(node.right, visitor, isExpression);
  //     return setTextRange(factory.createGlobalMethodCall("Math", "pow", [left, right]), node);
  // }
}




// import {
//     NodeFactory,
//     TransformationContext,
//     Node,
//     VisitResult,
//     Identifier,
//     Expression,
//     SyntaxKind,
//     VariableDeclaration,
//     EmitFlags,
//     factory as tsFactory,
//     chainBundle,
// } from "../_namespaces/ts.js";

// /**
//  * Transforms the following syntax:
//  * ```js
//  * const result = try expr1;
//  * ```
//  * Into:
//  * ```js
//  * let _result;
//  * try {
//  *     _result = TryResult.ok(expr1);
//  * } catch (error) {
//  *     _result = TryResult.error(error);
//  * }
//  * const result = _result;
//  * ```
//  */
// export function transformTryExpression(context: TransformationContext): (node: Node) => VisitResult<Node> {
//     const { factory } = context;


//     return chainBundle(context, transformSourceFile);
// }

// function transformSourceFile(node: SourceFile) {
//     if (node.isDeclarationFile) {
//         return node;
//     }

//     currentSourceFile = node;
//     const visited = visitSourceFile(node);
//     addEmitHelpers(visited, context.readEmitHelpers());

//     currentSourceFile = undefined!;
//     taggedTemplateStringDeclarations = undefined!;
//     return visited;
//     return (node: Node): VisitResult<Node> => {
//         if (
//             node.kind === SyntaxKind.VariableDeclaration &&
//             isTryExpressionDeclaration(node as VariableDeclaration)
//         ) {
//             return transformTryExpressionDeclaration(node as VariableDeclaration, factory);
//         }
//         return node;
//     };
// }

// function isTryExpressionDeclaration(node: VariableDeclaration): boolean {
//     if (
//         node.initializer &&
//         node.initializer.kind === SyntaxKind.TryExpression &&
//         node.name.kind === SyntaxKind.Identifier
//     ) {
//         return true;
//     }
//     return false;
// }

// function transformTryExpressionDeclaration(
//     node: VariableDeclaration,
//     factory: NodeFactory
// ): Node {
//     const resultVarName = factory.createUniqueName("_result");
//     const resultConstName = node.name as Identifier;
//     const expr = node.initializer as Expression;

//     // Create `let _result;`
//     const tempResultDecl = factory.createVariableStatement(
//         /*modifiers*/ undefined,
//         factory.createVariableDeclarationList([
//             factory.createVariableDeclaration(
//                 resultVarName,
//                 /*exclamationToken*/ undefined,
//                 /*type*/ undefined,
//                 /*initializer*/ undefined
//             ),
//         ])
//     );

//     // Create `try { _result = TryResult.ok(expr); }`
//     const tryBlock = factory.createBlock([
//         factory.createExpressionStatement(
//             factory.createBinaryExpression(
//                 resultVarName,
//                 SyntaxKind.EqualsToken,
//                 factory.createCallExpression(
//                     factory.createPropertyAccessExpression(
//                         factory.createIdentifier("TryResult"),
//                         "ok"
//                     ),
//                     /*typeArguments*/ undefined,
//                     [expr]
//                 )
//             )
//         ),
//     ],
//     /*multiLine*/ true);

//     // Create `catch (error) { _result = TryResult.error(error); }`
//     const catchBlock = factory.createCatchClause(
//         "error",
//         factory.createBlock([
//             factory.createExpressionStatement(
//                 factory.createBinaryExpression(
//                     resultVarName,
//                     SyntaxKind.EqualsToken,
//                     factory.createCallExpression(
//                         factory.createPropertyAccessExpression(
//                             factory.createIdentifier("TryResult"),
//                             "error"
//                         ),
//                         /*typeArguments*/ undefined,
//                         [factory.createIdentifier("error")]
//                     )
//                 )
//             )
//         ],
//         /*multiLine*/ false),
//     );

//     const tryStatement = factory.createTryStatement(
//         tryBlock,
//         catchBlock,
//         /*finallyBlock*/ undefined
//     );

//     // Create `const result = _result;`
//     const resultConstDecl = factory.createVariableStatement(
//         /*modifiers*/ undefined,
//         factory.createVariableDeclarationList([
//             factory.createVariableDeclaration(
//                 resultConstName,
//                 /*exclamationToken*/ undefined,
//                 /*type*/ undefined,
//                 resultVarName
//             ),
//         ])
//     );

//     return [tempResultDecl, tryStatement, resultConstDecl];
// }
