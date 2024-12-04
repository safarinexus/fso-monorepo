import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const dispatch = useDispatch();
  setTimeout(() => dispatch(removeNotification()), 5000)

  if (notification === '') {
    return
  }

  return (
    <div style={style}>
      {notification} 
    </div>
  )
}

export default Notification