import MyPill from '../../../components/pill'
import MyAccountProfile from './profile'
import MyAccountSecurity from './security'

export default function MyAccount() {
  return (
    <>
      <div className='section-body'>
        <div className='container-fluid'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <MyPill head={['Profile', 'Security']} body={[<MyAccountProfile/>, <MyAccountSecurity/>]} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}