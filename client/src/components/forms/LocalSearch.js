import React from 'react'

const LocalSearch = (props) => {

  //searching step-3
  const handleSearchChange=(e)=>{
    e.preventDefault();
    props.setKeword(e.target.value.toLowerCase());
}
    return (
        <div className='container py-3'>
            <input
            type="serch"
            placeholder='Search'
            value={props.keyword}
            onChange={handleSearchChange}
            className='form-control mb-4'
        />
        </div>
    )
}

export default LocalSearch