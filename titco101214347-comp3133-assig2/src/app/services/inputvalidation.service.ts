import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputvalidationService {

  constructor() { }

  validStringInput(userInput: String) {
    let rgx_name = new RegExp(/^[a-zA-Z]{2,}([ \-]{0,1}[a-zA-Z]{2,})*$/)
    if(userInput == '' || userInput == null){
      return false
    }
    else if (userInput.match(rgx_name) == null) {
      return false
    }
    else {
      return true
    }
  }

  validPassword(pwInput: String) {
    let rgx_password = new RegExp(/^[a-zA-Z\d!@$^()-_=+]{8,15}$/)
    if(pwInput == '' || pwInput == null){
      return false
    }
    else if (pwInput.match(rgx_password) == null) {
      return false
    }
    else {
      return true
    }
  }

  validEmail(emailInput: String) {
    let rgx_email = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    if(emailInput == '' || emailInput == null){
      return false
    }
    else if (emailInput.match(rgx_email) == null) {
      return false
    }
    else {
      return true
    }
  }
}
