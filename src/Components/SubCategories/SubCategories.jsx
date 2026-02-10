import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/subCategories.js';
import { BallTriangle } from 'react-loader-spinner';

export default function SubcategoryList() {

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
      : <div className="row ">
        {categories.map((brand) => <div key={brand._id} className="col-md-4 subCategory cursor-pointer py-3 px-2 text-center ">
          <h2 className='text-main '>{brand.title}</h2>
          <div className="normalSubCategory d-flex justify-content-center mb-2 bg-white text-main fw-bolder w-30  ">
            <h2 className='h5 text-center '>{brand.name}</h2>
          </div>
        </div>
        )}
      </div>
    }
  </>
}
