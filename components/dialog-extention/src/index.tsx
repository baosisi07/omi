import { h, render } from 'omi'
import * as alertCss from './alert.scss'
import * as promptCss from './alert.scss'

import '@omiu/dialog'
import '@omiu/button'
import '@omiu/input'

interface AlertOptions {
  msg: String
  title: String
  confirmButtonText: String
  onConfirm: () => void
}

let dialog


function alert(options: AlertOptions) {
  if (dialog && dialog.parentNode) dialog.parentNode.removeChild(dialog)
  dialog = render(<o-dialog css={alertCss} title={options.title} visible>
    <span>{options.msg}</span>
    <span slot="footer" class="dialog-footer">
      <o-button onclick={_ => {
        dialog.close()
        options.onConfirm()
      }} type="primary" size="small">{options.confirmButtonText}</o-button>
    </span>
  </ o-dialog>, document.body)
}

interface ConfirmOptions {
  msg: String
  title: String
  confirmButtonText: String
  cancelButtonText: String
  onCancel: () => void
  onConfirm: () => void
}

function confirm(options: ConfirmOptions) {
  if (dialog && dialog.parentNode) dialog.parentNode.removeChild(dialog)
  dialog = render(<o-dialog css={alertCss} title={options.title} visible>
    <span>{options.msg}</span>
    <span slot="footer" class="dialog-footer">
      <o-button style="margin-right:10px;" onclick={_ => {
        dialog.close()
        options.onCancel()
      }} plain size="small">{options.cancelButtonText}</o-button>
      <o-button onclick={_ => {
        dialog.close()
        options.onConfirm()
      }} type="primary" size="small">{options.confirmButtonText}</o-button>
    </span>
  </ o-dialog>, document.body)
}

interface PromptOptions {
  msg: String
  title: String
  confirmButtonText: String
  cancelButtonText: String
  onCancel: () => void
  onConfirm: () => void
}

let temp
function prompt(options: PromptOptions) {
  temp = ''
  if (dialog && dialog.parentNode) dialog.parentNode.removeChild(dialog)
  dialog = render(<o-dialog css={promptCss} title={options.title} visible>
    <div style="margin: 10px 0;">{options.msg}</div>
    <o-input oninput={(evt) => {
      temp = evt.detail
    }} block style="margin-bottom:10px;"></o-input>
    <span slot="footer" class="dialog-footer">
      <o-button style="margin-right:10px;" onclick={_ => {
        dialog.close()
        options.onCancel()
      }} plain size="small">{options.cancelButtonText}</o-button>
      <o-button onclick={_ => {
        dialog.close()
        options.onConfirm(temp)
      }} type="primary" size="small">{options.confirmButtonText}</o-button>
    </span>
  </ o-dialog>, document.body)

  document.querySelector('o-input').focus()

}





if (typeof window !== 'undefined') {

  if (typeof window.Omiu !== 'undefined') {
    window.Omiu.alert = alert
    window.Omiu.confirm = confirm
    window.Omiu.confirm = prompt
  } else {
    window.Omiu = {
      alert,
      confirm,
      prompt
    }
  }

}
