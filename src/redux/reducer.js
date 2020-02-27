const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    dispatch(setIsAuthenticated(localStorage.getItem('isAuthenticated')));
    console.log('xdxdx')
    
    callLoginApi(email, password,  error => {
      dispatch(setLoginPending(false));
      let success = false
      if (!error) {
        success = true
        dispatch(setLoginSuccess(success));
        dispatch(setIsAuthenticated(success));
        localStorage.setItem('isAuthenticated', true)
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

function setIsAuthenticated(isAuthenticated) {
  return {
    type: IS_AUTHENTICATED,
    isAuthenticated
  }
}

function callLoginApi(email, password, callback) {
    if (email === 'niko.afv@gmail.com' && password === 'keiron-user') {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
}

export default function reducer(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  isAuthenticated: localStorage.getItem('isAuthenticated')
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });
    
    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });
    
    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });
  
    case IS_AUTHENTICATED:
      console.log('hola')
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      });
    
    default:
      return state;
  }
}