import React from 'react'
import { ListItem } from '@rneui/themed';
import { View, Pressable, Image, StyleSheet } from 'react-native';

export default function Dropdown() {
  return <View>
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        onExpanded(!expanded);
      }}
    >
      {list.map((l, i) => (
        <ListItem key={i}  bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ListItem.Accordion>
  </View>
}
