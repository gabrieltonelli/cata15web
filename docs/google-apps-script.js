/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT PARA PERSISTENCIA AUTOMÁTICA DE RSVP EN GOOGLE SHEETS
 * ==============================================================================
 * Planilla:
 * https://docs.google.com/spreadsheets/d/1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo/edit
 *
 * ⚠️ PASO CRÍTICO DE CONFIGURACIÓN (1 MINUTO):
 * 1. Abrí la planilla en tu navegador.
 * 2. En el menú superior: "Extensiones" -> "Apps Script".
 * 3. Borrá todo el contenido de Code.gs y pegá este código completo.
 * 4. Hacé clic en "Guardar" (ícono de disquete).
 * 5. Hacé clic en "Implementar" -> "Nueva implementación".
 * 6. En el engranaje "Seleccionar tipo", elegí "Aplicación web".
 * 7. Completá:
 *    - Descripción: "Webhook RSVP Mis XV"
 *    - Ejecutar como: "Yo" (tu cuenta de Google)
 *    - ⚠️ QUIÉN TIENE ACCESO: "Cualquier persona" (Anyone)
 *      (¡OJO! Si dejás "Solo yo", Google rechazará las peticiones con error 404).
 * 8. Hacé clic en "Implementar" y autorizá los permisos.
 * 9. Copiá la "URL de la aplicación web" generada (termina en /exec).
 * 10. Pegá esa URL en server/.env y en las variables de entorno de Netlify:
 *     GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 * ==============================================================================
 */

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Esperar hasta 30 segundos para evitar escrituras concurrentes simultáneas
  lock.tryLock(30000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "Respuestas";
    var sheet = doc.getSheetByName(sheetName);

    // Si la pestaña no existe, se crea con los encabezados estilizados
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

    // Parsear datos recibidos (soporta JSON en contents, o parámetros de formulario/URL)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Si la petición no tiene nombre (por ejemplo un health check GET simple en el navegador)
    if (!data.nombre && !data.apellido) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: "active", 
          message: "Webhook de Google Sheets para RSVP activo y esperando confirmaciones." 
        }))
        .setMimeType(ContentService.MimeType.JSON);
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
        success: true, 
        message: "Registro guardado correctamente en Google Sheets",
        data: { nombre: nombre, apellido: apellido, asistencia: asistencia }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: err.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Soporta peticiones POST estándar
function doPost(e) {
  return handleRequest(e);
}

// Soporta peticiones GET o redirecciones HTTP 302 convertidas a GET
function doGet(e) {
  return handleRequest(e);
}
