import { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    const styles = getStyles(props.mode);

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    };

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Foundation
                    name="target"
                    style={styles.image}
                    size={100}
                    color={props.mode.OPPOSITE}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your goal..."
                    placeholderTextColor={props.mode.PLACEHOLDER}
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Add Goal" onPress={addGoalHandler} color={props.mode.TERTIARY} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.onCancel} color={props.mode.CANCEL} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GoalInput;

const getStyles = (mode) => StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: mode.PRIMARY,
    },
    image: {
        margin: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: mode.SECONDARY,
        backgroundColor: mode.SECONDARY,
        color: mode.OPPOSITE,
        borderRadius: 6,
        width: '100%',
        padding: 16,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    button: {
        width: '30%',
        marginHorizontal: 8,
    },
});