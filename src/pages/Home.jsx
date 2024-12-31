import React, { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import ToDoCard from '../components/ToDoCard';
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../redux/notifySlice'

const Home = () => {
  const [bigPop, setBigPop] = useState(true)
  const [addNew, setAddNew] = useState(false)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const [filterProperties, setFilterProperties] = useState({
    green: true,
    orange: true,
    red: true
  })
  const [formData, setFormData] = useState({
    topic: '',
    notes: '',
    deadline: ''
  })
  const [todos, setTodos] = useState(null)

  const getTodos = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch('/api/user/get-todo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        const data = await res.json()
        if (res.ok) {
          setTodos(data?.todos)
        }
      } catch (error) {
        dispatch(setNotification(error.message))
      }
    } else {
      let todoList = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoList)
    }
  }

  useEffect(() => {
    getTodos()
  }, [isLoggedIn])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoggedIn) {
      const res = await fetch('/api/user/add-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      const data = await res.json()

      if (res.ok) {
        dispatch(setNotification(data.message))
        setFormData({
          topic: '',
          notes: '',
          deadline: ''
        })
        setAddNew(false)
        getTodos()
      } else {
        dispatch(setNotification(data.message))
      }
    } else {
      let todos = localStorage.getItem('todos');
      if (!todos) {
        let todoList = [];
        todoList.push(formData);
        localStorage.setItem('todos', JSON.stringify(todoList));
      } else {
        let todoList = JSON.parse(todos);
        todoList.push(formData);
        localStorage.setItem('todos', JSON.stringify(todoList));
      }
      dispatch(setNotification("Todo Added Locally"))
        setFormData({
          topic: '',
          notes: '',
          deadline: ''
        })
        setAddNew(false)
        getTodos()
    }
  }

  const handleCheckBox = (event) => {
    const { name, checked } = event.target;
    setFilterProperties((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };


  return (
    <>
      <section
        className="homePage"
      >
        <section className="homeHead">
          <h1>All Todos</h1>
          <div className="btn" onClick={() => {
            setAddNew(true)
          }}>Add New</div>
        </section>
        <section className="btnWrapper">
          <label htmlFor="">Red Marked</label>
          <input type="checkbox" name="red" checked={filterProperties.red} value={filterProperties.red.toString()} onChange={handleCheckBox} />
          <hr />
          <label htmlFor="">Yellow Marked</label>
          <input type="checkbox" name="orange" checked={filterProperties.orange} value={filterProperties.orange.toString()} onChange={handleCheckBox} />
          <hr />
          <label htmlFor="">Green Marked</label>
          <input type="checkbox" name="green" checked={filterProperties.green} value={filterProperties.green.toString()} onChange={handleCheckBox} />
        </section>
        <section className="cardWrapper">

          {todos?.length > 0 ? (todos?.map((e, i) => (
            <ToDoCard details={e} key={i} filterProperties = {filterProperties} />
          ))) : (<>
            <p>No Todos added by you!!!!</p>
          </>)}

        </section>
      </section>
      <section
        className={bigPop ? "popup" : "popup2"}
      >
        <section className={bigPop ? 'popupcard' : 'popupcard2'}>
          <div className="line">
            <div className="colBox" style={{ backgroundColor: 'red' }}></div>
            <p>:Less than 24 Hours remaining</p>
          </div>
          <div className="line">
            <div className="colBox" style={{ backgroundColor: 'orange' }}></div>
            <p>:Less than 3 days remaining</p>
          </div>
          <div className="line">
            <div className="colBox" style={{ backgroundColor: 'green' }}></div>
            <p>:More Than 3 Days remaining</p>
          </div>
          {bigPop && <div className="close" onClick={() => {
            setBigPop(false)
          }}>X</div>}
        </section>
      </section>

      {addNew && <section className="newTodo">
        <section className="addCard">
          <h1>Add New Todo</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            />

            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="deadline">Deadline:</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              min={new Date().toISOString().slice(0, 16)}
              onChange={handleChange}
            />


            <input type="submit" value="Create" />
          </form>
          <div className="close" onClick={() => {
            setAddNew(false)
          }}>Close</div>
        </section>
      </section>}
    </>
  );
};

export default Home;
