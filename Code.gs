/**
 * Tanza Tenant Experience Survey — JSON API backend.
 * Index.html is hosted separately (e.g. GitHub Pages) so that microphone
 * access works on mobile browsers — Apps Script's own iframe wrapper blocks
 * getUserMedia() on phones. This script only handles submissions: writes
 * structured rows to a Google Sheet and saves uploaded files / voice
 * recordings to a Drive folder.
 *
 * Setup (one-time):
 * 1. Deploy > New deployment > Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 2. Copy the /exec URL and paste it into APPS_SCRIPT_URL at the top of
 *    Index.html's <script> block.
 * 3. Host Index.html on GitHub Pages (or any static host) and share that
 *    URL with tenants — not the /exec URL.
 */

var SHEET_NAME = 'Responses';

/**
 * doPost receives the submission as JSON in the request body (from
 * fetch() on the externally-hosted page) and returns JSON back.
 * Apps Script Web Apps serve CORS-permissive responses automatically for
 * simple POST requests — do not add custom headers here.
 */
function doPost(e) {
  var result;
  try {
    var data = JSON.parse(e.postData.contents);
    result = submitSurvey(data);
  } catch (err) {
    result = { ok: false, error: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSpreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (e) {
      // fall through and recreate if it was deleted
    }
  }
  var ss = SpreadsheetApp.create('Tanza Survey Responses');
  props.setProperty('SHEET_ID', ss.getId());
  return ss;
}

function getOrCreateFolder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('FOLDER_ID');
  if (id) {
    try {
      return DriveApp.getFolderById(id);
    } catch (e) {
      // fall through and recreate if it was deleted
    }
  }
  var folder = DriveApp.createFolder('Tanza Survey Uploads');
  props.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

/**
 * Saves a base64-encoded file (image, PDF, or voice recording) to Drive
 * inside a per-submission subfolder, and returns its shareable URL.
 */
function saveUpload_(parentFolder, fieldKey, fileObj) {
  if (!fileObj || !fileObj.base64) return '';
  var bytes = Utilities.base64Decode(fileObj.base64);
  var blob = Utilities.newBlob(bytes, fileObj.mimeType, fileObj.name || fieldKey);
  var file = parentFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

/**
 * Flattens a repeater field's array of { subKey: value } items into a
 * readable multi-line block for a single Sheet cell.
 */
function formatRepeater_(items) {
  if (!Array.isArray(items) || items.length === 0) return '';
  return items.map(function (item, idx) {
    var lines = Object.keys(item).map(function (k) {
      return k + ': ' + (item[k] || '');
    });
    return '#' + (idx + 1) + ' — ' + lines.join(' | ');
  }).join('\n');
}

/**
 * Writes one survey submission to the Sheet. Called from doPost().
 * `data` is a flat object of { fieldKey: value } for text/choice fields,
 * plus { fieldKey: {name, mimeType, base64} } for file/voice fields.
 */
function submitSurvey(data) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var ss = getOrCreateSpreadsheet_();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var rootFolder = getOrCreateFolder_();

    var venueName = (data['s1_name'] || 'Unknown Venue').toString().substring(0, 60);
    var timestamp = new Date();
    var subFolder = rootFolder.createFolder(
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm') + ' — ' + venueName
    );

    var fieldOrder = FIELD_ORDER; // defined in Fields.gs / below
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp'].concat(fieldOrder.map(function (f) { return f.label; })));
      sheet.setFrozenRows(1);
    }

    var row = [timestamp];
    fieldOrder.forEach(function (f) {
      var val = data[f.key];
      var isUpload = val && typeof val === 'object' && !Array.isArray(val) && typeof val.base64 === 'string';
      var isUploadList = Array.isArray(val) && val.length > 0 && val[0] && typeof val[0] === 'object' && typeof val[0].base64 === 'string';
      if (isUpload) {
        row.push(saveUpload_(subFolder, f.key, val));
      } else if (isUploadList) {
        row.push(val.map(function (fileObj) { return saveUpload_(subFolder, f.key, fileObj); }).join('\n'));
      } else if (f.type === 'repeater') {
        row.push(formatRepeater_(val));
      } else if (Array.isArray(val)) {
        row.push(val.join(', '));
      } else {
        row.push(val || '');
      }
    });

    sheet.appendRow(row);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    lock.releaseLock();
  }
}
