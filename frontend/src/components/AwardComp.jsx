import React from 'react'

function AwardComp(props) {
  return (
    <div className=" sm:max-w-1xl sm:pt-6 pb-6 lg:max-w-4xl mx-auto mt-6 sm:mt-12 sm:ml-5 bg-[#122e76] text-white rounded-xl p-3 flex flex-col lg:flex-row items-center gap-2">
      <div className='w-2/5'>
        <img src={props.img} alt={props.name} className='w-100 h-40 object-contain' />
      </div>

      <div className="w-3/5 space-y-2 text-center lg:text-left">
          <li className="font-bold">Name : {props.name}</li>
          <li className="font-bold">Designation : {props.designation}</li>
          <li className="font-bold">Affiliation : {props.affiliation}</li>
          <li className="font-bold">Award : {props.award}</li>
          <div className='flex flex-row'>
            <div>
              
          <li className="font-bold">Award ID : {props.award_id}</li>
            </div>
            <div>
              <button className='h-[2rem] w-[6rem] bg-blue-700 text-white ml-[8rem] rounded-2xl'>Read More</button>
            </div>

          </div>
          
      </div>
    </div>
  )
}

export default AwardComp
