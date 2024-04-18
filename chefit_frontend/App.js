import React from 'react'
import Auth from "./screens/Auth.js"
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Auth></Auth>
  );
}
