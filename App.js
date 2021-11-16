import './App.css';
import { useReducer } from 'react';

const initialState = {
  firstName: {
    value: '',
    error: null,
  },
  lastName: {
    value: '',
    error: null,
  },
  email: {
    value: '',
    error: null,
  },
  password: {
    value: '',
    error: null,
  },
  termsAccepted: false,
};

function reducer(state, action) {
  return { ...state, [action.input]: action.value };
}

function validateState(state) {
  return (
    state.password === state.passwordRepeat &&
    state.termsAccepted &&
    state.password.length > 3 &&
    state.firstName.length >= 3 &&
    state.lastName.length >= 3
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  function handleClick(e) {
    e.preventDefault();
    alert(
      `Hey ${state.firstName} ${state.lastName} you have successfully registered!`,
    );
  }

  function onChange(e) {
    const { name, value, checked } = e.target;
    const action = {
      input: name,
      value: name === 'termsAccepted' ? checked : value,
    };
    dispatch(action);
  }

  return (
    <div className='App'>
      <div className='RegisterFromContainer'>
        <h2 className='RegisterContainerHeadline'>Register</h2>
        <form className='RegisterForm'>
          <input
            type='text'
            className='TextInput'
            name='firstName'
            placeholder='First Name (at least 3 characters)'
            onChange={onChange}
          />
          <input
            type='text'
            className='TextInput'
            name='lastName'
            placeholder='Last Name (at least 3 characters)'
            onChange={onChange}
          />
          <input
            type='text'
            className='TextInput'
            name='email'
            id='email'
            placeholder='Email'
            onChange={onChange}
          />

          <input
            type='password'
            className='TextInput'
            name='password'
            placeholder='Password (at least 4 characters)'
            onChange={onChange}
          />
          <input
            type='password'
            className='TextInput'
            name='passwordRepeat'
            placeholder='Confirm Password'
            onChange={onChange}
          />
          <label className='TouCheckBoxLabel'>
            <input
              type='checkbox'
              className='TouCheckBox'
              name='termsAccepted'
              onChange={onChange}
            />
            Accept Terms of Use!
          </label>
          <button
            disabled={!validateState(state)}
            onClick={handleClick}
            className={!validateState(state) ? 'Disabled' : null}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
