
export default function Note (props) {
  return (
    <div className='note' >
      <p>{props.text}</p>
      <button onClick={ props.delete }> Delete </button>
    </div>
  )
}