import React, { createContext, useContext, useReducer, useEffect } from 'react';
import initialData from '../data/data.json';

const CanteenContext = createContext();
const API_URL = 'http://localhost:5000/students'; 

const initialState = {
  snacks: [
    { id: 1, name: 'Cheese Burger', price: 150, ordersCount: 88, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600' },
    { id: 2, name: 'Pepperoni Pizza', price: 250, ordersCount: 120, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600' },
    { id: 3, name: 'Classic Hot-Dog', price: 180, ordersCount: 54, image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=600' }, 
    { id: 4, name: 'Tacos', price: 100, ordersCount: 72, image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600' },
    { id: 5, name: 'Penne Pasta', price: 220, ordersCount: 41, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600' }, 
    { id: 6, name: 'Hakka Noodles', price: 150, ordersCount: 65, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600' },
    { id: 7, name: 'Steamed Momos', price: 200, ordersCount: 95, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600' },
    { id: 8, name: 'Cold Drinks', price: 100, ordersCount: 150, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600' }, 
    { id: 9, name: 'Butter Milk', price: 150, ordersCount: 30, image: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=600' },
    { id: 10, name: 'Potato Chips', price: 100, ordersCount: 200, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600' },
    { id: 11, name: 'Veg Manchurian', price: 150, ordersCount: 48,image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600' }, 
    { id: 12, name: 'Crispy Samosas', price: 12, ordersCount: 300, image: 'https://images.unsplash.com/photo-1593759608142-e9b18c0dbe86?w=600'}, 
    { id: 13, name: 'Chocolate Cake', price: 400, ordersCount: 25, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600' }, 
    { id: 14, name: 'Fruit Pastries', price: 80, ordersCount: 38, image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600' },
  ],
  students: JSON.parse(localStorage.getItem('students')) || initialData.students || [], 
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  searchQuery: "",
};

function canteenReducer(state, action) {
  switch (action.type) {
    case 'SET_STUDENTS':
      return { ...state, students: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'ADD_STUDENT_STATE':
      return { ...state, students: [...state.students, action.payload] };
    case 'DELETE_STUDENT_STATE':
      return { 
        ...state, 
        students: state.students.filter(s => s.id !== action.payload),
        orders: state.orders.filter(o => o.studentId !== action.payload) 
      };
    case 'PLACE_ORDER':
      const { studentId, snackId, quantity, amount } = action.payload;
      const snackObj = state.snacks.find(s => s.id === snackId);
      
      const newOrder = {
        id: Date.now(),
        studentId,
        snackName: snackObj?.name || "Unknown Snack",
        quantity,
        payableAmount: amount,
        date: new Date().toLocaleDateString()
      };

      return {
        ...state,
        orders: [...state.orders, newOrder],
        snacks: state.snacks.map(s => s.id === snackId ? { ...s, ordersCount: s.ordersCount + 1 } : s),
        students: state.students.map(s => 
          s.id === studentId ? { ...s, totalSpent: (s.totalSpent || 0) + amount } : s
        )
      };
    default:
      return state;
  }
}

export const CanteenProvider = ({ children }) => {
  const [state, dispatch] = useReducer(canteenReducer, initialState);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
    localStorage.setItem('students', JSON.stringify(state.students));
  }, [state.orders, state.students]);

  const addStudent = async (name) => {
    const newStudent = {
      id: Date.now(),
      name,
      referralCode: `REF-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      totalSpent: 0
    };
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      const data = await response.json();
      dispatch({ type: 'ADD_STUDENT_STATE', payload: data });
      return data;
    } catch (err) {
      dispatch({ type: 'ADD_STUDENT_STATE', payload: newStudent });
      return newStudent;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (err) { console.error("API Offline, deleting locally"); }
    dispatch({ type: 'DELETE_STUDENT_STATE', payload: id });
  };

  const placeOrder = async (orderInfo) => {
    const { studentId, snackId, quantity } = orderInfo;
    const sId = Number(studentId);
    const student = state.students.find(s => s.id === sId);
    const snack = state.snacks.find(s => s.id === Number(snackId));
    
    if (!snack || !student) return;

    const orderAmount = snack.price * quantity;
    const newTotal = (Number(student.totalSpent) || 0) + orderAmount;

    dispatch({ 
      type: 'PLACE_ORDER', 
      payload: { studentId: sId, snackId: snack.id, quantity, amount: orderAmount } 
    });

    try {
      await fetch(`${API_URL}/${sId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalSpent: newTotal })
      });
    } catch (err) { console.error("Sync failed, saved to LocalStorage only."); }
  };

  return (
    <CanteenContext.Provider value={{ state, dispatch, addStudent, deleteStudent, placeOrder }}>
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => useContext(CanteenContext);