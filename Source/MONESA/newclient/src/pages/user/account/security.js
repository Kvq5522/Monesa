import classNames from 'classnames'
import React, { useState } from 'react'

export default function MyAccountSecurity() {
  const [mail, setMail] = useState({
    code: '',
    password: '',
    status: true,
  })

  const [question, setQuestion] = useState({
    question: '',
    answer: '',
    confirm_answer: '',
    password: '',
    status: false,
  })

  const mailHandler = (e) => {
    setMail({...mail, [e.target.name]: e.target.value})
  }

  const questionHandler = (e) => {
    setQuestion({...question, [e.target.name]: e.target.value})
  }

  const submitHandler = (e) => {
    console.log(data)
    console.log('Submit form')
  }

  const sendMailHandler = (e) => {
    console.log('Mail sent here')
  }

  return (
    <>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header text-center'>
              <h3 className='card-title'>Mail verification</h3>
            </div>
            <div className='card-body'>
              <div className='row clearfix'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-10'>
                      <div className='form-group'>
                        <label className='form-label'>Code</label>
                        <input name='code' type='text' className='form-control' placeholder='Enter your code' value={mail.code} onChange={mailHandler} />
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='form-group'>
                        <label className='form-label'>Get code</label>
                        <button type='submit' className='form-control btn btn-info' onClick={sendMailHandler}>Click here</button>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='form-label'>Current password</label>
                        <input name='password' type='password' className='form-control' placeholder='Enter your password' value={mail.password} onChange={mailHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer text-center'>
              <button type='submit' className={classNames('btn', mail.status == true ? 'btn-outline-danger' : 'btn-outline-primary')} onClick={submitHandler}>{mail.status == true ? 'Disable' : 'Enable'}</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header text-center'>
              <h3 className='card-title'>Secret question</h3>
            </div>
            <div className='card-body'>
              <div className='row clearfix'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='form-label'>Question</label>
                        <input name='question' type='text' className='form-control' disabled={question.status == true ? 1 : 0} placeholder='Enter your question' value={question.question} onChange={questionHandler} />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='form-label'>Answer</label>
                        <input name='answer' type='text' className='form-control' placeholder='Enter your answer' value={question.answer} onChange={questionHandler} />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='form-label'>Confirm answer</label>
                        <input name='confirm_answer' type='text' className='form-control' placeholder='Enter your answer again' value={question.confirm_answer} onChange={questionHandler} />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label className='form-label'>Current password</label>
                        <input name='password' type='password' className='form-control' placeholder='Enter your password' value={question.password} onChange={questionHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer text-center'>
              <button type='submit' className={classNames('btn', question.status == true ? 'btn-outline-danger' : 'btn-outline-primary')} onClick={submitHandler}>{question.status == true ? 'Disable' : 'Enable'}</button>
            </div>
          </div>
        </div>
      </div>    
    </>
  )
}