import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Categorias } from '../types/categorias'
import { Pratos } from '../types/pratos'
import { isTemplateLiteral } from 'typescript';

const Foods = () => {
  const [categorias, setCategorias] = useState<any>([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<String>("")
  const [comidas, setComidas] = useState<any> ([])
  const [meuInput, SeuMeuInput] = useState ("")

  
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then(resposta => setCategorias(resposta.data.categories))
  }, [])

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaSelecionada}`)
      .then(resposta => setComidas(resposta.data.meals))
  }, [categoriaSelecionada])

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meuInput}`)
      .then(resposta => setComidas(resposta.data.meals))
  }, [meuInput])

  return (
    <div className="food-beer-list food-shop">
      <h1>Tipos de pratos</h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input type="text" placeholder="Digite a comida..." onChange={(event) => SeuMeuInput(event.target.value)} />
      </p>
      <ul>
        {categorias !== null && categorias.map((item: Categorias) => (
          <li onClick={() => setCategoriaSelecionada(item.strCategory)} key={item.idCategory}>{item.strCategory}</li>
        )
        )}</ul>

      
      <h2>Tipo selecionado: <strong>{categoriaSelecionada}</strong></h2>
      
      <div className="food-container">
      {comidas !== null && comidas.map((item: Pratos) => (
      
        <div className="food-item">
          <img src={item.strMealThumb}  />
          <p key={item.idMeal} >{item.strMeal}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Foods;