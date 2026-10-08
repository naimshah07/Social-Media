import React, { useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import StoriesBar from '../components/StoriesBar'
import RecentMessages from '../components/RecentMessages'
import PostCard from '../components/PostCard'
import Loading from '../components/Loading'

const Feed = () => {

  const [feeds] = useState(dummyPostsData)
  const [loading] = useState(false)

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/*Stories and post list*/}
      <div>
        <StoriesBar />
        <div className='p-4 space-y-6'>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      {/*Right sidebar*/}
      <div className='max-xl:hidden sticky top-0 space-y-4'>
        <RecentMessages />
       <div className='max-h-64 bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
         <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
         <img src={assets.sponsored_img} className='w-full h-auto rounded-md' alt=''/>
         <p className='text-slate-600'>Email marketing</p>
         <p className='text-slate-400'>Supercharge your marketing with a powerful, easy-to-use platform built for results.</p>
       </div>
      </div>
    </div>
  ) : <Loading />
}

export default Feed
