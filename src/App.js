import React, {Component} from 'react';
import './App.css';

import { connect } from 'react-redux';

//Components:
import Layout from './components/Layout/Layout';
import BusinessList from './components/BusinessList/BusinessList';

//Containers:
import MainDisplay from './containers/MainDisplay/MainDisplay';
import Stopwatch from './containers/Stopwatch/Stopwatch';

import authActions from './store/actions/auth';

class App extends Component {

	componentDidMount(){
		this.props.onTryAutoSign();
	}

	render(){
	  return ( 
		    <Layout>
		    	<BusinessList/>
		    	<MainDisplay/>
		    </Layout>
	  );
	}
}

	const mapDispatchToProps = dispatch => {
		return{
			onTryAutoSign: () => dispatch(authActions.authCheckState())
		}
	}

export default connect(null, mapDispatchToProps)(App);
