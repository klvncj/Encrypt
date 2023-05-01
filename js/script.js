var copy = Toastify({
  text: "Key copied",
  duration: 5000,
  progressBar: true,
  backgroundColor: "green",
})

 function copy(){
    var enkey = document.getElementById('key').value
   return navigator.clipboard.writeText(enkey);
    copy.showToast()
 }

 
var success = Toastify({
  text: "File Encrypted",
  duration: 5000,
  progressBar: true,
  backgroundColor: "green",
 })

function encryptFile() {
    
    // Get the selected file
    const fileInput = document.getElementById("encryptFileInput");
    const file = fileInput.files[0];
    // Read the contents of the file
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      // Encrypt the file using AES encryption
      const key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
      const iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");
      const encrypted = CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(reader.result), key, { iv: iv });
      // Create a new Blob with the encrypted contents
      const encryptedBlob = new Blob([encrypted], { type: file.type });
      // Create a download link for the encrypted file and trigger the download
      const downloadLink = document.getElementById("encryptedLink");
      downloadLink.href = URL.createObjectURL(encryptedBlob);
      downloadLink.download = file.name + ".encrypted";
      downloadLink.style.display = "block";
      document.getElementById('key').innerHTML = key;
      success.showToast()
    };
  }

  document.getElementById('encrypt').addEventListener('submit',(e)=>{
    e.preventDefault();
    encryptFile();
  })

