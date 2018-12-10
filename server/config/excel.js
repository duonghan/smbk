const workbookConfig = {
  jszip: {
    compression: 'DEFLATE',
  },
  defaultFont: {
    size: 13,
    name: 'Times New Roman',
    // color: 'FFFFFFFF',
  },
  dateFormat: 'hh:mm:ss dd/mm/yyyy ',
  workbookView: {
    activeTab: 0, // Specifies an unsignedInt that contains the index to the active sheet in this book view.
    autoFilterDateGrouping: true, // Specifies a boolean value that indicates whether to group dates when presenting the user with filtering options in the user interface.
    firstSheet: 1, // Specifies the index to the first sheet in this book view.
    minimized: false, // Specifies a boolean value that indicates whether the workbook window is minimized.
    showHorizontalScroll: true, // Specifies a boolean value that indicates whether to display the horizontal scroll bar in the user interface.
    showSheetTabs: true, // Specifies a boolean value that indicates whether to display the sheet tabs in the user interface.
    showVerticalScroll: true, // Specifies a boolean value that indicates whether to display the vertical scroll bar.
    tabRatio: 600, // Specifies ratio between the workbook tabs bar and the horizontal scroll bar.
    visibility: 'visible', // Specifies visible state of the workbook window. ('hidden', 'veryHidden', 'visible') (§18.18.89)
    windowHeight: 17620, // Specifies the height of the workbook window. The unit of measurement for this value is twips.
    windowWidth: 28800, // Specifies the width of the workbook window. The unit of measurement for this value is twips..
    xWindow: 0, // Specifies the X coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
    yWindow: 440, // Specifies the Y coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
  },
  logLevel: 0, // 0 - 5. 0 suppresses all logs, 1 shows errors only, 5 is for debugging
  author: 'SMBK', // Name for use in features such as comments
};

module.exports = { workbookConfig };
