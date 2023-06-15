import { FocusEvent, ChangeEvent, FormEvent, useState} from "react";
import { RootState } from "../store";
import '../App.css'
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setPassword} from "../features/Login/loginSlice";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => { 
    const {emailAddress, password: pass} = useSelector((state: RootState) => state.signup);
    const {userName, password} = useSelector((state: RootState) => state.login);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isBlur, setBlur] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [isUserName, setIsUserName] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setBlur(true);
      if(e.target.name === 'username'){
        if(userName === "" || userName !== emailAddress){
          e.target.style.borderBlockColor = 'red';
          setIsUserName(true);
        }
        else{
          e.target.style.borderBlockColor = 'green';
        }
      }

      if(e.target.name === 'password'){
        if(password === "" || password !== pass){
          e.target.style.borderBlockColor = 'red';
          setIsPassword(true);
        }
        else{
          e.target.style.borderBlockColor = 'green';
        }
      }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userName !== "" && password !== ""){
          
           if(password.length >= 8){
            if(userName !== emailAddress || password !== pass){
              dispatch(setUserName(""));
              dispatch(setPassword(""));
            }
            else{
              navigate('/shop');
            }
        }
      }
      else{
        setIsError(true);
      }
    }
      return(
        <>
        
        <div className='container login-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username(Email Address): </label>
          <input type="text" id='username' name='username' onFocus={()=>setBlur(false)} onBlur={handleBlur} onChange={(e : ChangeEvent<HTMLInputElement>) =>{
            dispatch(setUserName(e.target.value));
          } } />
          {!userName && isBlur && isUserName && <p className="warning">Please enter username.</p>}
          {userName && userName !== emailAddress && isBlur && isUserName && <p className="warning">Invalid Username</p>}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onFocus={()=>setBlur(false)} onBlur={handleBlur} onChange={(e : ChangeEvent<HTMLInputElement>) =>{
            dispatch(setPassword(e.target.value));
          } } />
          {!password && isBlur && isPassword && <p className="warning">Please enter password.</p>}
          {password && password.length >= 8 && password !== pass && isBlur && isPassword && <p className="warning">Invalid Password</p>}
          {password && password.length < 8 && <p className="warning">Minimum 8 characters required for password</p>} 
    
          <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
        {isError && <p className="warning">Please fill all the entries</p>}
        </div>
        </>
      );
}

export default Login;