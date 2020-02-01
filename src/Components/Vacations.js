import React from 'react'
import moment from 'moment'

export default function Vacations ({vacation}) {
  return (
    <div className="list">
        <ul>
          {
              vacation.map(each =>
                <div className="vacationList">
                  <p>start date: {each.startDate}</p>
                  <p>end date: {each.endDate}</p>
                </div>
                )
          }
        </ul>
		</div>
  )
}

