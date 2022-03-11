import AsyncStorage from '@react-native-async-storage/async-storage';
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCdSBYIB0Z39QaDy8JHBg6dR9cZMrDF8sk
// AIzaSyCdSBYIB0Z39QaDy8JHBg6dR9cZMrDF8sk

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
// export const AUTHENTICATE = 'AUTHENTICATE';
// export const LOGOUT = 'LOGOUT';
// let timer;
// export const authenticate = (userId, token,expiryTime) => {
//   return dispatch => {
//     dispatch(setLogoutTimer(expiryTime));
//     dispatch( {type: AUTHENTICATE, userId: userId,token: token});
//   };

// };
// export const signup = (email, password) => {
//   return async dispatch => {
//     const response = await fetch(
//       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdSBYIB0Z39QaDy8JHBg6dR9cZMrDF8sk',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true
//         })
//       }
//     );

//     if (!response.ok) {
//       const errorResData = await response.json();
//       const errorId = errorResData.error.message;
//       let message = 'something went wrong';
//       if(errorId === 'EMAIL_EXISTS'){
//         message = "email already exists";
//       }
//       throw new Error(message);
//     }

//     const resData = await response.json();
//     console.log(resData);
//     dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn) * 1000));
//     const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
//     saveDataToStorage(resData.idToken, resData.localId,expirationDate);
//   };
// };



// export const login = (email, password) => {
//     return async dispatch => {
//       const response = await fetch(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdSBYIB0Z39QaDy8JHBg6dR9cZMrDF8sk',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password,
//             returnSecureToken: true
//           })
//         }
//       );
  
//       if (!response.ok) {
//         if (!response.ok) {
//           const errorResData = await response.json();
//           const errorId = errorResData.error.message;
//           let message = "something went wrong";
//           if(errorId === "EMAIL_NOT_FOUND"){
//             message = "this email could not be found!";
//           }else if(errorId === "INVALID_PASSWORD") {
//             message = "This pssword is invalid";
//           }
//           throw new Error(message);
//         }
//       }
  
//       const resData = await response.json();
//       console.log(resData);
//       dispatch({ type: LOGIN,token: resData.idToken, userId: resData.localId });
//      const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
//       saveDataToStorage(resData.idToken, resData.localId,expirationDate);
//     };
//   };

//   export const logout = () => {
//     clearLogoutTimer();
//     AsyncStorage.removeItem('userData');
//     return {type: LOGOUT};
//   };
//   const clearLogoutTimer = () => {
// if(timer) {
//   clearTimeout(timer);
// }
//   };
//   const setLogoutTimer = expirationTime => {
//     return dispatch => {
//      timer =  setTimeout(() => {
//         dispatch(logout());
//       }, expirationTime);
//     };
//   };

//   const saveDataToStorage = (token,userId) => {
//     AsyncStorage.setItem(
// 'userData',
// JSON.stringify({
//   token: token,
//   userID: userID,
//   expiryDate: expirationDate.toISOString()
// })
//     );
//   }
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdSBYIB0Z39QaDy8JHBg6dR9cZMrDF8sk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdSBYIB0Z39QaDy8JHBg6dR9cZMrDF8sk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
