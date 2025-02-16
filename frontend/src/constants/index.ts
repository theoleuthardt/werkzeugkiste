export const toolLinks = [
  {
    title: "doc-converter",
    link: "/doc-converter",
  },
  {
    title: "img-converter",
    link: "/img-converter",
  },
  {
    title: "rgb-to-hex",
    link: "/rgb-to-hex",
  },
  {
    title: "data-visualizer",
    link: "/data-visualizer",
  },
  {
    title: "qr-code-generator",
    link: "/qr-code-generator",
  },
  {
    title: "password-generator",
    link: "/password-generator",
  },
  {
    title: "bg-remover",
    link: "/bg-remover",
  },
  {
    title: "word-counter",
    link: "/word-counter",
  },
  {
    title: "pomodoro-timer",
    link: "/pomodoro-timer",
  },
];

export const outputFileFormats = [
  {
    input: ".doc",
    output: [".pdf", ".docx", ".odt", ".txt", ".rtf", ".html", ".epub"],
  },
  {
    input: ".docx",
    output: [".pdf", ".odt", ".txt", ".rtf", ".html", ".epub"],
  },
  {
    input: ".odt",
    output: [".pdf", ".doc", ".docx", ".txt", ".rtf", ".html", ".epub"],
  },
  {
    input: ".rtf",
    output: [".pdf", ".doc", ".docx", ".odt", ".txt", ".html"],
  },
  {
    input: ".txt",
    output: [".pdf", ".doc", ".docx", ".odt", ".txt", ".html"],
  },
  {
    input: ".html",
    output: [".pdf", ".doc", ".docx", ".odt", ".rtf", ".txt"],
  },
  {
    input: ".epub",
    output: [".pdf", ".doc", ".docx", ".odt", ".rtf", ".txt"],
  },
  {
    input: ".xls",
    output: [".pdf", ".xlsx", ".ods", ".csv"],
  },
  {
    input: ".xlsx",
    output: [".pdf", ".xls", ".ods", ".csv"],
  },
  {
    input: ".ods",
    output: [".pdf", ".xls", ".xlsx", ".csv"],
  },
  {
    input: ".csv",
    output: [".pdf", ".xls", ".xlsx", ".ods"],
  },
  {
    input: ".ppt",
    output: [".pdf", ".pptx", ".odp"],
  },
  {
    input: ".pptx",
    output: [".pdf", ".ppt", ".odp"],
  },
  {
    input: ".odp",
    output: [".pdf", ".ppt", ".pptx"],
  },
];

export const FileFormatsTable = [
  {
    input: ".doc (MS Word)",
    output: [".pdf", ".docx", ".odt", ".txt", ".rtf", ".html", ".epub"],
  },
  {
    input: ".docx (MS Word)",
    output: [".pdf", ".odt", ".txt", ".rtf", ".html", ".epub"],
  },
  {
    input: ".odt (OpenDocument Text)",
    output: [".pdf", ".doc", ".docx", ".txt", ".rtf", ".html", ".epub"],
  },
  {
    input: ".rtf (Rich Text Format)",
    output: [".pdf", ".doc", ".docx", ".odt", ".txt", ".html"],
  },
  {
    input: ".txt (Text)",
    output: [".pdf", ".doc", ".docx", ".odt", ".txt", ".html"],
  },
  {
    input: ".html (Webseite)",
    output: [".pdf", ".doc", ".docx", ".odt", ".rtf", ".txt"],
  },
  {
    input: ".epub (E-Book)",
    output: [".pdf", ".doc", ".docx", ".odt", ".rtf", ".txt"],
  },
  {
    input: ".xls (MS Excel)",
    output: [".pdf", ".xlsx", ".ods", ".csv"],
  },
  {
    input: ".xlsx (MS Excel)",
    output: [".pdf", ".xls", ".ods", ".csv"],
  },
  {
    input: ".ods (OpenDocument Spreadsheet)",
    output: [".pdf", ".xls", ".xlsx", ".csv"],
  },
  {
    input: ".csv (Comma-Separated Values)",
    output: [".pdf", ".xls", ".xlsx", ".ods"],
  },
  {
    input: ".ppt (MS PowerPoint)",
    output: [".pdf", ".pptx", ".odp"],
  },
  {
    input: ".pptx (MS PowerPoint)",
    output: [".pdf", ".ppt", ".odp"],
  },
  {
    input: ".odp (OpenDocument Presentation)",
    output: [".pdf", ".ppt", ".pptx"],
  },
];
