import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  FlatList,
  Button,
} from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import Colors from './utilities/Color';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [currMode, toggleLightDark] = useState(Colors.light);

  const styles = getStyles(currMode);

  function toggleLightDarkHandler() {
    currMode === Colors.light ? toggleLightDark(Colors.dark) : toggleLightDark(Colors.light);
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText !== "") {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() }
      ]);
      endAddGoalHandler();
    }
  };

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style={currMode.STATUS} />
      <View style={styles.appContainer}>
        <View style={styles.lightDarkContainer}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            style={styles.lightDarkItem}
            size={40}
            onPress={toggleLightDarkHandler}
          />
        </View>
        <Button
          title="Add New Goal"
          color={currMode.TERTIARY}
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
          mode={currMode}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                  mode={currMode}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const getStyles = (currMode) => StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: currMode.PRIMARY,
  },
  goalsContainer: {
    flex: 12,
  },
  lightDarkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lightDarkItem: {
    color: currMode.OPPOSITE,
  }
});
