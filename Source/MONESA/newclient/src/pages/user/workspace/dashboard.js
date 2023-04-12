import Chart from "react-apexcharts"

//// Do not uncomment these line
// demoData.sort((a, b) => {
//   if (a.length > 1)
//     a.shift()
//   if (b.length > 1)
//     b.shift()
//   return Date.parse(a['date']) - Date.parse(b['date'])
// })
// console.log(demoData)

export default function MyWorkspaceDashboard({ data }) {
  const demoData = data
  console.log(demoData[0])
  return (
    <>
      <div className='row clearfix'>
        <div className='col-md-4'>
          <div className='card'>
            <div className="card-body widgets1">
              <div className="icon">
                <i className="fa fa-wallet text-primary font-30"></i>
              </div>
              <div className="details">
                <h5 className="mb-0">Balance</h5>
                {/* <p className="mb-0">${demoData[0].balance}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <div className="card-body widgets1">
              <div className="icon">
                <i className="fa fa-money-bill-trend-up text-success font-30"></i>
              </div>
              <div className="details">
                <h5 className="mb-0">Total income</h5>
                {/* <p className="mb-0">${demoData[0].income}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card'>
            <div className="card-body widgets1">
              <div className="icon">
                <i className="fa fa-bag-shopping text-danger font-30"></i>
              </div>
              <div className="details">
                <h5 className="mb-0">Total outcome</h5>
                {/* <p className="mb-0">${demoData[0].outcome}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>Statistic</h3>
        </div>
        <div className='card-body'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <Chart
                type='area'
                height={350}
                options={{
                  chart: {
                    stacked: true,
                    toolbar: {
                      show: true,
                    },
                  },
                  colors: ['#6435c9', '#f66d9b', '#CED4DC'],
                  dataLabels: {
                    enabled: false,
                  },
                  markers: {
                    size: 0,
                    style: 'hollow',
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      opacityFrom: 0.6,
                      opacityTo: 0.8,
                    }
                  },
                  legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    show: true,
                  },
                  xaxis: {
                    type: 'datetime',
                  },
                  grid: {
                    yaxis: {
                      lines: {
                        show: false,
                      }
                    },
                    padding: {
                      top: 20,
                      right: 0,
                      bottom: 0,
                      left: 0
                    },
                  },
                  stroke: {
                    show: true,
                    curve: 'smooth',
                    width: 2,
                  },
                  tooltip: {
                    x: {
                      format: 'dd MMM yyyy'
                    }
                  },
                }}

                series={[
                  {
                    name: 'Income',
                    data: demoData[0].transactions.filter((row) => {
                      console.log(row['type'].toString().toLowerCase(), "cc");
                      return row['type'].toString().toLowerCase() == 'income'
                    }).map((row) => {
                      return [Date.parse(row['date']), row['amount']]
                    })
                  },
                  {
                    name: 'Outcome',
                    data: demoData[0].transactions.filter((row) => {
                      return row['type'].toString().toLowerCase() == 'outcome'
                    }).map((row) => {
                      return [Date.parse(row['date']), row['amount']]
                    })
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}