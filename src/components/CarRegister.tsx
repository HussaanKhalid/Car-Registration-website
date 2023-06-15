//Register


import { FormEvent, useState, useEffect, useRef} from 'react'
import { RootState } from '../store'
import { carMakesData, carModelsData } from "../carData"
import { regCarData } from '../carData'
import { useDispatch, useSelector } from 'react-redux'
import { registerCar, updateCar } from '../features/Shop/shopSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const CarRegister: React.FC = ()=>{

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const {carList} = useSelector((state: RootState) => state.shop);

    


    let initial: regCarData = {
        id: "",
        registrationNumber: "", 
        color: "", 
        model: "", 
        make: "",
    };

    if(location.state.clickedbtn === 'update'){
        initial = {
            id: location.state.carId,
            registrationNumber: location.state.carReg, 
            color: location.state.carColor, 
            model: location.state.carModel, 
            make: location.state.carMake,
        }
    }

    const [carInfo, setCarInfo] = useState<regCarData>(initial);

    const ref = useRef(location.state.value);
    

    let index = -1;
    if(location.state.clickedbtn === 'register'){
        index = carMakesData.indexOf(carInfo.make);
    }
    if(location.state.clickedbtn === 'update'){
        index = carMakesData.indexOf(carInfo.make);
    }

    

    useEffect(() => {
        setCarInfo({...carInfo, model: ref.current.value});
        // setReslectModel(true);
    }, [carInfo.make])

    const [isBlur, setBlur] = useState<boolean>(false);

    const [isMake, setIsMake] = useState<boolean>(false);
    const [isModel, setIsModel] = useState<boolean>(false);
    const [isRegno, setIsRegno] = useState<boolean>(false);
    const [isColor, setIsColor] = useState<boolean>(false);


    const handleFocus = () => {
        setBlur(false);
    }

    const handleBlur = (e: any) => {
        setBlur(true);
        if(e.target.name === 'make'){
            if(carInfo.make === ""){
                e.target.style.borderColor = 'red';
                setIsMake(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
        }

        if(e.target.name === 'model'){
            if(carInfo.model === ""){
                e.target.style.borderColor = 'red';
                setIsModel(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
        }

        if(e.target.name === 'registrationNumber'){
            if(carInfo.registrationNumber === ""){
                e.target.style.borderColor = 'red';
                setIsRegno(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
        }

        if(e.target.name === 'color'){
            if(carInfo.color === ""){
                e.target.style.borderColor = 'red';
                setIsColor(true);
            }
            else{
                e.target.style.borderColor = 'green';
            }
        }
            
    }

    

    const handleChange = (event: any) => {
        if(location.state.clickedbtn === "register"){
            setCarInfo({...carInfo, [event.target.name] : event.target.value , id: (carList.length + 1).toString()} );
        }
        if(location.state.clickedbtn === "update")
        {
            setCarInfo({...carInfo, [event.target.name] : event.target.value , id: location.state.carId} );
        }
        
    }

    const [isError, setIsError] = useState<boolean>(false);
    

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(carInfo.make === "" || carInfo.model === "" || carInfo.registrationNumber === "" || carInfo.color === ""){
            setIsError(true);   
        }
        else{
            if(location.state.clickedbtn === "register"){
                dispatch(registerCar(carInfo));    
            }
            if(location.state.clickedbtn === "update"){
                dispatch(updateCar(carInfo));
            }
            
            navigate('/shop');    
        }
        
    }

    return (
        <div className="car-register">
            <h2>Car Information</h2>
            <form className="register-form" onSubmit={handleSubmit}>

                <label htmlFor="make">Make:</label>
                {location.state.clickedbtn === 'register' &&
                <select id="make" name="make" onChange={handleChange} onBlur={handleBlur}>
                    <option value="" selected>select</option>
                    {carMakesData?.map(car => <option>{car}</option>)}
                </select>
                }

                {location.state.clickedbtn === 'update' && 
                <select id="make" name="make" defaultValue={location.state.carMake} onChange={handleChange} onBlur={handleBlur}>
                    <option value="">select</option>
                    {carMakesData?.map(car => <option>{car}</option>)}
                </select>
                }

                {!carInfo.make && isBlur && isMake && <p className='warning'>Please select make.</p>}
    
            <br/><br/>

            
                {location.state.clickedbtn === 'register' && 
                <>
                    <label htmlFor="model">Model:</label>
                    <select ref={ref} id="model" name="model" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}>
                    <option value="" selected>select</option>
                    {(Object.values(carModelsData)[index])?.map((model : string) => <option value={model}>{model}</option>)}
                </select>
                </>
                }

                {location.state.clickedbtn === 'update' && 
                <>
                <label htmlFor="model">Model:</label>
                <select ref={ref} id="model" name="model" defaultValue={location.state.carModel} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}>
                    <option value="" selected>select</option>
                    {(Object.values(carModelsData)[index])?.map((model : string) => <option>{model}</option>)}
                </select>
                {/* {reselectModel && <p>Please Re-enter the model</p>} */}
                </>
                }

                {!carInfo.model && isBlur && isModel && <p className='warning'>Please select model.</p>}
            
            <label htmlFor="registrationNumber">Registration Number:</label>
            {location.state.clickedbtn === 'register' && 
                <input type="text" id="registrationNumber" name="registrationNumber" onFocus={handleFocus} onChange={handleChange} onBlur={handleBlur}/>
            }
            {location.state.clickedbtn === 'update' && 
                <input type="text" id="registrationNumber" name="registrationNumber" defaultValue={location.state.carReg} onFocus={handleFocus} onChange={handleChange} onBlur={handleBlur}/>
            }
            
            {!carInfo.registrationNumber && isBlur && isRegno && <p className='warning'>Please enter registeration number.</p>}

            <br/><br/>
    
            <label htmlFor="color">Color:</label>
            {location.state.clickedbtn === 'register' &&
                <input type="text" id="color" name="color" onFocus={handleFocus} onChange={handleChange} onBlur={handleBlur}/>
            }
            {location.state.clickedbtn === 'update' &&
                <input type="text" id="color" name="color" defaultValue={location.state.carColor} onFocus={handleFocus} onChange={handleChange} onBlur={handleBlur}/>
            }

            {!carInfo.color && isBlur && isColor && <p className='warning'>Please enter color.</p>}
            <br/><br/>
    
            {location.state.clickedbtn === "update" && (<button type='submit'>Update</button>)}

            {location.state.clickedbtn === "register" && (<button type='submit'>Register</button>)}
            

            <br/><br/>
            </form>

            {isError && <p className='warning'>Please fill all the entries.</p>}
    </div>
    )
}

export default CarRegister