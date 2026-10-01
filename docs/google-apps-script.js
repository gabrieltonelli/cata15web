/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT PARA PERSISTENCIA AUTOMÁTICA DE RSVP
 * ==============================================================================
 * Hoja de cálculo: 
 * https://docs.google.com/spreadsheets/d/1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo/edit
 *
 * INSTRUCCIONES DE INSTALACIÓN (2 MINUTOS):
 * 1. Abrí tu planilla de Google Sheets.
 * 2. En el menú superior, hacé clic en: "Extensiones" -> "Apps Script".
 * 3. Borrá todo el contenido de Code.gs y pegá este código completo.
 * 4. Hacé clic en el botón "Guardar" (ícono de disquete).
 * 5. Hacé clic en el botón azul superior "Implementar" -> "Nueva implementación".
 * 6. En el engranaje "Seleccionar tipo", elegí "Aplicación web".
 * 7. Completá los campos:
 *    - Descripción: "Webhook RSVP Mis XV"
 *    - Ejecutar como: "Yo" (tu cuenta de Google)
 *    - Quién tiene acceso: "Cualquier persona" (Anyone)
 * 8. Hacé clic en "Implementar" y autorizá los permisos que te solicite Google.
 * 9. Copiá la "URL de la aplicación web" generada (termina en /exec)
 * 10. Pegá esa URL en la variable GOOGLE_APPS_SCRIPT_URL de tu archivo server/.env
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Esperar hasta 30 segundos para evitar colisiones concurrentes
  lock.tryLock(30000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "Respuestas";
    var sheet = doc.getSheetByName(sheetName);

    // Si la hoja no existe, la crea con sus encabezados estilizados
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      var headers = [
        "Fecha y Hora",
        "Nombre",
        "Apellido",
        "Asistencia",
        "Requerimiento Alimenticio",
        "Canción Sugerida",
        "Comentarios / Observaciones"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#0A0A0A")
        .setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Parsear los datos recibidos en la petición POST
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var fecha = data.fechaEnvio || new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
    var nombre = data.nombre || "";
    var apellido = data.apellido || "";
    var asistencia = data.asistencia || "";
    var alimenticio = data.requerimientoAlimenticio || "";
    var musica = data.cancionSugerida || "";
    var comentarios = data.comentarios || "";

    sheet.appendRow([
      fecha,
      nombre,
      apellido,
      asistencia,
      alimenticio,
      musica,
      comentarios
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Registro guardado correctamente en Google Sheets",
        data: { nombre: nombre, apellido: apellido, asistencia: asistencia }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        message: err.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      message: "Webhook de Google Sheets para RSVP funcionando correctamente." 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
