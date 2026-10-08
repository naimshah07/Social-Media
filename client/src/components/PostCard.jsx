import { Badge, BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import React, { useState } from 'react'
import moment from 'moment'
import { dummyUserData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {

    const postWithHashtags = post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>');
    const [liked, setLiked] = useState(post.likes || []);
    const currentUser = dummyUserData

    const handleLike = async () => {
        setLiked(prev => prev.includes(currentUser._id) ? prev.filter(id => id !== currentUser._id) : [...prev, currentUser._id]);
    }

    const navigate = useNavigate()

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
      {/* User Post */}
        <div onClick={()=> navigate('/profile/'+post.user._id)} className="inline-flex items-center gap-3 cursor-pointer">
          <img src={post.user.profile_picture} alt="" className="w-10 h-10 rounded-full shadow"/>
          <div>
            <div className='flex items-center space-x-1'>
                <span>{post.user.full_name}</span>
                <BadgeCheck className='w-4 h-4 text-blue-500'/>
            </div>
            <div>@{post.user.username} ⚪ {moment(post.createdAt).fromNow()}</div>
          </div>
        </div>
        {/* Content */}
        {post.content && (
          <div className='text-gray-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{__html: postWithHashtags}}></div>
        )}
        {/* Images */}
        {post.image_urls && post.image_urls.length > 0 && (
          <div className='grid grid-cols-2 gap-2'>
            {post.image_urls.map((url, index) => (
              <img key={index} src={url} alt="" className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 ? "col-span-2 h-auto" : ""}`} />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
            <div className='flex items-center gap-1'>
                <Heart className={`w-4 h-4 cursor-pointer ${liked.includes(currentUser._id) ? 'fill-red-500 text-red-500' : ''}`} onClick={handleLike}/>
                <span>{liked.length}</span>
            </div>
            <div className='flex items-center gap-1'>
                <MessageCircle className='w-4 h-4'/>
                <span>{12}</span>
            </div>
            <div className='flex items-center gap-1'>
                <Share2 className='w-4 h-4'/>
                <span>{7}</span>
            </div>
        </div>

    </div>
  )
}

export default PostCard
