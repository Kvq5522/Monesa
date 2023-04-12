import MyTable from '../../../components/table'

const testData = [...Array(1).keys()].map(i => ({ Username: (Math.random() + 1).toString(36).substring(2), Name: 'Name ' + i, Email: 'Email ' + i, Action: 'add,remove'}))

export default function MyFriendRequest() {
  return (
    <>
      <div className='section-body'>
        <div className='card'>
          <div className='card-body'>
            <div className='row clearfix'>
              <div className='col-md-12'>
                <MyTable 
                  length={[10, 25, 50]} 
                  head={['Username', 'Name', 'Email', 'Action']} 
                  body={testData}
                  handler={[]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}