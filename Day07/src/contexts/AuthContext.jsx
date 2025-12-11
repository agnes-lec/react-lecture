import {createContext, useState, useContext, useEffect, useMemo, useCallback} from "react";
import {login as loginApi, signup as signupApi} from "../utils/api";

const AuthContext = createContext(null);

export function AutoProvider({children}) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }

    }, []);
    
    const login = useCallback(async (email, password) => {
        try {
            const response = await loginApi({email, password});

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({
                userId: response.userId,
                email: response.email, 
                name: response.name, 
            })); 
            setUser({
                userId: response.userId,
                email: response.email, 
                name: response.name, 
            });
            setIsAuthenticated(true);
            return{ success : true, data:response}
        } catch (error) {
            return { success : false, 
                message : error.message || '로그인 실패'
            }
        }
    }, []);

    const signup = useCallback(async (email, name, password) =>{
        console.log(email, name, password)
        const response = await signupApi({email, name, password});

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
            userId: response.userId,
            email: response.email, 
            name: response.name, 
        }))
        setUser({
            userId: response.userId,
            email: response.email, 
            name: response.name, 
        }
        )
        setIsAuthenticated(true)
        return {success:true, data:response}

    }, []) 

    const logout = useCallback(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null)
        setIsAuthenticated(false)
    }, []);

    const value = useMemo(() =>({
        user, 
        isAuthenticated,
        loading, 
        login, 
        signup, 
        logout,
    }), [user, isAuthenticated, loading, login, signup, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('userAuth는 AuthProvider 자식 컴포넌트에서만 사용할 수 있습니다.')
    }
    return context

}


// const { user, isAuthenticated, login, logout } = useAuth();
