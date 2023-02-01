import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function Verfication(params) {
    console.log(params)
    const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    console.log(param)
    
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:3000/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
  return (
    <div>Verfication</div>
  )
}

export default Verfication