import * as actionTypes from '../actions/actionsTypes';
import firebase from '../../config/fbConfig';


const initialState = {
	business: [
		{	
			id: 0,
			title: 'Test business',
			totalHours: {
      		  hours: 0,
      		  minutes: 0
      		},
			goalHours: 10000,
      		daylyGoal: {
      		  hours: 2,
      		  minutes: 0
      		},			
      		weeklyGoal: {
      		  hours: 14,
      		  minutes: 0
      		},
      		monthlyGoal:{
      			hours: 56,
      			minutes: 0
      		},
			description: 'It\'s a test bussiness.',
			progress: 0, // percent
			isShown: true,



			// COUNTDOWN
			// countDownIsShown: false,
			// currentCountdownTime: {
   //      		hours: '00',
   //      		minutes: '00',
   //      		seconds: '00',
   //   		},
   //    		timerTimeCountDown: 0,

   //    		currentMiniStopwatchTime: {
			// 	hours: '00',
			// 	minutes: '00',
			// 	seconds: '00'
			// },
			// miniTimerTime: 0
		},
	],
	loading: false,
	error: null	
}

const reducer = (state=initialState, action) => {

	switch(action.type){

		case actionTypes.ADD_BUSINESS:
			let newState = Object.assign({}, state);

			for(let i = 0; i < newState.business.length; i++){
				newState.business[i].isShown = false;
			}	
			newState.business.push(action.data);
			
			let newBusinessData = {
				id: action.data.id,
				title: action.data.title,
				totalHours: {
      			  hours: action.data.totalHours.hours,
      			  minutes: action.data.totalHours.minutes
      			},
      			description: action.data.description,
				progress: action.data.progress, 
      			goals: {
					goalHours: action.data.goalHours,
      				daylyGoal: {
      				  hours: action.data.daylyGoal.hours,
      				  minutes: action.data.daylyGoal.minutes
      				},			
      				weeklyGoal: {
      				  hours: action.data.weeklyGoal.hours,
      				  minutes: action.data.weeklyGoal.minutes
      				},
      				monthlyGoal:{
      				  hours: action.data.monthlyGoal.hours,
      				  minutes: action.data.monthlyGoal.minutes
      				},
      			},
			}

			firebase.auth().onAuthStateChanged(function(user) {
			 if (user) {
			 	let userDataRef = firebase.firestore().collection("Users").doc(user.uid);
			 	userDataRef.get().then(function(doc) {
				// let idOfBusinesses = Object.keys(doc.data().businesses);
			 		let oldBusinesses = doc.data().businesses;
			 		// for(let i = 0; i < idOfBusinesses.length; i++){
			 		// 	oldBusinesses[idOfBusinesses[i]].isShown = false;   	 
			 		// }
						userDataRef.set({
			 				businesses: {
			 					...oldBusinesses,
			 					[action.data.id]: newBusinessData
			 				}
			 			})
			 	})
			 }	
			})

			return newState;

		case actionTypes.SWITCH_BUSINESS_TAB:
			let oldBusiness2 = state.business;
			let index = oldBusiness2.findIndex((el)=>el.id==action.id);

			let newBusiness2 = [...oldBusiness2];
				newBusiness2.forEach((item)=>{
					item.isShown = false;
				})

				newBusiness2[index].isShown = true;
				let newState2 = {
					business: newBusiness2
				}
			return newState2;

		case actionTypes.DELETE_BUSINESS:
		console.log(action.id)
			let newState8 = Object.assign({}, state);
			let index8 = newState8.business.findIndex((el)=>el.id==action.id);
			newState8.business.splice(index8, 1);

			firebase.auth().onAuthStateChanged(function(user) {
			 if (user) {
				let uid = user.uid;
				let userRef = firebase.firestore().collection('Users').doc(uid);
				userRef.update({
    				[action.id]: firebase.firestore.FieldValue.delete()
				});
			 }
			})

			return newState8;

		case actionTypes.ADD_WORKING_HOURS:
			let newBusiness9 = [...state.business];
			let index9 = newBusiness9.findIndex((el)=>el.id==action.id);
			let currentTotalHours = newBusiness9[index9].totalHours;  
			let currentStopWatchTime = newBusiness9[index9].currentStopwatchTime;
			let currentMiniStopwatchTime = newBusiness9[index9].currentMiniStopwatchTime;
			let currentCountdownTime = newBusiness9[index9].currentCountdownTime;;

			if(newBusiness9[index9].timerOn && newBusiness9[index9].timerTime>59999){
				alert('Would you like to stop timer and add your hours?')
			}
			if(newBusiness9[index9].timerOn && newBusiness9[index9].timerTime<60000){
				alert('Work at least 1 minute');
			}

			if(!newBusiness9[index9].timerOn){
				if(newBusiness9[index9].stopWatchIsShown){
					if(newBusiness9[index9].timerTime<60000){
						alert('Work at least 1 minute!');
						return state;
					}
					newBusiness9[index9].totalHours.hours = parseInt(currentTotalHours.hours, 10) + parseInt(currentStopWatchTime.hours, 10);
					newBusiness9[index9].totalHours.minutes = parseInt(currentTotalHours.minutes, 10) + parseInt(currentStopWatchTime.minutes, 10);
					if(newBusiness9[index9].totalHours.minutes>59){
						let restMinutes = newBusiness9[index9].totalHours.minutes - 60;
						newBusiness9[index9].totalHours.minutes=restMinutes;
						newBusiness9[index9].totalHours.hours +=1;
					}			
				}
			}

				currentStopWatchTime.hours = '00';
				currentStopWatchTime.minutes = '00';
				currentStopWatchTime.seconds = '00';
				currentStopWatchTime.centiseconds = '00';
				
				// currentCountdownTime.hours = '00';         temporarily removed__________temporarily removed
				// currentCountdownTime.minutes = '00'; 		temporarily removed    temporarily removed
				// currentCountdownTime.seconds = '00';      temporarily removed    temporarily removed

				// currentMiniStopwatchTime.hours = '00';
				// currentMiniStopwatchTime.minutes = '00';
				// currentMiniStopwatchTime.seconds = '00';

				newBusiness9[index9].timerTime = 0;
				newBusiness9[index9].timerTimeCountDown = 0;
				newBusiness9[index9].miniTimerTime = 0;


				// clear both timers:

			let newState9 = {
				business: newBusiness9
			} 

			return newState9	

		case actionTypes.CLEAR_STATE:
				let newState16 = Object.assign({},state);
				newState16 = initialState;	
				return newState16;



		case actionTypes.FETCH_BUSINESSDATA_BEGIN:
			alert('das')
				let newState14 = Object.assign({}, state);
				newState14.loading = true;
				return newState14;

		case actionTypes.FETCH_BUSINESSDATA_SUCCESS:
				alert('from reducer success')
				let newState15 = Object.assign({}, state);				 	
				let idOfBusinesses = Object.keys(action.userBusinesses.businesses);
				let newBusinessDataObj = {};
				newState15.business = [];
				for(let i = 0; i<idOfBusinesses.length; i++){
					let currentBusiness = action.userBusinesses.businesses[idOfBusinesses[i]];	
				newBusinessDataObj = {
					id: idOfBusinesses[i],
					title: currentBusiness.title,
					totalHours: {
      				  hours: currentBusiness.totalHours.hours,
      				  minutes: currentBusiness.totalHours.minutes
      				},
					goalHours: currentBusiness.goals.goalHours,
      				daylyGoal: {
      				  hours: currentBusiness.goals.daylyGoal.hours,
      				  minutes: currentBusiness.goals.daylyGoal.minutes
      				},			
      				weeklyGoal: {
      				  hours: currentBusiness.goals.weeklyGoal.hours,
      				  minutes: currentBusiness.goals.weeklyGoal.minutes
      				},
      				monthlyGoal:{
      					hours: currentBusiness.goals.monthlyGoal.hours,
      					minutes: currentBusiness.goals.monthlyGoal.minutes
      				},
					description: currentBusiness.description,
					progress: currentBusiness.progress,

				isShown: false,
				stopWatchIsShown: false,
					
      				currentStopwatchTime: {
						hours: '00',
						minutes: '00',
						seconds: '00',
						centiseconds: '00'
					},
      				timerTime: 0,
      				timerStart: 0,
      				timerId: null,
      				timerOn: false,
					}						
					newState15.business.push(newBusinessDataObj)
				}

				newState15.business[0].isShown = true;
				newState15.business[0].stopWatchIsShown = true;


				newState15.loading = false;
				return newState15;	

			default:
				return state; 
	}
}

export default reducer;