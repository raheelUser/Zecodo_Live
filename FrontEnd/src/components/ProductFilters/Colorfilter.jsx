import React, {
  useEffect,
  useState,
  Routes,
  Route
} from 'react'
import axios from "axios";
import {
  BASE_API
} from '../../services/Constant'
const Colorfilter = () => {  
  const instance = axios.create();
  const [colors, setColors] = useState([]);
  const fetchColors = () => {
    axios.get(`${BASE_API}/productAttributes/getAttributes`)
        .then(
            response => {
              console.log('colors',response.data)
              setColors(response.data);
            })
        .catch(error => {
            console.log("ERROR:: ", error.response);
        });
  };
useEffect(() => {
  fetchColors();
}, []);
  return (
    <>
    <div className='color-filter-product'>
        <h3>Colors</h3>
        <ul>
        {colors?.map(color => (<>
          {(() => {
            if (color.attribute?.name == 'colors' || color.attribute?.name == 'color') {
              return (
                <div>
                  {color.attribute.options?.map(option => (
                    <li><div className={option}></div></li>
                  ))}
                </div>
              )
            } else {
              return (
                null
              )
            }
          })()}
          </>
            // <li><div className='red'>{color.attribute?.name}</div></li>
            // <li><div className='grey'></div></li>
            // <li><div className='yellow'></div></li>
            // <li><div className='black'></div></li>
            // <li><div className='green'></div></li>
            ))}
        </ul>
    </div>
    </>
  )
}

export default Colorfilter