import React from 'react'
import "./background.css"
import arrow from "../../../assets/images/arrow.png"
export default function Background() {
  return (
    <div>
      <div className="outside5"> 
        <div className="outside4"> 
          <div className="outside3">
            <div className="outside2">
              <div className='outside1'>
              <img className='arrow' src={arrow} alt="" />
            </div>
          </div>
        </div>
      </div>
      </div>
      
    
    </div>
  )
}
