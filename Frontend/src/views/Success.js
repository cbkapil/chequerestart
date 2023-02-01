import React ,{useEffect}from 'react'
import { Button, Result } from 'antd';
import {  useHistory, } from "react-router-dom";
export default function Success() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(()=>{ history.push("/auth/login")},2000)
  
    
  }, [])
  
  return (
    <Result
    status="success"
    title="Successfully Verfied E-mail ID !"
    subTitle="Now you can login"
    extra={[
      <Button type="primary" key="console" >
        Go to login
      </Button>,
      
    ]}
  />
  )
}
