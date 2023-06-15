

export const carMakesData : string[] = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla'] // dummy data for the drop down of makers of the car

interface Model{
  Toyota: string[];
  Honda: string[];
  Ford: string[];
  Chevrolet: string[];
  Tesla: string[];
}

export const carModelsData : Model = { // dummy data for the drop down of models of the car

    Toyota: ['Corolla', 'Camry', 'RAV4'],

    Honda: ['Civic', 'Accord', 'CR-V'],

    Ford: ['F-150', 'Mustang', 'Escape'],

    Chevrolet: ['Silverado', 'Camaro', 'Equinox'],

    Tesla: ['Model X', 'Model S', 'Model 3']

  };




export let registerCarsData: regCarData[] = [ //registered cars dummy data

    { id: '1', registrationNumber: 'ABC-123', color: 'red', model: 'Model X', make: 'Tesla' },

    { id: '2', registrationNumber: 'DEF-456', color: 'blue', model: 'Model S', make: 'Tesla' },

    { id: '3', registrationNumber: 'GHI-789', color: 'green', model: 'Model 3', make: 'Tesla' },

  ];


export interface regCarData{
    id: string;
    registrationNumber: string;
    color: string;
    model: string;
    make: string;
}