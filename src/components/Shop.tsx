import { RootState } from "../store";
import CarDetails from './CarDetails';
import { useSelector, useDispatch } from 'react-redux';
import { setCarList } from '../features/Shop/shopSlice';
import { useNavigate } from 'react-router-dom'

const Shop: React.FC = () => {

    const { carList } = useSelector((state: RootState) => state.shop)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRemove = (id:string) =>{
        let newList = carList.filter(car => car.id !== id);
        newList = newList.map((car, index) => {return ({...car, id: (index+1).toString()})});
        dispatch(setCarList(newList));
    }

    const handleClearAll = ()=>{
        dispatch(setCarList([]));
    }

    const handleRegister = ()=>{
        navigate('/register', {state : {clickedbtn : "register"}});
    }

    return (
    <>
         <nav>
            <h1>Buy Your Dream Car</h1>
            <button className="register-button" onClick={handleRegister}>Register</button>
        </nav>
        {carList.map((car)=>{
            return <CarDetails key={car.id} {...car} handleRemove = {handleRemove} />
        })}
        <div className="clearall-div">
            <button type="button" className='clearall-btn' onClick={handleClearAll}>Clear All</button>
        </div>
        
    </>
    );
}


export default Shop