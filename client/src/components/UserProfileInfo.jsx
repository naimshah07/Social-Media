import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import React from 'react'
import moment from 'moment'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className='py-6 px-6 md:px-8 bg-white'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>

        {/* Avatar */}
        <div className='w-32 h-32 rounded-full border-4 border-white shadow-lg shrink-0'>
          <img
            src={user.profile_picture}
            alt='Profile'
            className='w-full h-full rounded-full object-cover'
          />
        </div>

        {/* Info */}
        <div className='flex flex-col items-center md:items-start w-full'>

          <div className='flex justify-between items-start w-full'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                {user.full_name}
                <Verified className='w-5 h-5 text-blue-500' />
              </h1>

              <p className='text-gray-600'>
                {user.username ? `@${user.username}` : 'Add a username'}
              </p>
            </div>

            {!profileId && (
              <button
                onClick={() => setShowEdit(true)}
                className='flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition'
              >
                <PenBox className='w-4 h-4' />
                Edit
              </button>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p
              className='text-gray-700 text-sm mt-4'
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {user.bio}
            </p>
          )}

          {/* Location */}
          <div className='flex items-center gap-2 text-sm text-gray-500 mt-3'>
            <MapPin className='w-4 h-4' />
            {user.location || 'Add location'}
          </div>

          {/* Joined */}
          <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
            <Calendar className='w-4 h-4' />
            Joined <span className='font-medium'>{moment(user.createdAt).fromNow()}</span>
          </div>

          {/* Stats */}
          <div className='flex gap-8 mt-6 pt-4 border-t border-gray-200 w-full'>
            <div>
              <span className='text-lg font-bold'>{posts.length}</span>
              <span className='ml-1 text-sm text-gray-500'>Posts</span>
            </div>
            <div>
              <span className='text-lg font-bold'>{user.following.length}</span>
              <span className='ml-1 text-sm text-gray-500'>Following</span>
            </div>
            <div>
              <span className='text-lg font-bold'>{user.followers.length}</span>
              <span className='ml-1 text-sm text-gray-500'>Followers</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserProfileInfo
