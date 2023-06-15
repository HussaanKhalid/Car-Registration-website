import { useNavigate } from "react-router-dom";

interface regCarData{
    id: string;
    registrationNumber: string;
    color: string;
    model: string;
    make: string;
    handleRemove: (id: string)=>void;
}

// interface tempCarData{
//     carId: string;
//     carRegistrationNumber: string;
//     carColor: string;
//     carModel: string;
//     carMake: string;
// }



const CarDetails = ({id, registrationNumber, color, model, make, handleRemove}: regCarData) =>{
    const navigate = useNavigate();
    // const tempCar : tempCarData = {
    //     carId: id,
    //     carRegistrationNumber: registrationNumber,
    //     carColor: color,
    //     carModel: model,
    //     carMake: make,
    // }
    const handleUpdate = ()=>{
    // navigate('/register', {state : {carId: id, clickedbtn: "update"}})
    // navigate('/register', {state : {Car: tempCar, clickedbtn: "update"}})

    navigate('/register', {state : {carId: id, carReg: registrationNumber, carColor: color, carModel: model, carMake: make, clickedbtn: "update"}})
    }
    return(
        <div className='container'>

            <h4>Id: {id}</h4>
            <h4>Registration Number: {registrationNumber}</h4>
            <h4>Color: {color}</h4>
            <h4>Model: {model}</h4>
            <h4>Make: {make}</h4>


            <button type='button' className='car-update' onClick={handleUpdate}>update</button>
            <button type='button' className='car-delete' onClick={()=>handleRemove(id)}>remove</button>
        </div>
    )
}


export default CarDetails