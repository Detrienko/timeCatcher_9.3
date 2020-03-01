import React, { Component } from 'react';
import classes from './SignInForm.module.css';
import * as fetchingDataActions from '../../../store/actions/businessBuilder';
import * as authActions from '../../../store/actions/auth';
import { connect } from 'react-redux';

class SignInForm extends Component {

  state = {
    email: '',
    password: '',
    errMsg: ''
  }

  emailHandler = (e) => {
    this.setState({email: e.target.value})
  }

  passwordHandler = (e) => {
    this.setState({password: e.target.value})
  }

  signInHandler = () => {
    let hideModal = this.props.hideModal;
    let err = null;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
        err = error;
    }).then(()=>{
      if(err){
        this.setState({errMsg: err.message});
      }
    }).then(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        let uid = user.uid;
        hideModal();
          return dispatch => {
            dispatch(fetchingDataActions.fetchBusinessDataBegin(uid))
          }
        }
      })
    })
  }

  render(){
    let err = null;
    if(this.state.errMsg){
      err = <p className={classes.errorMsg}>{this.state.errMsg}</p>
    }

    return(
      <div>
        <div className={classes.formWrapper}>
          <div className={classes.firstHalf}>
            <h2 className={classes.SignInFormTitle}>Sign In</h2>
            <p className={classes.description}>With your account you can save your work time.</p>
            <p className={classes.description}>Get yourself one.</p>
            <span className={classes.logo}>LOGO</span>
          </div>
          <div className={classes.secondHalf}>
            <form>
              <label>E-MAIL</label><br/>
              <input onChange={(e)=>this.emailHandler(e)} type="text"/><br/>
              <label>PASSWORD</label><br/>
              <input onChange={(e)=>this.passwordHandler(e)} type="password"/><br/>
              {err}
              <button onClick={this.signInHandler} className={classes.btnSignIn} type="submit">Log In</button> or
              <a href="#" onClick={this.props.showSignUpModal} className={classes.signUpLink}> Sign Up</a>
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

  const mapDispatchToProps = dispatch => {
    return {
      auth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp))
    }
  }


export default connect(null, mapDispatchToProps)(SignInForm);
