import { StyleSheet, View, Text, Pressable } from 'react-native';

function GoalItem(props) {
  const styles = getStyles(props.mode);

  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({pressed}) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const getStyles = (mode) => StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: mode.SECONDARY,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: mode.OPPOSITE,
  },
});