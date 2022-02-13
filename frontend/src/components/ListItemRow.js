import React from 'react'

const ListItemRow = ({title, info}) => {

    return (
        <div className='row'>
            <div className='col-4'>
                <p className='fw-bold'>{`${title} :`}</p>
            </div>
            <div className='col-8'>
                <p>{info}</p>
            </div>
        </div>
    )
}

export default ListItemRow