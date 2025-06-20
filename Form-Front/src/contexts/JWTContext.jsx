import React from "react";
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
// import CryptoJS from 'crypto-js';
// import {jwtDecode} from 'jwt-decode';
import axios, { fetcherPostFormData } from '../utils/axios';
import authReducer from './auth-reducer/auth';
import { LOGIN, LOGOUT } from './auth-reducer/actions';
import { useSnackbar } from '../utils/SnackbarProvider';
import LoaderCommon from '../app/commoncomponents/Loader/LoaderCommon';

const JWT_SECRET = 'JWTSECRET';

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), JWT_SECRET).toString();
};

const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, JWT_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) return false;
    const decoded = jwtDecode(decryptData(serviceToken));
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

const JWTContext = createContext(0);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isInitializing, setIsInitializing] = useState(true);
    const { showSnackbar } = useSnackbar();
    // useEffect(() => {
    //     const init = async () => {
    //         debugger
    //         try {
    //             const serviceToken = localStorage.getItem('serviceToken');
    //             if (serviceToken) {
    //                 console.log("Token is valid");
    //                 setSession(serviceToken);
    //                 const response = await axios.post('/Profile', {});
    //                 const user = response.data.user;
    //                 user.type = response.data?.user?.role;
    //                 dispatch({
    //                     type: LOGIN,
    //                     payload: { isLoggedIn: true, user }
    //                 });
    //             } else {
    //                 dispatch({ type: LOGOUT });
    //             }
    //         } catch (err) {
    //             console.error('err',err);
    //             dispatch({ type: LOGOUT });
    //         } finally {
    //             setIsInitializing(false);
    //         }
    //     };
    useEffect(() => {
    const init = async () => {
      try {
        // ✅ TEMPORARY BYPASS AUTHENTICATION
        const mockUser = {
          name: "Admin User",
          role: 0, // this role should match your AuthGuard's allowedRoles
        };

        dispatch({
          type: LOGIN,
          payload: { isLoggedIn: true, user: mockUser },
        });

        // You can also fake a token and set it:
        // setSession("mock-token");

      } catch (err) {
        console.error("err", err);
        dispatch({ type: LOGOUT });
      } finally {
        setIsInitializing(false);
      }
    };

        init();
    }, []);

    const login = async (email, password) => {
        let apiRoute = '/login';
        try {
            const response = await axios.post(apiRoute, { email, password });
            const serviceToken = response.data?.token;
            const user = response.data.user;
            user.type = response.data?.user?.role;
            setSession(serviceToken);
            dispatch({
                type: LOGIN,
                payload: { isLoggedIn: true, user }
            });
            showSnackbar(response.data.message, 'success')
        } catch (err) {
            showSnackbar(err.message, 'error')
            // console.error(err);
        }
    };



    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    if (isInitializing) {
        // Return a loader or placeholder if needed
        return <LoaderCommon/>; // Replace with a proper loader component if available
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
