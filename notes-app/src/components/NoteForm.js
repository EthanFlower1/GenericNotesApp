export default function NoteForm (props) {
  return (
    <div>
      <form>
      <input value={ props.newTodo } onChange={ props.onChange } placeholder='Add a new Note'></input>
      <button onClick={ props.onClick }> Add </button>
      </form>
    </div>
  )
}