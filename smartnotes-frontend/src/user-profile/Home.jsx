import React from 'react'
function Home() {
  return (
    <div className='upContests ms-10 scroll-section pt-12 mb-8'>
        <h1 className='text-5xl font-afacad font-medium mb-12'>Recently Visited</h1>
        <div className="flex gap-4 overflow-x-auto py-4 rounded-xl scrollbar-hide">
            <div className='flex gap-4 me-2'>
                
                            
                                <div className="flex flex-col w-80 p-6 pb-4 sm:pe-4 bg-[#f5f5f5] rounded-28px hover:scale-[1.01] transition-all">
                                    <img src="" alt="icon" className="w-8 mb-2" />
                                    <h2 className='text-2xl font-semibold mb-2'></h2>
                                    <p className="text-md">
                                        {/* <span className='font-semibold'>Contest Name: </span> */}
                                        </p>
                                    <p className="text-md"><span className='font-semibold'>Date:</span> </p>
                                    <p className="text-md"><span className='font-semibold'>Time:</span> </p>
                                    <div className='flex justify-end mt-4'>
                                        <a href="" target="_blank" rel="noreferrer">
                                            <div className='bg-[#37373a] p-3 sm:p-2 rounded-full'>
                                                <img src="" alt="open in new tab" className="w-5 sm:w-4 rotate-[-45deg]" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            
                        
                
            </div>
        </div>
        <div className='flex justify-end me-10 mt-12 gap-6 sm:gap-4'>
            {
                <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full' src="" alt="" />
            }
            {
                <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full hover:cursor-pointer' src=" " alt="" onClick="" />
            }
            {
                <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full hover:cursor-pointer' src="" alt="" onClick="" />
            }
            {
                <img className='w-12 sm:w-10 bg-[#e0e0e3] p-1 rounded-full' src="" alt="" />
            }
        </div>
    </div>
)
}

export default Home