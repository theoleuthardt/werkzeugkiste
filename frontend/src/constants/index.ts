export const toolLinks = [
  {
    title: "doc-converter",
    link: "/doc-converter",
  },
  {
    title: "tmz-converter",
    link: "/tmz-converter",
  },
  {
    title: "rgb-to-hex",
    link: "/rgb-to-hex",
  },
  {
    title: "regex-tester",
    link: "/regex-tester",
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
    title: "video-to-audio",
    link: "/video-to-audio",
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

export const videoAudioFormats = [
  {
    input: ".mp4",
    output: [".mp3", ".wav", ".aac"],
  },
  {
    input: ".avi",
    output: [".mp3", ".wav", ".aac"],
  },
  {
    input: ".mov",
    output: [".mp3", ".wav", ".aac"],
  },
];

export const videoAudioFormatsTable = [
  {
    input: ".mp4 (MPEG-4)",
    output: [".mp3", ".wav", ".aac"],
  },
  {
    input: ".avi (Audio Video Interleave)",
    output: [".mp3", ".wav", ".aac"],
  },
  {
    input: ".mov (Apple QuickTime Movie)",
    output: [".mp3", ".wav", ".aac"],
  },
];
