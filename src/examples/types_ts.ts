
export const types_ts: string = "import { filesActions } from './files'\nimport { ExamplesActions } from './examples'\nimport { OutputActions } from './output'\nimport { SelectedFileActions } from './selectedFile'\nimport { Theme } from '../theme/theme'\nimport { LayoutActions } from './layout'\n\nexport interface State {\n  files: File[]\n  examples: Example[]\n  selectedFile: File\n  output: Output\n  layout: Layout\n}\n\nexport interface Layout {\n  theme: Theme\n  themes: Theme[]\n}\n\nexport interface File {\n  filePath: string\n  content: string\n  selected?: boolean\n  selection?: Selection\n}\nexport interface Selection {\n  endColumn: number\n  endLineNumber: number\n  startColumn: number\n  startLineNumber: number\n}\n\nexport interface Output {\n  text?: string\n}\nexport interface Example extends File {\n  name: string\n  description: string\n}\n\nexport type AllActions = filesActions | ExamplesActions | OutputActions | SelectedFileActions | LayoutActions\n";
