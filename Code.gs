// Code.gs - Google Apps Script file

// Spreadsheet untuk menyimpan data pengguna
const SPREADSHEET_ID = '<id-spreadsheet>'; // Isi dengan ID spreadsheet Anda
let userSheet;

// Kunci enkripsi sederhana (catatan: ini bukan metode keamanan yang kuat)
const ENCRYPTION_KEY = 'YourSecretKey123';

// Inisialisasi spreadsheet dan sheet untuk menyimpan data pengguna
function init() {
  try {
    // Jika ID spreadsheet belum diisi, buat spreadsheet baru
    if (!SPREADSHEET_ID) {
      const ss = SpreadsheetApp.create('Login System Data');
      userSheet = ss.getActiveSheet();
      userSheet.setName('Users');
      
      // Buat header tabel
      userSheet.appendRow(['Username', 'Password', 'CreatedAt', 'LastLogin']);
      
      // Log ID Spreadsheet untuk dimasukkan ke variabel SPREADSHEET_ID
      console.log('Spreadsheet created with ID: ' + ss.getId());
      return userSheet;
    } else {
      // Buka spreadsheet yang sudah ada
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      userSheet = ss.getSheetByName('Users');
      
      // Jika sheet tidak ditemukan, buat sheet baru
      if (!userSheet) {
        userSheet = ss.insertSheet('Users');
        userSheet.appendRow(['Username', 'Password', 'CreatedAt', 'LastLogin']);
      }
      
      return userSheet;
    }
  } catch (error) {
    console.error('Error initializing: ' + error.toString());
    throw new Error('Failed to initialize user database');
  }
}

// Enkripsi sederhana untuk password (catatan: ini bukan metode keamanan yang kuat)
function encryptPassword(password) {
  const encrypted = Utilities.computeHmacSha256Signature(password, ENCRYPTION_KEY);
  return Utilities.base64Encode(encrypted);
}

// Mendaftarkan pengguna baru
function registerUser(username, password) {
  try {
    if (!username || !password) {
      return { success: false, message: 'Username and password are required' };
    }
    
    const sheet = init();
    
    // Cek apakah username sudah ada
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === username) {
        return { success: false, message: 'Username already exists' };
      }
    }
    
    // Enkripsi password
    const encryptedPassword = encryptPassword(password);
    
    // Tambahkan pengguna baru
    sheet.appendRow([
      username,
      encryptedPassword,
      new Date(),
      ''
    ]);
    
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Error registering user: ' + error.toString());
    return { success: false, message: 'Registration failed: ' + error.toString() };
  }
}

// Verifikasi login
function verifyLogin(username, password) {
  try {
    if (!username || !password) {
      return { success: false, message: 'Username and password are required' };
    }
    
    const sheet = init();
    
    // Cari username
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === username) {
        // Enkripsi password input untuk dibandingkan
        const encryptedPassword = encryptPassword(password);
        
        // Cek password
        if (data[i][1] === encryptedPassword) {
          // Update waktu login terakhir
          sheet.getRange(i + 1, 4).setValue(new Date());
          
          // Simpan session
          PropertiesService.getUserProperties().setProperties({
            'isLoggedIn': 'true',
            'username': username,
            'loginTime': new Date().toString()
          });
          
          return { success: true, message: 'Login successful' };
        } else {
          return { success: false, message: 'Invalid password' };
        }
      }
    }
    
    return { success: false, message: 'Username not found' };
  } catch (error) {
    console.error('Error verifying login: ' + error.toString());
    return { success: false, message: 'Login failed: ' + error.toString() };
  }
}

// Cek status login
function checkLoginStatus() {
  const userProps = PropertiesService.getUserProperties();
  const isLoggedIn = userProps.getProperty('isLoggedIn') === 'true';
  const username = userProps.getProperty('username') || '';
  
  return {
    isLoggedIn: isLoggedIn,
    username: username
  };
}

// Logout
function logout() {
  const userProps = PropertiesService.getUserProperties();
  userProps.deleteAllProperties();
  return { success: true };
}

// Fungsi untuk membuat dan menampilkan web app
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistem Login Sederhana')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
