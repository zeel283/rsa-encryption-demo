let encryptedMessage = "";

function encryptMessage() {

    let message = document.getElementById("message").value;

    encryptedMessage = btoa(message);

    document.getElementById("output").innerText =
        "Encrypted: " + encryptedMessage;
}

function decryptMessage() {

    let decrypted = atob(encryptedMessage);

    document.getElementById("output2").innerText =
        "Decrypted: " + decrypted;
}

