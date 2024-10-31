function copyEmail() {
    const email = "hi@tavares.co";
    
    // Use the modern clipboard API instead of execCommand
    navigator.clipboard.writeText(email).then(() => {
        // Show toast notification
        showToast("Copied");
    }).catch(err => {
        // Fallback for clipboard API failure
        const tempInput = document.createElement("input");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Copied");
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast-notification show";
    
    // Hide toast after animation
    setTimeout(() => {
        toast.className = "toast-notification";
    }, 2500); // Matches animation duration
}

function openRevolutLink() {
    window.open('https://apps.apple.com/us/app/revolut-18/id1499857038', '_blank');
}

function openSpotifyLink() {
    window.open('https://www.spotify.com/us/account/overview/', '_blank');
}