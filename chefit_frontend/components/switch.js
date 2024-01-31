import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';

const SwitchToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#47A695" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 24
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SwitchToggle;