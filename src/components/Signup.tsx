import { FocusEvent, FormEvent, useState } from 'react'
import '../App.css'
import {  useDispatch } from 'react-redux'
import { setUser, SignupState } from '../features/Signup/signupSlice'
import { useNavigate } from 'react-router-dom'

const SignUp: React.FC = () => {
    
    const [tempuser, setTempUser] = useState<SignupState>({firstName: "", lastName: "", emailAddress: "", password: ""});
    
    const [isBlur, setBlur] = useState<boolean>(false);

    const [isFname, setIsFname] = useState<boolean>(false);
    const [isLname, setIsLname] = useState<boolean>(false);
    const [isEmail, setIsEmail] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setBlur(false);
    }


    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setBlur(true);
        if(e.target.name === 'firstName'){
            if(tempuser.firstName === ""){
                e.target.style.borderColor = 'red';
                setIsFname(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
            
        }

        if(e.target.name === 'lastName'){
            if(tempuser.lastName === ""){
                e.target.style.borderColor = 'red';
                setIsLname(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
            
        }

        if(e.target.name === 'emailAddress'){
            if(tempuser.emailAddress === "" || !tempuser.emailAddress.includes('@')){
                e.target.style.borderColor = 'red';
                setIsEmail(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
        }

        if(e.target.name === 'password'){
            if(tempuser.password.length < 8){
                e.target.style.borderColor = 'red';
                setIsPassword(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
        }

    }
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setBlur(true);
        if(tempuser.firstName !== "" && tempuser.lastName!== "" && tempuser.emailAddress !== "" && tempuser.password !== "")
        {
            if(tempuser.password.length >= 8){
                dispatch(setUser(tempuser));
                navigate('/');
            }
        }
        else{
            setIsError(true);
        }
        
    }

    const handleChange = (event: any) => {
        setTempUser({...tempuser, [event.target.name] : event.target.value})
    }

    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup-firstName">First Name: </label>
                <input type="text" name='firstName' id='signup-firstName' placeholder='First Name' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                {!tempuser.firstName && isFname && isBlur && <p className='warning'>Please enter first Name</p>}

                <label htmlFor="signup-lastName">Last Name: </label>
                <input type="text" name='lastName' id='signup-lastName' placeholder='Last Name' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                {!tempuser.lastName  && isLname && isBlur && <p className='warning'>Please enter Last Name</p>}

                <label htmlFor="signup-email">Email Address: </label>
                <input type="email" name='emailAddress' id='signup-email' placeholder='Email' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                {!tempuser.emailAddress && isEmail && isBlur && <p className='warning'>Please enter Email</p>}
                {tempuser.emailAddress &&!tempuser.emailAddress.includes('@') && isEmail && isBlur && <p className='warning'>Email must have '@'</p>}

                <label htmlFor="signup-password">Password: </label>
                <input type="password" name='password' id='signup-password' placeholder='Password' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                {!tempuser.password && isPassword && isBlur && <p className='warning'>Please enter password</p>}
                {tempuser.password && tempuser.password.length<8  && isPassword && isBlur && <p className='warning'>Minimum 8 characters required for password.</p>}

                <button type='submit'>Sign Up</button>
            </form>
            {isError && <p className='warning'>Please fill all the entries</p>}
        </div>
    )
}


export default SignUp