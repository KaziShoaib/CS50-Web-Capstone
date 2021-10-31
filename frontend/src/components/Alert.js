import React, { useEffect } from "react"
import { useAlert } from "react-alert"
import { useSelector } from "react-redux"

const Alert = () => {
  const alert = useAlert()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if(notification.successMessage)
      alert.success(notification.successMessage)
    if(notification.errorMessage)
      alert.error(notification.errorMessage)
  })
  

  return(
    <div>
    </div>
  )
}

export default Alert