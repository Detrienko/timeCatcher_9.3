import React, { Component } from 'react';
import classes from './SignUpForm.module.css';
import {connect} from 'react-redux';
import * as fetchingDataActions from '../../../store/actions/businessBuilder';

class SignUpForm extends Component {

  state = {
    email: '',
    password: '',
    repeatPassword: '',
    errMsg: ''
  }

  signUpHandler = () => {

    let fieldsISCorrect = false;
    let errorMessage = '';
    let id = null;

    if(this.state.password!==this.state.repeatPassword){
      errorMessage = 'Passwords do not match'
      fieldsISCorrect = false;
      this.setState({errMsg: errorMessage})
      return false;
    }
    
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
        id = firebase.auth().currentUser.uid;
      firebase.firestore().collection("Users").doc(id).set({
        businesses: {}
      })
      fieldsISCorrect = true;
    }).catch((error)=>{
      errorMessage = error.message;
    }).then(()=>{
      if(!fieldsISCorrect){
        this.setState({errMsg: errorMessage})
        return false;
      }
    }).then(()=>{
    if(fieldsISCorrect){
      this.props.hideModal();
      return dispatch => {
          dispatch(fetchingDataActions.fetchBusinessDataBegin(id))
      }
    }

    })


  }

  emailHandler = (e) => {
    this.setState({email: e.target.value})
  }

  passwordHandler = (e, whichPassword) => {
    if(whichPassword=='first'){
      this.setState({password: e.target.value})
    }
    else if(whichPassword=='second'){
      this.setState({repeatPassword: e.target.value})
    }
  }

  render(){

    let errMsg = null;

    if(this.state.errMsg){
      errMsg = <p className={classes.errMsg}>{this.state.errMsg}</p>
    }

    return(
      <div>
        <div className={classes.formWrapper}>
          <div className={classes.firstHalf}>
            <h2 className={classes.SignUpFormTitle}>Sign Up</h2>
            <p className={classes.description}>With your account you can save your work time.</p>
            <p className={classes.description}>Get yourself one.</p>
            <span className={classes.logo}>LOGO</span>
          </div>
          <div className={classes.secondHalf}>
            <form>
              <label>E-MAIL</label><br/>
              <input onChange={(e)=>this.emailHandler(e)} type="text"/><br/>
              <label>PASSWORD</label><br/>
              <input onChange={(e)=>this.passwordHandler(e, 'first')} type="password"/><br/>
              <label>REPEAT PASSWORD</label><br/>
              <input onChange={(e)=>this.passwordHandler(e, 'second')} type="password"/><br/>
              {errMsg}
              <button onClick={this.signUpHandler} className={classes.btnSignUp} type="submit">Sign Up</button> or
              <a href="#" onClick={this.props.showSignInModal} className={classes.logInLink}> Log In</a>
            </form>
          </div>
        </div>
        <div 
          id='formCover'
          className={classes.formCover}
          onClick={this.props.hideModal}>
        </div>
      </div>
      )
  }

}



export default connect()(SignUpForm);
