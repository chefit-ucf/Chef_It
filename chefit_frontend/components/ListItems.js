import React from 'react'
import { ListItem } from '@rneui/themed';

export default function ListItems({title, list}) {
  const [expanded, onExpanded] = React.useState(false);

  return <ListItem.Accordion
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
}
