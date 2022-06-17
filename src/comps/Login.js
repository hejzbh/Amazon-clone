import loginStyle from '../style/login.css'
import { useState, useEffect, UseContext, useContext } from 'react';
import { fixFullName, fixEmail, isCorrectEmail, clearInputFields } from '../HelperFunctions';
import { postNewUser, getUsers, checkMultipleAccounts } from '../workWithData';

import { userInfo } from '../UserInfo';
import { setLocalStorageFunc } from '../localStorage';

const Login = () => {
    const {setLogInUser} = useContext(userInfo);
    const [loading,setLoading] = useState(false);
    const [loginInfoForm, setLoginInfoForm] = useState({
        email:'',
        password:''
    });
    const [registerInfoForm, setRegisterInfoForm] = useState({
        name:'',
        email:'',
        password:'',
        rePassword:''
    });
    

    // For registration fields
    const correctEmail = isCorrectEmail(registerInfoForm.email);
    const validFullName = (registerInfoForm.name.split(' ').length>1 || false) && registerInfoForm.name.length>=10;
    const passwordsLength = registerInfoForm.password.length>=8;
    const passwordsMatching = registerInfoForm.password===registerInfoForm.rePassword;

    useEffect(()=>{
      const buttonsChangeForm = document.querySelectorAll('.changeForm');
      const forms = document.querySelectorAll('.signForm');
      console.log(forms, buttonsChangeForm);

      buttonsChangeForm.forEach(btn=>btn.addEventListener('click', (e)=>{
        e.stopImmediatePropagation();
        forms.forEach(form=>form.classList.toggle('hidden'));
      }));


    

    }, []);






    const handleInputChange = (typeOfForm, e) => {

        const {value, name:property} = e.target;
      


        typeOfForm==='register' ? setRegisterInfoForm(oldInfo=>{
            return {...oldInfo, [property]:property==='name' ? fixFullName(value) : property==='email' ? fixEmail(value) : value} // : value => password.
        }) : setLoginInfoForm(oldInfo=>{
            return {...oldInfo, [property]:property==='email' ? fixEmail(value) : value} // : value => password
        })


    }

    const findCurrentUser = async (infoObject) => {
        const allUsers = await getUsers();
        const account = allUsers.find(user=>user.email===infoObject.email && user.password===infoObject.password);

        account ? setLogInUser(account) : alert('ne mozemo naci takav acc');
    }

    const login = async (e) => {
        e.preventDefault();
        try {

        const loginForm = document.querySelector('.loginForm');
        const inputsHasValue = [...loginForm.querySelectorAll('input')].every(input=>input.value!=='');


        if(!inputsHasValue){
            alert('prazna polja');
            return;
        } 


        findCurrentUser(loginInfoForm);


        } catch(err){
            alert(err);
        }
    }

  


    const register = async (e) => {
        try {
            e.preventDefault();
            const registerForm = document.querySelector('.registerForm');
            const fullInputFields = Object.values(registerInfoForm).every(value=>value!=='');
            const notErrorMessages = Array.from(registerForm.querySelectorAll('input')).every(input=>input.nextElementSibling.innerHTML===''); // nextelement=><p classname="error__message">

          
            
            if(fullInputFields && notErrorMessages) {
                setLoading(true);

                const userExistInDatabase = await checkMultipleAccounts(registerInfoForm);
              
              

                userExistInDatabase ? alert('Ta email adresa se vec koristi') : await postNewUser(registerInfoForm);


                setLoading(false);
                
            }  else {
               alert(fullInputFields ? 'Neispravni podaci' : 'Prazna polja');
               
               return;
            }
         
              
        }catch(err){
            alert(err);
            setLoading(false);
        }
    }

    


    const borderForInputs = (inputData, fn) => {
        return {border:`1px solid ${inputData.length>=1 ? (fn ? '#bebebe' : 'red'):'#bebebe'}`};
    }


    return (
        <div className="login__page">
            <div className="forms__container">
                {loading && <p>Loading</p>}
                <form className='signForm loginForm' onSubmit={login}>
                    <h3>Login</h3>
                    <div className='form__inputs__container'>

                        <label htmlFor='email'>Email</label>
                        <input
                         name="email"
                         type='email'
                         value={loginInfoForm.email}
                         onChange={handleInputChange.bind(this,'login')}></input>
                        

                        <label htmlFor='password'>Password</label>
                        <input
                         name="password"
                         type='password'
                         value={loginInfoForm.password}
                         onChange={handleInputChange.bind(this, 'login')}></input>
                    </div>
                    <button className='submitForm btn'  type='submit'>Login</button>

                    <p>New to Amazon? <button className='btn changeForm' type='button'>Create your account</button></p>
                </form>


                <form onSubmit={register} className='signForm registerForm hidden'>
                    <h3>Register</h3>
                    <div className='form__inputs__container'>

                        <label htmlFor='name'>Your full name</label>
                        <input
                        style={borderForInputs(registerInfoForm.name,validFullName )}
                         name="name"
                         type='text'
                         value={registerInfoForm.name}
                         onChange={handleInputChange.bind(this, 'register')}
                         ></input>

                         <p className='error__message'>{registerInfoForm.name.length>1 && (validFullName ? '' : 'Prekratko ime')}</p>

                        <label htmlFor='email'>Email</label>
                        <input style={borderForInputs(registerInfoForm.email, correctEmail)}
                         name="email"
                         type='email'
                         value={registerInfoForm.email}
                         onChange={handleInputChange.bind(this, 'register')}></input>

                         <p className='error__message'>{registerInfoForm.email.length>1 && (correctEmail ? '' : 'Pogresan email')}</p>


                        <label htmlFor='password'>Password</label>
                        <input style={borderForInputs(registerInfoForm.password, passwordsLength)}
                         name='password'
                         type='password'
                         value={registerInfoForm.password}
                         onChange={handleInputChange.bind(this, 'register')}></input>

                         <p className='error__message'>{registerInfoForm.password.length>1 && (passwordsLength ? '' : 'Prekratka sifra')}</p>

                        <label htmlFor='rePassword'>Re-enter Password</label>
                        <input
                         name='rePassword'
                         type='password'
                         value={registerInfoForm.rePassword}
                         onChange={handleInputChange.bind(this, 'register')}></input>

                         <p>{registerInfoForm.password.length>1 && (passwordsMatching ? '' : 'Not same paswords')}</p>
                    </div>
                    <button className='submitForm btn' type='submit'>Create your Amazon account</button>


                    <p>Already have an account? <button className='btn changeForm' type='button'>Sign-In</button></p>
                </form>
            </div>
        </div>
    )
}


export default Login;