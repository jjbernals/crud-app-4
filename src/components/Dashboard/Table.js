import React, {useEffect, useState} from 'react';
import axios from "axios";

const Table = ({ cars, handleEdit, handleDelete }) => {



  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Capacidad</th>
            <th>Precio</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
        {cars.map((car, i) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.placa} </td>
                <td>{car.marca}</td>
                <td>{car.modelo}</td>
                <td>{car.color}</td>
                <td>{car.capacidad} </td>
                <td>{car.precio} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(car.id)}
                    className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="button muted-button"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
};

export default Table;
