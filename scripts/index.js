const userName=document.getElementById('user-name')
const userPassword=document.getElementById('user-password')
const SignButton=document.getElementById('sing-in-btn')



SignButton.addEventListener('click', function(){
    const userNameValue=userName.value
    // User name 
    if(userNameValue!=='admin'){
        alert('User name not found ')
        return;
    }

    const userPasswordValue =userPassword.value

    // user Pass
    if(userPasswordValue!=='admin123'){
        alert('Wrong Password, Try Again')
        return;

    }else{
        alert('Welcome to GitHub Issues Tracker')
        window.location.href='issues.html'
        

    }
    
    
     

})

