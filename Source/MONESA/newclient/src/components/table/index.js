import React, { useEffect, useState, useCallback } from "react";

var classNames = require('classnames');

export default function MyTable({length, head, body, handler}) {
  const [lengthPage, setLengthPage] = useState(length[0])
  const [indexPage, setIndexPage] = useState(0)
  const [searchKey, setSearchKey] = useState('')
  const [showBody, setShowBody] = useState(Object.entries(body))
  const [sort, setSort] = useState({
    column: '0',
    order: 'asc'
  })
  const [pagination, setPagination] = useState([...Array(Math.ceil(Object.entries(showBody).length / lengthPage) - 1 > 10 ? 10 : Math.ceil(Object.entries(showBody).length / lengthPage)).keys()])
  
  const sortHandler = (e, indexColumn) => {
    const order = indexColumn == sort.column ? (sort.order == 'asc' ? 'desc' : 'asc') : 'asc'

    setSort({
      column: indexColumn,
      order: order
    })  

    showBody.sort((a, b) => {
      if (a.length > 1)
        a.shift()
      if (b.length > 1)
        b.shift()

      return order == 'asc' ? (typeof(a[0][head[indexColumn]]) == 'number' ? a[0][head[indexColumn]] - b[0][head[indexColumn]] : a[0][head[indexColumn]].localeCompare(b[0][head[indexColumn]])) : (typeof(a[0][head[indexColumn]]) == 'number' ? b[0][head[indexColumn]] - a[0][head[indexColumn]] : b[0][head[indexColumn]].localeCompare(a[0][head[indexColumn]]))
    })

    setIndexPage(0)
  }

  const searchHandler = (e) => {
    setSearchKey(e.target.value)

    if (e.target.value == '')
      setShowBody(Object.entries(body))
    else {
      setShowBody(Object.entries(body).filter((row) => {
        row.shift()
        return Object.values(row).map((el) => {
          return Object.entries(el).map(([key, value]) => {
            if (value.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) == true)
              return true
          }).findIndex(element => element == true) >= 0
        }).findIndex(element => element == true) >= 0
      }))
    }

    setIndexPage(0)
  }

  const pageHandler = (e) => {
    setLengthPage(e.target.value)
    setIndexPage(0)
  }

  const paginationHandler = (nextPage) => {
    setIndexPage(nextPage)

    var totalPage = Math.ceil(Object.entries(showBody).length / lengthPage) - 1
    
    var startPage, endPage

    if (totalPage < 10) {
      startPage = 0;
      endPage = totalPage;
    }
    else {
      if (nextPage <= 6) {
        startPage = 0;
        endPage = 9;
      }
      else if (nextPage + 4 >= totalPage) {
        startPage = totalPage - 9;
        endPage = totalPage;
      }
      else {
        startPage = nextPage - 5;
        endPage = nextPage + 4;
      }
    }

    setPagination([...Array((endPage + 1) - startPage).keys()].map(i => startPage + i))
  }

  useEffect(() => {
    paginationHandler(indexPage)
  }, [lengthPage, indexPage, searchKey, showBody, sort.column, sort.order])

  return (
    <>
      <div className="table-responsive">
        <div className="dataTables_wrapper dt-bootstrap4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dataTables_length">
                <label> 
                  Show 
                  <select className="form-control" onChange={pageHandler}>
                    {
                      length.map((myLen, index) => {
                        return (
                          <option value={myLen} key={'option' + index}>{myLen}</option>
                        )
                      })
                    }
                  </select>
                  entries
                </label>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="dataTables_filter">
                <label>Search:
                  <input type="search" className="form-control" placeholder="Enter key" value={searchKey} onChange={searchHandler}/>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-hover table-vcenter table-striped dataTable" cellSpacing="0" role="grid">
              <thead className="thead-light">
                <tr>
                  {
                    head.map((myHead, index) => {
                      if (myHead.toString().toLowerCase() != "_id")
                        return (
                          <th className={ sort.column == index ? (sort.order == 'asc' ? 'sorting_asc': 'sorting_desc') : 'sorting'} tabIndex="0" rowSpan="1" colSpan="1" onClick={(e) => {sortHandler(e, index)}} key={myHead + index}>{myHead}</th>
                        )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {showBody.slice(indexPage * lengthPage, (indexPage + 1) * lengthPage).map((myBody, index1) => {
                  if (Object.entries(myBody).length > 1)
                    myBody.shift()
                  return (
                    <tr className={classNames('gradeA', index1 % 2 == 0 ? 'odd' : 'even')} key={'showBody' + index1}>
                      {Object.values(myBody).map((el, index2) => {
                        return (
                          Object.entries(el).map(([key, value]) => {
                            if (key.toString().toLowerCase() != "_id") {
                              return (
                                <td className={classNames(key == 'Action' ? 'action' : '', index2 == sort.column ? 'sorting_1' : '')} key={key + index2}>
                                  {
                                    key.toString().toLowerCase() == 'action' 
                                    ? 
                                      value.split(',').map((sign, index3) => {
                                        if (sign == 'add')
                                          return (
                                            <button className="btn btn-success btn-sm" datatoggle="tooltip" dataoriginaltitle="Save" key={key + sign + index1} onClick={useCallback(() => handler[index3](showBody[index1][0]["_id"], "add"), [handler[index3]])}><i className="fa fa-square-plus" aria-hidden="true"></i></button>
                                          )
                                        else if (sign == 'edit')
                                          return (
                                            <button className="btn btn-primary btn-sm" datatoggle="tooltip" dataoriginaltitle="Edit" key={key + sign + index1} onClick={useCallback(() => handler[index3](showBody[index1][0]["_id"], "edit"), [handler[index3]])}><i className="fa fa-edit" aria-hidden="true"></i></button>
                                          )
                                        else if (sign == 'remove')
                                          return (
                                            <button className="btn btn-danger btn-sm" datatoggle="tooltip" dataoriginaltitle="Remove" key={key + sign + index1} onClick={useCallback(() => handler[index3](showBody[index1][0]["_id"], "delete"), [handler[index3]])}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                          )
                                      })
                                    : (
                                      !isNaN(Date.parse(value)) && isNaN(value) && new Date(Date.parse(value)).toISOString() == value
                                      ?
                                        new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric'})
                                      :
                                        value
                                    )
                                  }
                                </td>
                              )
                            }
                          })
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-5">
            <div className="dataTables_info" role="status">Showing {indexPage * lengthPage} to { Math.min((indexPage + 1) * lengthPage, Object.entries(showBody).length)} of {Object.entries(showBody).length} entries</div>
          </div>
          <div className="col-sm-12 col-md-7">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination justify-content-end">
                <li className={classNames('paginate_button page-item previous', indexPage == 0 ? 'disabled' : '')}>
                  <a className="page-link" onClick={(e) => paginationHandler(indexPage - 1)}>Previous</a>
                </li>
                
                {
                  pagination.map((page, index) => {
                    return (
                      <li className={classNames('paginate_button page-item', indexPage == page ? 'active' : '')} key={'pagination' + page}>
                        <a className="page-link" onClick={(e) => paginationHandler(page)}>{page + 1}</a>
                      </li>
                    )
                  })
                }

                <li className={classNames('paginate_button page-item next', indexPage + 1 == Math.ceil(Object.entries(showBody).length / lengthPage) ? 'disabled' : '')}>
                  <a className="page-link" onClick={(e) => paginationHandler(indexPage + 1)}>Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}