import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/categoriesSlice.js';
import { BallTriangle } from 'react-loader-spinner';

export default function Brands() {

  let { loading, categories } = useSelector((state) => state.categories)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return <>
    {loading ? <div className="loading">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
      : <div className="row">
        {categories.map((brand) => <div key={brand._id} className="col-md-2">
          <div className="brand">
            <img src={brand.image} className='w-100' alt={brand.name} />
            <h4 className="h6 my-2">{brand.name}</h4>
          </div>
        </div>
        )}
      </div>
    }
  </>
}
