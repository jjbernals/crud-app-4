import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import axios from "axios";

const Dashboard = ({ setIsAuthenticated }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/car").then((response)=>{
      setCars(response.data)
    })
  }, []);


  const handleEdit = id => {
    const [car] = cars.filter(car => car.id === id);
    setSelectedCar(car);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      title: "Eliminar Carro",
      text: "¿Estás seguro de eliminar este carro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2AACA5",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/car/${id}`);
        Swal.fire({
          title: "Eliminado!",
          text: "El carro se ha eliminado con éxito",
          icon: "success",
          confirmButtonColor: "#E77833"
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            cars={cars}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          cars={cars}
          setCars={setCars}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          cars={cars}
          selectedCar={selectedCar}
          setCars={setCars}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
