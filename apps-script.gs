function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NOTA");
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Sheet NOTA tidak ditemukan"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // Validasi data
    if (!data.tgl || !data.qty || !data.namaBarang || !data.harga) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Data tidak lengkap"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append row ke sheet NOTA
    // Kolom: A=Tgl, B=QTY, C=NAMA BARANG, D=HARGA, E=JUMLAH
    sheet.appendRow([
      data.tgl, 
      data.qty, 
      data.namaBarang, 
      data.harga, 
      data.total
    ]);
    
    Logger.log("Data berhasil ditambahkan: " + JSON.stringify(data));
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data berhasil disimpan"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(err) {
    Logger.log("Error: " + err);
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
