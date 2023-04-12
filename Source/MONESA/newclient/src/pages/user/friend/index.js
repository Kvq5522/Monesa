import MyPill from '../../../components/pill'
import MyFriendAdd from './add'
import MyFriendList from './list'
import MyFriendRequest from './request'

export default function MyFriend() {
  return (
    <>
      <div className='section-body'>
        <div className='container-fluid'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <MyPill 
                head={['List friend', 'Request Friend', 'Add Friend']} 
                body={[<MyFriendList />, <MyFriendRequest />, <MyFriendAdd />]} 
              />
            </div>
          </div>
        </div>
      </div>    
    </>
  )
}