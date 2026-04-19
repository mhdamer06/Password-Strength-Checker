document.getElementById("submitButton").onclick = function()
{
    let pass = document.getElementById("passwd").value;
    let strengthDisplay = document.getElementById("strengthLevel");
    let errorDisplay = document.getElementById("errormsg");
    let score = 0;

    errorDisplay.textContent = 'Password strength depends on numbers, symbols, upper & lower case etc...';
    if(pass.includes(" ")){
        errorDisplay.textContent = "Password should NOT include spaces!";
        return;
}


    if(pass.length >= 8) score+=10;
    if(pass.length >= 12) score+=20;
    if(pass.length >= 16) score+=30;

    

    if(/[a-z]/.test(pass)) score+=10;
    if(/[A-Z]/.test(pass)) score+=10;
    if(/[0-9]/.test(pass)) score+=10;
    if(/[^A-Za-z0-9]/.test(pass)) score+=10;



const charCount = {};
for (const ch of pass) charCount[ch] = (charCount[ch] || 0) + 1;
for (const key in charCount) {
    const ratio = charCount[key] / pass.length;
    if(ratio > 0.5)
    {
        score-=Math.round(ratio * 60);
        break;
    }
}


// Consecutive

    let consecutiveCount = 0;
    for(let i = 0; i < pass.length - 1; i++)
    {
        if(pass.charCodeAt(i+1) == pass.charCodeAt(i) + 1)
        {
            consecutiveCount++;
        }
        else
            consecutiveCount = 0;
        if(consecutiveCount >= 2)
        {
            score-=30;
            break;
        }
    }

    score = Math.max(0, Math.min(100, score));
    

    let strengthcolor = (score * 120) / 100;

    strengthDisplay.textContent = score + '%';
    strengthDisplay.style.color = `hsl(${strengthcolor}, 100%, 50%)`
    
}