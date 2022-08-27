/*
WELCOME TO MY TINY TASK MANAGER
This is the main app component, comprising functions:
1. refreshTasks - gets the list of tasks from API 
2. taskSplice - remove archived task in state after removing it from database 
3. taskReplace - updates a task in state after updating it in database 
4. handleChangeStatus - on changing individual task status  
5. handleDeleteTask - on clciking "archive" button 
6. setCheckedTasks - update the list of checked items in state (for bulk update)
7. Trigger the task update modal to show or hide
8. Set the individual task we want to endit in state 
9. handleFilterChange - set current filter in state
10. handleBulkUpdate - request bulk update from API
11. And Finally, render the app and child components
*/
import { Component } from "react";
import logo from "./logo.svg";
import ToolBar from "./Components/ToolBar";
import NewTaskForm from "./Components/NewTaskForm";
import TaskList from "./Components/TaskList";
import TaskModal from "./Components/TaskModal";
import {
  tasksFetch,
  taskDelete,
  taskUpdate,
  bulkTasksUpdate,
} from "./utils/APICalls";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loaded: false,
      error: null,
      filter: "",
      selectedItems: [],
      editItem: { description: "", location: "", priority: "" },
      showModal: false
    };
    this.refreshTasks = this.refreshTasks.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleBulkUpdate = this.handleBulkUpdate.bind(this);
    this.setCheckedTasks = this.setCheckedTasks.bind(this);
    this.showModalHandler = this.showModalHandler.bind(this);
    this.setEditItem = this.setEditItem.bind(this);
  }

  componentDidMount() {
    this.refreshTasks();
  }

  /* 1. refreshTasks - gets the list of tasks from API  */
  refreshTasks(status = null) {
    tasksFetch(status).then((result) => {
      if (result.message) {
        this.setState({ error: result.message, loaded: true });
      } else {
        //got data - update the list
        this.setState({ data: result.data, loaded: true });
      }
    });
  }

  /*2. taskSplice - remove archived task in state after removing it from database   */
  taskSplice(id) {
    let tasks = [...this.state.data];

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i]._id === id) {
        tasks.splice(i, 1);
        break;
      }
    }

    this.setState({ data: tasks });
  }

  /*3. taskReplace - updates a task in state after updating it in database */
  taskReplace(id, data) {
    let tasks = [...this.state.data];
    const taskIndex = tasks.findIndex((task) => task._id === id);
    tasks[taskIndex] = data;
    this.setState({ data: tasks }, console.log(this.state));
  }

  /* 4. handleChangeStatus - on changing individual task status  */

  handleChangeStatus(id, status) {
    //send Put request
    //if all good update task in state

    taskUpdate(id, { status: status }).then((result) => {
      if (result.message) {
        this.setState({ error: result.message });
      } else {
        // if we get a document returned, all went well
        // now replace that task in state with task returned
        if (result.data) {
          this.taskReplace(id, result.data);
        } else {
          this.setState({ error: "Something may have gone wrong" });
        }
      }
    });
  }

 /* 5. handleDeleteTask - on clicking "archive" button */
  handleDeleteTask(id) {
    //send delete request
    //splice task from state? or reload... hmmm
    //otherwise throw error

    taskDelete(id).then((result) => {
      if (result.message) {
        this.setState({ error: result.message });
      } else {
        // if 1 document was archived, all went well
        // now modify task list already in state
        if (result.archived === 1) {
          this.taskSplice(id);
        } else {
          this.setState({ error: "Something may have gone wrong" });
        }
      }
    });
  }

 /* 6. setCheckedTasks - update the list of checked items in state (for bulk update) */  
  setCheckedTasks(list) {
    this.setState({ selectedItems: list });
  }

 /* 7. changing showModal to true will trigger the task update
       modal to pop up.
       Setting it to false will close the task modal 
 */  
  showModalHandler(bool){
    this.setState({ showModal: bool });
  }

 /* 8. Update the task that is currently up for editing.
       Then show the Task editing Modal 
 */    
  setEditItem (task) {
    this.setState(
      { editItem: task,
      showModal: true }
      );
  }

 /* 9. handleFilterChange - set current filter in state */    
  handleFilterChange(status) {
    //check that filter really is different to last time
    if (this.state.filter.value !== status) {
      const filter = status === "" ? null : status;
      this.refreshTasks(filter);
      this.setState({ filter: status });
    }
  }

 /* 10. handleBulkUpdate - request bulk update from API  */   
  handleBulkUpdate(status) {
    bulkTasksUpdate({ _ids: this.state.selectedItems, status: status }).then(
      (result) => {
        if (result.message) {
          this.setState({ error: result.message });
        } else {
          //need to get all data back
          if (result.message) {
            this.setState({ error: result.message });
          } else {
            this.setState({ data: result.data, selectedItems: [] });
          }
        }
      }
    );
  }

   /* 11. And Finally, render child components */   
  render() {
    if (this.state.loaded === false) {
      return <p>Loading</p>;
    }
    if (this.state.error != null) {
      return <p>Something went wrong</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>My Tiny Task Manager</h1>
        </header>

        <main>
          <ToolBar
            filterChangeHander={this.handleFilterChange}
            bulkUpdateHandler={this.handleBulkUpdate}
          />
          <TaskList
            tasks={this.state.data}
            deleteHandler={this.handleDeleteTask}
            showModalHandler={this.showModalHandler}
            setEditItem={this.setEditItem}
            statusChangeHandler={this.handleChangeStatus}
            selectedItems={this.state.selectedItems}
            setCheckedTasks={this.setCheckedTasks}
          />
          <NewTaskForm refreshTasks={this.refreshTasks} />

          <TaskModal show={this.state.showModal} task={this.state.editItem} refreshTasks={this.refreshTasks} showModalHandler={this.showModalHandler}/>
        </main>

        <footer>
          <p>
            &copy; 2022. Created by Katherine Van As at the HyperionDev school.
          </p>
        </footer>
      </div>
    );
  }
}
export default App;
