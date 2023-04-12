import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


import ProfilePic from '../../../assets/img/empty_user.png'

const testData = require('./testData.json')
//todo note2 chinh su lai url vs sua lai so dasdboark

export default function MyDashboard() {
  const navigate = useNavigate()
  const { id: idUser } = useParams();
  const [user, setUser] = useState({ id: "", name: "", workspace: null });
  
  const iduser = {
    id: idUser
  };

  useEffect(() => {
    fetch("/dataAPI/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(iduser)
    })
      .then(response => response.json())
      .then((data) => {
        setUser({ id: data._id, name: data.displayName, workspace: [data.defaultWorkspace] });
        user.id = data._id;
        user.name = data.displayName;
        user.workspace = [data.defaultWorkspace];
        
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <>
      <div className='section-body'>
        <div className='container-fluid'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <div className='card card-profile'>
                <div className='card-body text-center'>
                  <img className='card-profile-img' src={ProfilePic} alt='' />
                  <h4 className='mb-3'>Welcome back, <span className='text-info'>{user.name}</span></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section-body'>
        <div className='container-fluid'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header text-center'>
                  <h3 className='card-title'>Your workspace</h3>
                </div>
                <div className='card-body'>
                  <div className='row clearfix'>
                    {
                      testData.map((workspace, index) => {
                        return (
                          <div className='col-md-3' key={workspace._id}>
                            <div className='card'>
                              <div className='card-header text-center'>
                                <h3 className='card-title'>Workspace #{index + 1}</h3>
                              </div>
                              <div className='card-body'>
                                <div className='text-muted'>Name: {workspace.name}</div>
                                <div className='text-muted'>Member: {workspace.member.length}</div>
                                <div className='text-muted'>Created at: {new Date(workspace.createAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                                <div className='text-muted'></div>
                              </div>
                              <div className='card-footer text-right'>
                                <button type='submit' className='btn btn-outline-primary' onClick={() => navigate('/user/workspace/' + idUser)}>Open</button>
                                <button type='submit' className='btn btn-outline-danger'>Delete</button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}