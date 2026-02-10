import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/brands.js';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Categories() {

  let { loading, categories } = useSelector((state) => state.categories)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return <>
    {loading ?
      <div className="loading">
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
      :
      <div className="row">
        {categories.map((brand) => <div key={brand._id} className="col-md-4 ">
          <div className="subCategory cursor-pointer py-3 px-2 text-center border-40 rounded-50">
            <Link to={`/SubCategories`}>
              <img className='w-100  space' height={300} src={brand.image} alt={brand.name} />
              <div className='d-flex justify-content-center mb-2 bg-white text-main fw-bolder'>
                <h4 className="h3 my-2">{brand.name}</h4>
              </div>
            </Link>
          </div>
        </div>
        )}
      </div>
    }
  </>
}
