
export const diagnostics_ts: string = "import * as tsMorph from 'ts-morph'\n\nexport default class implements PackedExample {\n  execute(files: File[]) {\n    const project = new tsMorph.Project()\n    files.forEach(f => project.createSourceFile(f.filePath, f.content))\n    const base = project.createSourceFile('base.ts', '')\n    // we create a base dummy source file to calculate the relative paths of other files\n    const text = project\n      .getSourceFiles()\n      .filter(f => f.getBaseName() !== 'base.ts')\n      .map(f => ({\n        text: buildJsxAstDiagnostics(f)\n          .map(d =>\n            `\n * ${d.code} ${d.file ? base.getRelativePathTo(d.file) : 'unknown file'}:${d.lineNumber} \"${d.message}\"\n          `.trim()\n          )\n          .join('\\n'),\n        f\n      }))\n      .flat()\n      .filter(e => e.text.trim())\n      .map(e =>\n        `\n${base.getRelativePathTo(e.f)}:\n${e.text}\n`.trim()\n      )\n      .join(`\\n\\n--------------------------------------------\\n`)\n    return { text }\n\n    function buildJsxAstDiagnostics(f: tsMorph.SourceFile) {\n      return f\n        .getPreEmitDiagnostics()\n        .filter(d => d && d.compilerObject && d.getSourceFile())\n        .map(d => ({\n          message: tsMorph.ts.flattenDiagnosticMessageText(d.compilerObject.messageText, '\\n'),\n          code: d.getCode(),\n          file: d.getSourceFile(),\n          length: d.getLength(),\n          lineNumber: d.getLineNumber(),\n          start: d.getStart()\n        }))\n    }\n  }\n\n  filePath = '/src/examples/diagnostics.ts'\n  name = 'Project Diagnostics'\n  description = \"Extract project's diagnostics information with positions compatible with monaco-editor\"\n  content = diagnostics_ts\n}\n\ninterface File {\n  filePath: string\n  content: string\n  selected?: boolean\n  selection?: {\n    endColumn: number\n    endLineNumber: number\n    startColumn: number\n    startLineNumber: number\n  }\n}\n\nimport { PackedExample } from '../packedExamples'\nimport { diagnostics_ts } from '../packed/diagnostics_ts'\n";
