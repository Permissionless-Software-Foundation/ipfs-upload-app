import React from 'react'
import { store } from 'react-notifications-component'

let _this
class Notification extends React.Component {

  constructor(props) {
    super(props)
    _this = this
    this.store =  store
  }

  notify(title, msj, type, time) {
    _this.store.addNotification({
      title: title,
      message: msj,
      type: type, // danger, success
      insert: 'bottom',
      container: 'bottom-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: time || 2500,
        onScreen: true,
      },
    })
  }
}
export default Notification