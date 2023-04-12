import MyPill from '../../../components/pill'
import MyWorkspaceDashboard from './dashboard'
import MyWorkspaceReport from './report'
import MyWorkspaceSetting from './setting'
import MyWorkspaceTransaction from './transaction'
import { useParams } from "react-router-dom";


import React, { useEffect, useState } from "react";

export default function MyWorkspace() {
  const [workspace, setWorkspace] = useState();
  const { id: idUser } = useParams();
  const iduser = {
    id: idUser
  };

  useEffect(() => {
    !workspace ?
      fetch("/dataAPI/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(iduser)
      })
        .then(response => response.json())
        .then((data) => {
          setWorkspace([data.defaultWorkspace]);
        })
        .catch((error) => {
          console.log(error);
        })
      : None
  }, [])

  return (
    <>
      {workspace &&
        <div className="section-body">
          <MyPill
            head={['Dashboard', 'Transaction', 'Report', 'Setting']}
            body={[<MyWorkspaceDashboard data={workspace} />, <MyWorkspaceTransaction data={workspace} />, <MyWorkspaceReport />, <MyWorkspaceSetting />]}
          />
        </div>
      }
    </>
  )
}