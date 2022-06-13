const PDFSTYLE = {
  pageSetup: {
    // a string or { width: number, height: number }
    pageSize: 'A1',
    // by default we use portrait, you can change it to landscape if you wish
    pageOrientationPortrait: 'portrait',
    pageOrientationLandscape: 'landscape',
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [ 20, 50, 20, 40 ],
    abstractPageMargins: [ 25, 10, 25, 15 ],
    abstractTwoPageMargins: [ 50, 15, 15, 20 ],
    monthlyReportPageMargins: [ 40, 30, 30, 40 ]

  },
  fonts: {
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
  },
  styles: {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 13,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    note: {
      fontSize: 12,
      margin: [0, 10, 0, 5]
    },
    tableHeader: {
      bold: true,
      fontSize: 11,
      color: 'black'
    },
    abstractTableHeader: {
      bold: true,
      fontSize: 10,
      color: 'black'
    },
    tableContent: {
      margin: [0, 5, 0, 10],
      fontSize: 10,
      color:"black"
    },
    tableExample: {
      margin: [0, 5, 0, 15],
      fontSize:11
    },
    pageHeader: {
      margin:[30, 20, 30, 20],
      fontSize: 8
    },
    pageFooter: {
      margin:[30, 0, 30, 10],
      fontSize: 8
    },
    regTable:{
      alignment:"center"
    },
    regTable2:{
      margin:[0, 20, 0, 0],
      alignment:"center"
    },
    Data: {
      alignment:"center"
    },
    cont:{
      margin:[50,100,50,10],
      fontSize: 12
    },
    tableInfo:{
      margin:[0,10,0,10],
      fontSize:10
    },
    infoTableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black',
      margin:[5,7,5,5]
    },
    tableInfo2: {
      margin:[0,10,0,10],
      fontSize:10
    },
    innerTable: {
      fillColor:"#ffffff",
      margin:[50,50,50,0]
    },
    paragraphs:{
      lineHeight:1.3,
      fontSize:6.5
    },
    /* modified by Vihang
        modified on 12/02/2022
        modification: pdfs new style
      */
    undertakingTable: {
      margin: [0, 0, 0, 10]
    },
    undertakingHeader: {
      fontSize: 18,
      bold:true,
      alignment:"center"
    },
    tableHeaderTag: {
      bold:true,
      fontSize:9,
      fillColor:"#696969",
      color:"#fff"
    }
  }
};

export default PDFSTYLE;
