import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import MyTable from '../../../components/table'

//const demoData = require('./testData.json')[0];
// console.log(typeof demoData)
//demoData.transactions = demoData.transactions.map(obj => ({ ...obj, action: 'edit,remove' }))

export default function MyWorkspaceTransaction({ data }) {
  const navigate = useNavigate();
  const { id: workspace_id } = useParams();

  const demoData = data[0]
  demoData.transactions = demoData.transactions.map(obj => ({ ...obj, action: 'edit,remove' }))

  const [modal, setModal] = useState({
    "_id": "",
    "type": ""
  })

  const [transaction, setTransaction] = useState({
    "_id": "",
    "name": "",
    "type": "Income",
    "amount": 0,
    "date": ""
  })

  const modalHandler = (index, type) => {
    setTransaction(demoData.transactions.filter((row) => row._id == index)[0])
    setModal({
      "_id": index,
      "type": type
    })
  }

  const transactionHandler = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value })
  }

  const editTransaction = () => {
    console.log(transaction)
    fetch('/dataAPI/edit', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ transaction, idUser: workspace_id })
    }).then(response => response.json())
      .then((data) => {
        console.log(data);
        navigate('/user/' + workspace_id);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteTransaction = () => {
    fetch('/dataAPI/delete', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idUser: workspace_id, idTransaction: transaction._id })
    })
      .then(response => response.json())
      .then((data) => {
        navigate('/user/' + workspace_id);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const addTransaction = () => {
    console.log(transaction);
    fetch("/dataAPI/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ transaction, idUser: workspace_id })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        navigate('/user/' + workspace_id);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useState(() => {

  }, [modal._id, modal.type, transaction._id, transaction.amount, transaction.date, transaction.name, transaction.type])

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <button class="btn btn-primary btn-block" type="button" onClick={() => setModal({ "type": "add" })} style={{ marginBottom: '1%' }}>
            <i class="icon wb-plus" aria-hidden="true"></i> Add transaction
          </button>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <MyTable
                length={[10, 25, 50]}
                head={Object.keys(demoData.transactions[0])}
                body={demoData.transactions}
                handler={[modalHandler, modalHandler]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={modal._id != "" && modal.type == "edit" ? { display: 'block', paddingRight: '0px' } : { display: 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit transaction {transaction.name}</h5>
              <button type="button" className="close" onClick={() => setModal({ "_id": "" })}><span aria-hidden="true">×</span></button>
            </div>
            <div className="modal-body">
              <div className='row clearfix'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Name</label>
                        <input name='name' type='text' className='form-control' placeholder='Enter your name' value={transaction.name} onChange={transactionHandler} />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Type</label>
                        <select name="type" class="custom-select" onChange={transactionHandler}>
                          <option value="income" selected={transaction.type.toString().toLowerCase() == 'income'}>Income</option>
                          <option value="outcome" selected={transaction.type.toString().toLowerCase() == 'outcome'}>Outcome</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Amount</label>
                        <input name='amount' type='text' className='form-control' placeholder='Enter your amount' value={transaction.amount} onChange={transactionHandler} />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Date</label>
                        <input name='date' type='date' className='form-control' placeholder='Enter your date' value={String(transaction.date.split('T')[0])} onChange={transactionHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModal({ "_id": "" })}>Close</button>
              <button type="button" className="btn btn-primary" onClick={editTransaction}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={modal._id != "" && modal.type == "delete" ? { display: 'block', paddingRight: '0px' } : { display: 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete transaction {transaction.name}</h5>
              <button type="button" className="close" onClick={() => setModal({ "_id": "" })}><span aria-hidden="true">×</span></button>
            </div>
            <div className="modal-body">
              <div className='row clearfix'>
                <div className='col-md-12'>
                  <h4>Are you sure to delete it ?</h4>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModal({ "_id": "" })}>Close</button>
              <button type="button" className="btn btn-danger" onClick={deleteTransaction}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={modal.type == "add" ? { display: 'block', paddingRight: '0px' } : { display: 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add transaction</h5>
              <button type="button" className="close" onClick={() => setModal({ "_id": "" })}><span aria-hidden="true">×</span></button>
            </div>
            <div className="modal-body">
              <div className='row clearfix'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Name</label>
                        <input name='name' type='text' className='form-control' placeholder='Enter your name' value={transaction.name} onChange={transactionHandler} />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Type</label>
                        <select name="type" class="custom-select" onChange={transactionHandler}>
                          <option value="income" selected={transaction.type.toString().toLowerCase() == 'income'}>Income</option>
                          <option value="outcome" selected={transaction.type.toString().toLowerCase() == 'outcome'}>Outcome</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Amount</label>
                        <input name='amount' type='text' className='form-control' placeholder='Enter your amount' value={transaction.amount} onChange={transactionHandler} />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-group'>
                        <label className='form-label'>Date</label>
                        <input name='date' type='date' className='form-control' placeholder='Enter your date' value={String(transaction.date.split('T')[0])} onChange={transactionHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModal({ "type": "" })}>Close</button>
              <button type="button" className="btn btn-primary" onClick={addTransaction}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
