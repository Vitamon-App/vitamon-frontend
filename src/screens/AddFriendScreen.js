import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import { connect } from "react-redux";
import { findUser } from '../store/user'
import { SearchBar } from 'react-native-elements'

class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        state = {
            term: '',
            // results: []
      };
    }

    componentDidMount() {

    }

    onTermChange = term => {
        this.setState({term})
    }

    onTermSubmit = async () => {
        const term = this.state.term;
        await this.props.findFriends(email)
    }


    // console.log("RESULTS", results)
    // console.log("PROPS", props)
    // const search = (term) => {
    //     const res = findUser(term)
    //     setResults(res)
    // }
    render() {
       
        const term = this.props.term || ''
        // const results = this.props.results || []
        console.log("PROPS", this.state.term)
    return (
        <View style={styles.mainBackground}>
            <SearchBar 
            term={term}
            onTermChange={this.onTermChange}
            onTermSubmit={this.onTermSubmit}

            // onTermSubmit={(term) => setResults(findFriends(term))}
            />
            <Text>Search for a friend by email</Text>
            <Text>Found {this.props.results} friends with that email</Text>
            <Text>{this.props.term}</Text>

        </View>
    )
    }
}

const styles = StyleSheet.create({
    mainBackground: {
        backgroundColor: 'white'
    }
})

const mapState = (state) => {
    return {
      user: state.user,
      term: state.term,
      results: state.results
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      findFriends: (email) => {
        dispatch(findUser(email));
      },
    };
  };

export default connect(mapState, mapDispatch)(SearchScreen);


