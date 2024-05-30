import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

const Add = ({ cars, setCars, setIsAdding }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [placa, setPlaca] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!marca || !modelo || !color || !placa || !capacidad || !precio) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No pueden ir campos vacios.',
        showConfirmButton: true,
      });
    }


    const payload = {

      marca,
      modelo,
      color,
      placa,
      capacidad,
      precio
    };

    axios.post("http://localhost:8080/car", payload).then((response)=>{
      setIsAdding(false);
    })


    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Se agrego el carro`,
      showConfirmButton: false,
      timer: 1500,
    }).then(()=>{
      window.location.reload()
    })
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Añadir Carro</h1>
        <label htmlFor="marca">Marca</label>
        <input
          id="marca"
          type="text"
          name="marca"
          value={marca}
          onChange={e => setMarca(e.target.value)}
        />
        <label htmlFor="modelo">Modelo</label>
        <input
          id="modelo"
          type="text"
          name="modelo"
          value={modelo}
          onChange={e => setModelo(e.target.value)}
        />
        <label htmlFor="color">Color</label>
        <input
          id="color"
          type="text"
          name="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <label htmlFor="placa">Placa </label>
        <input
          id="placa"
          type="text"
          name="placa"
          value={placa}
          onChange={e => setPlaca(e.target.value)}
        />
        <label htmlFor="capacidad">Capacidad </label>
        <input
            id="capacidad"
            type="number"
            name="capacidad"
            value={capacidad}
            onChange={e => setCapacidad(e.target.value)}
        />
        <label htmlFor="precio">Precio </label>
        <input
            id="precio"
            type="text"
            name="precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Crear" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancelar"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
