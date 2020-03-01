import React, { Component } from 'react';
import classes from './settingsModal.module.css';

import { connect } from 'react-redux';
import * as businessBuilderActions from '../../store/actions/businessBuilder';

class SettingsModal extends Component {

	state={

	}

	deleteHandler = () => {
		this.props.deleteBusiness(this.props.businessData.id);
    document.getElementById('popUpContainer').style.display="none";
    document.getElementById('settingsModal').style.opacity='1';
    document.getElementById('formCover2').style.display="none";
	}

	showRemovePopUp = () => {
    document.getElementById('formCover2').style.display="block";
    document.getElementById('popUpContainer').style.display="flex";
    document.getElementById('settingsModal').style.opacity='.050';

	}

	hideRemovePopUp = () => {
		document.getElementById('popUpContainer').style.display="none";
    document.getElementById('settingsModal').style.opacity='1';
    document.getElementById('formCover2').style.display="none";

	}


	render(){

	let popUpMessage = (
			
      <div id="popUpContainer" className={classes.popUpContainer}>
				<p className={classes.popUpContainer_message}>Are you sure you want to delete this business?</p>
        <p className={classes.popUpContainer_message_description}>You will not able to restore your business</p>
        <div className={classes.yesNoWrapper}>
        <span onClick={this.deleteHandler} className={classes.yesBtn}>YES</span>
				<span onClick={this.hideRemovePopUp} className={classes.noBtn}>NO</span>
        </div>
      </div>
  )		

	return(
      <div>
        <div id="settingsModal" className={classes.settingsModal}>
        	<h2 className={classes.settingsTitle}>Settings</h2>
        	<div className={classes.settingsFields}>
        	<span>Title: </span>
          <input type="text" value="English"/><br/>
        	<span>GOAL: </span>
          <input type="number"/><br/>
        	<span>Dayly Goal: </span>
          <input type="number"/><br/>
        	<span>Weekly Goal: </span>
          <input type="number"/><br/>
        	<span>Monthly Goal: </span>
          <input type="number"/><br/>
        	</div>
        	<button className={classes.deleteBtn} onClick={this.showRemovePopUp}>Delete this business</button><br/>
          <button className={classes.saveBtn}>Save</button>
        </div>
        {popUpMessage}
        </div>
		)
	}

}

  const mapStateToProps = state => {
    return {
      business: state.businessList.business,
    }
  }

const mapDispatchToProps = dispatch => {
    return{
      deleteBusiness: (id) => dispatch(businessBuilderActions.deleteBusiness(id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);