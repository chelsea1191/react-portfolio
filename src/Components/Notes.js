import React from 'react'

export default function Notes ({note}) {
  return (
    <div className="list">
				<p>NOTES</p>
        <ul>
          {
              note.map(each =>
              <li>{each.text}</li>
                )
          }
        </ul>
		</div>
  )
}
