import React from 'react'

export default function Companies ({followingCompanies}) {
  return (
    <div className="list">
				<p>COMPANIES BY ID</p>
        <ul>
          {
              followingCompanies.map(each =>
                <li>{each.id}</li>
                )
          }
        </ul>
		</div>
  )
}
