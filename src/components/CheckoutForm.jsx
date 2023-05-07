import React, { useContext } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { useForm } from 'react-hook-form';
import Api from '../helpers/api';
import getCookie from '../helpers/getCookie';
import Cookies from 'js-cookie';

export default function CheckoutForm() {
  const {setVisibility,checkoutBook,setCheckoutBook,refetch} = useContext(CheckoutContext);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const copy_id = checkoutBook.id

  function closeModal(){
    setVisibility(false)
    setCheckoutBook(null)
  }

  async function onSubmit(form) {
    let {number_of_days} = form
    let data = {days:number_of_days};
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.post(`/checkout/${copy_id}`,data,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setVisibility(false)
      setCheckoutBook(null)
      refetch()
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <div>
      { checkoutBook && (
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Checkout Book: <span className='text-blue-400'>{checkoutBook.book.title}</span></h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to checkout this books?</p>
                          </div>
                          <div className="mt-2">
                            <label className="text-sm text-gray-500" htmlFor="number_of_days">
                              How many days?
                            </label>
                            <input  
                                    {...register("number_of_days", { required: true })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="number_of_days"
                                    type="integer"
                                    placeholder="1"/>
                            {errors.number_of_days && <span className='text-red-500'>The number of days is required</span>}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button 
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Checkout</button>
                      <button 
                            type="button" 
                            onClick={() => closeModal()}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                              Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )

      }
    </div>
  )
}
