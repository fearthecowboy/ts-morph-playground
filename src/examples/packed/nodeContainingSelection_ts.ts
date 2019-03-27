
export const nodeContainingSelection_ts: string = "import * as tsMorph from 'ts-morph'\n\nexport default class implements PackedExample {\n  execute(files: File[]) {\n    const project = new tsMorph.Project()\n    const text = files\n      .filter(f => f.selection)\n      .map(f => ({\n        file: project.createSourceFile(f.filePath, f.content),\n        selection: f.selection\n      }))\n      .map(f => ({\n        ...f,\n        selectedNode: findDescendantIncludingPosition(f.file, f.selection!)\n      }))\n      .filter(f => f.selectedNode)\n      .map(f =>\n        `\nIn file ${f.file.getFilePath()}, the ${f.selectedNode!.getKindName()} with text \"${f\n          .selectedNode!.getText()\n          .replace(/[\\n\\s]+/gm, ' ')}\" is the smaller node containing the selection ${JSON.stringify(\n          f.selection\n        ).replace(/\"/g, '')}\"\n    `.trim()\n      )\n      .join('\\n\\n')\n    return { text }\n\n    function findDescendantIncludingPosition(n: tsMorph.Node, p: Selection): tsMorph.Node | undefined {\n      const d = findDescendant(n, d => nodeIncludesPosition(d, p))\n      if (d) {\n        let c: tsMorph.Node | undefined\n        getChildrenForEachChild(d).some(child => {\n          const found = findDescendantIncludingPosition(child, p)\n          if (found) {\n            c = found\n            return true\n          } else {\n            return false\n          }\n        })\n        return c || d\n      }\n    }\n\n    function nodeIncludesPosition(n: tsMorph.Node, p: Selection) {\n      const r = getStartEndLineNumbersAndColumns(n)\n      return (\n        r.startColumn <= p.startColumn &&\n        r.endColumn >= p.endColumn &&\n        r.startLineNumber <= p.startLineNumber &&\n        r.endLineNumber >= p.endLineNumber\n      )\n    }\n    function findDescendant(\n      n: tsMorph.Node,\n      fn: (node: tsMorph.Node) => boolean,\n      dontIncludeSelf = true\n    ): tsMorph.Node | undefined {\n      return !dontIncludeSelf && fn(n) ? n : getChildrenForEachChild(n).find(c => !!findDescendant(c, fn, false))\n    }\n    function getChildrenForEachChild(n: tsMorph.Node): tsMorph.Node[] {\n      const result: tsMorph.Node[] = []\n      n.forEachChild(n => result.push(n))\n      return result\n    }\n    function getStartEndLineNumbersAndColumns(d: tsMorph.Node) {\n      return {\n        startColumn:\n          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()!).character + 1,\n        startLineNumber:\n          tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getStart()!).line + 1,\n        endColumn: tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getEnd()!).character + 1,\n        endLineNumber: tsMorph.ts.getLineAndCharacterOfPosition(d.getSourceFile()!.compilerNode, d.getEnd()!).line + 1\n      }\n    }\n  }\n\n  filePath = '/src/examples/nodeContainingSelection.ts'\n  name = 'Node containing selection'\n  description =\n    'Select some text in sample files and it will return the smallest node that contains the selection, on each file'\n  content = nodeContainingSelection_ts\n}\n\ninterface File {\n  filePath: string\n  content: string\n  selected?: boolean\n  selection?: Selection\n}\n\ninterface Selection {\n  endColumn: number\n  endLineNumber: number\n  startColumn: number\n  startLineNumber: number\n}\n\nimport { PackedExample } from '../packedExamples'\nimport { nodeContainingSelection_ts } from '../packed/nodeContainingSelection_ts'\n";
