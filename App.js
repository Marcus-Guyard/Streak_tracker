import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Time} from './components/Tasks'

const COLORS = {primary: '#1f145c', white: '#fff'};

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');

  const addTodo = () => {
    const newTodo = {
      id: Math.random(),
      task: textInput,
      completed: false,
      streak: 0,
    };
    setTodos([...todos, newTodo]);
    setTextInput('');
    Keyboard.dismiss();
    
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };


  const markTodoComplete = todoId => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        if (item.completed == false){
        return {...item, completed: true, streak: item.streak + 1};
      }}
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    Alert.alert('Confirm', 'Remove Todo?', [
      {
        text: 'Yes',
        onPress: () => setTodos(newTodosItem),
      },
      {
        text: 'No',
      },
    ]);
    ;
  };


  const resetTodos = () => {
    setTodos( todos.map(item => {
      if(item.completed == false){
        return {...item, streak: 0}
      }
      return {...item, completed: false};
    }))
  }

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Remove All Todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
              marginHorizontal: 10,
            }}>
            {todo?.task}
          </Text>
          
        </View>
            
        
        <View >
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold',}}>{todo.streak} 🔥</Text>
        </View>
        {todo?.completed && (
          <TouchableOpacity onPress={() => {markTodoComplete(todo.id)}}>
            <View style={[styles.actionIcon, {backgroundColor: '#00ff00'}]}>
              <Icon name="done" size={20} color="black" />
            </View>
          </TouchableOpacity>)}
        {!todo?.completed && (
          <TouchableOpacity onPress={() => {markTodoComplete(todo.id)}}>
            <View style={[styles.actionIcon, {backgroundColor: 'red'}]}>
              <Icon name="done" size={20} color="white" fontWeight='bold' />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#212121',
      }}>
        <View>
          <Time newResetTodos={resetTodos}/>
        </View>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
          }}>
          Streak Tracker
        </Text>
        <Icon name="refresh" size={25} color="#00ff00" onPress={resetTodos} />
        <Icon name="delete" size={25} color="red" onPress={clearAllTodos} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput

            value={textInput}
            placeholder="Add Todo"
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="black" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#212121',
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    justifyContent: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#00ff00',
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: '#999999',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ff00',
    marginLeft: 25,
    borderRadius: 5,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default App;