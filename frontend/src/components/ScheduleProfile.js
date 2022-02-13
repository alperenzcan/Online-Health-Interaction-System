import React, { useState } from 'react'
import { cancel } from '../api/apiCalls'
import DateTimeItem from './DateTimeItem'

const ScheduleProfile = ({ id, date }) => {

    const [ button, setButton] = useState(false)

  const onClickCancel = async event => {
    setButton(true)
      try{
          const res = await cancel(id);
      }catch(apiError){
      }
  }

  return (
    <div className='border m-3'>
        <div className='row'>
            <div className='col'>
                <DateTimeItem date={date} />
            </div>
            <div className='col col-auto text-right'>
                <button className='btn btn-secondary my-2' onClick={onClickCancel} disabled={button}>{button ? "Randevu iptal Edildi":"Randevu İptal"}</button>
            </div>
        </div>
    </div>
  )
}

export default ScheduleProfile