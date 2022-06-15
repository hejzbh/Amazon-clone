export const correctText = (textInput) => {
    return textInput[0].toUpperCase() + textInput.slice(1).toLowerCase();
}

export const fixFullName = (fullName)=>{
    return fullName.split(' ').map(word=>(word[0] && word[0].toUpperCase())+(word[0] && word.slice(1).toLowerCase())||'').join(' ');
}


export const fixEmail = (email) => {
    return email.toLowerCase().trim().replaceAll(' ', '');
}



export const isCorrectEmail = (email)=>{
    const criteries = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return criteries.test(email);
}


export const clearInputFields = (form) => {
form.querySelectorAll('input').forEach(input=>{
    input.value='';
    console.log(input);
});
}
