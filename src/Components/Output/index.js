import './index.css'

const Output = props => {
  const {user12} = props
  const {name, imageUrl} = user12
  return (
    <li className="list1">
      <img src={imageUrl} alt={name} className="image" />
      <p className="name">{name}</p>
    </li>
  )
}

export default Output
