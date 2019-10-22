import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Stitch, AnonymousCredential } from 'mongo-stitch-react-native-sdk';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false,
    };
    this._loadClient = this._loadClient.bind(this);
  }
  componentDidMount() {
    this._loadClient();
  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
           />
      );
    } else {
      return (
        <View style={StyleSheet.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };
  _handleLoadingError = error => {
    console.warn(error);
  };
  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }
  _loadClient()
}