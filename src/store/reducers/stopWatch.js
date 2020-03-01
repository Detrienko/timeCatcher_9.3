import * as actionTypes from '../actions/actionsTypes';

const initialState = {
	stopWatches: [
		{
			stopWatchIsShown: true,
		    currentStopwatchTime: {
				hours: '00',
				minutes: '00',
				seconds: '00',
				centiseconds: '00'
			},
			timerTime: 0,
			timerStart: 0,
			timerOn: false,
			timerId: 0,
			businessId: 0 
		}
	]
}

const reducer = (state=initialState, action) => {

	switch(action.type){
		case actionTypes.SAVE_CURRENT_STOPWATCH_TIME:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

				newStopWatches[index].currentStopwatchTime = {...action.time};
				newStopWatches[index].timerTime = action.timerTime;

				let newState = {
	  				stopWatches: newStopWatches
	  			}

				return newState;
			}

		case actionTypes.CLEAR_CURRENT_STOPWATCH_TIME:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

				newStopWatches[index].currentStopwatchTime = {
					hours: '00',
					minutes: '00',
					seconds: '00',
					centiseconds: '00'
				}
				newStopWatches[index].timerTime = 0;

				let newState = {
	  				stopWatches: newStopWatches
	  			}
	  			
				return newState;
			}

		case actionTypes.SAVE_TIMER_ID:
			{

				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

	      		newStopWatches[index].timerId = action.timerId;

				let newState = {
					stopWatches: newStopWatches
				}

				return newState;
			}	

		case actionTypes.UPDATE_STOPWATCH:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

				let stopWatchData = action.stopWatchData;

	  			if(stopWatchData.timerOn!==undefined){
	      			newStopWatches[index].timerOn = stopWatchData.timerOn;
	      		}
	      		if(stopWatchData.timerStart!==undefined){
	      			newStopWatches[index].timerStart = stopWatchData.timerStart;
	      		}
	      		if(stopWatchData.timerTime!==undefined){
	      			newStopWatches[index].timerTime = stopWatchData.timerTime;
	      		}

	  			let centiseconds = ("0" + (Math.floor(newStopWatches[index].timerTime / 10)% 100)).slice(-2);
	  			let seconds = ("0" + (Math.floor(newStopWatches[index].timerTime / 1000) % 60)).slice(-2);
	  			let minutes = ("0" + (Math.floor(newStopWatches[index].timerTime / 60000) % 60)).slice(-2);
	  			let hours = ("0" + Math.floor(newStopWatches[index].timerTime / 3600000)).slice(-2);
				
	  			newStopWatches[index].currentStopwatchTime.centiseconds = centiseconds;
	  			newStopWatches[index].currentStopwatchTime.seconds = seconds;
	  			newStopWatches[index].currentStopwatchTime.minutes = minutes;
	  			newStopWatches[index].currentStopwatchTime.hours = hours;

	  			let newState = {
	  				stopWatches: newStopWatches
	  			}

				return newState;
					
			}

		case actionTypes.CLEAR_STOPWATCH:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

	      		newStopWatches[index].timerStart = action.timerStart = 0;
	      		newStopWatches[index].timerTime = action.timerTime = 0;

	      		newStopWatches[index].currentStopwatchTime.centiseconds = '00';
	      		newStopWatches[index].currentStopwatchTime.seconds = '00';
	      		newStopWatches[index].currentStopwatchTime.minutes = '00';
	      		newStopWatches[index].currentStopwatchTime.hours = '00';

				let newState = {
	  				stopWatches: newStopWatches
	  			}
	  			
				return newState;
			}

		default:
			return state; 
	}

}

export default reducer;