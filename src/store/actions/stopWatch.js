import * as actionTypes from './actionsTypes';

export const saveCurrentStopwatchTime = (time, id, timerTime) => {
	return{
		type: actionTypes.SAVE_CURRENT_STOPWATCH_TIME,
		time: time,
		id: id,
		timerTime: timerTime
	}
}

export const clearCurrentStopwatchTime = (id) => {
	return{
		type: actionTypes.CLEAR_CURRENT_STOPWATCH_TIME,
		id: id	
	}
}

export const updateStopwatch = (stopWatchData, id) => {
	return{
		type: actionTypes.UPDATE_STOPWATCH,
		stopWatchData: stopWatchData, 
		id: id
	}
}

export const clearStopwatch = (id) => {
	return{
		type: actionTypes.CLEAR_STOPWATCH,
		id: id
	}
}

export const saveTimerId = (timerId, id) => {
	return{
		type: actionTypes.SAVE_TIMER_ID,
		timerId: timerId, 
		id: id
	}
}