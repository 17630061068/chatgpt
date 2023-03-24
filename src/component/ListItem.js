
function ListItem (props) {
  return (
    <div>
      <img src="https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_default.jpg"></img>
      <idv>
        {props.item.content}
      </idv>
    </div>
  )
}

export default ListItem