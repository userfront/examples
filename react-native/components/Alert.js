import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

// Define the alert component
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return <Text></Text>;
    return (
      <View>
        <Text style={styles.paragraph}>{this.props.message}</Text>
      </View>
    );
  }
}

export default Alert;

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
    fontSize: 14,
    color: "red",
  },
});
