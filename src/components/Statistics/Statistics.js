import React from 'react';
import classes from './Statistics.module.css';

	const Statistics = (props) =>{

		return(
			<div className={classes.statisticsWrapper}>
				// <h3>Your Statistics</h3>
				// <p>Total: {props.businessData.totalHours.hours}h{props.businessData.totalHours.minutes}m</p>
				// <p>// Today: 0/{props.businessData.daylyGoal.hours}h{props.businessData.daylyGoal.minutes}m</p>
				// <p>// This week: 0/{props.businessData.weeklyGoal.hours}h{props.businessData.weeklyGoal.minutes}m</p>
			</div>
			)	
	}

	export default Statistics;
