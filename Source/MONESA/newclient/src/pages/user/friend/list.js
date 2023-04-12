import MyTable from '../../../components/table'

const testData = [...Array(500).keys()].map(i => ({ username: (Math.random() + 1).toString(36).substring(2), name: 'Name ' + i, email: 'Email ' + i, action: 'remove'}))

export default function MyFriendList() {
  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <MyTable 
                length={[10, 25, 50]} 
                head={['username', 'name', 'email', 'action']} 
                body={testData} 
                handler={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}