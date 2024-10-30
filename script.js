function copyEmail() {
    const email = "hi@tavares.co";
    
    // Create a temporary input to hold the email text
    const tempInput = document.createElement("input");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    
    // Select the text and execute the copy command
    tempInput.select();
    document.execCommand("copy");
    
    // Remove the temporary input
    document.body.removeChild(tempInput);
    
    // Optional: Display a confirmation message
    alert("Email address copied to clipboard!");
}