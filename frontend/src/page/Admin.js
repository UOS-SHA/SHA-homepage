import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import AccordionItem from './AccordionItem';
import axios from 'axios';
import './Admin.css';




const Admin = () => {

    const [id, setId]= useState('');
    const [pw, setPw] = useState('');
    const [error, setError]= useState('');


    //todo: 로그인 성공 시 토큰 생성 및 저장 처리하기

    const handleLogin = async () => {
        if (!id || !pw) {
            setError('아이디와 비밀번호 모두 입력해주세요 ㅋㅋ');
            return;
        }

        //임시 로그인
        const tempId= 'admin';
        const tempPw= '1234';

        if (id === tempId && pw === tempPw) {
            alert('임시 로그인 성공~');
            setError('');
            return;
        }
        
        try {
            const response = await axios.post('/api/login', {
                id,
                pw
            });

            if (response.data.success) {
                alert('로그인 성공');
                // 추후에 페이지 이동 넣기
            } else {
                setError(response.data.message || '아이디 또는 비밀번호가 틀렸습니다.');
            }
        } catch (err) {
            console.error('로그인 요청 실패: ', err);
            setError('서버와의 연결에 실패했습니다.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    
    
    return (
    <div className="login-container">
        <div className="admin-box">
            <div className="logo-login">
                <div className="admin-logo">
                    <img className="real-logo" src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="logo"></img>
                </div>
                <div className="word-LOGIN">LOGIN</div>
            </div>
            <div className="login-form">
                <input className="id" placeholder="아이디" type="text"
                    value={id} onChange={(e) => setId(e.target.value)} 
                    onKeyDown={handleKeyDown} />
                <input className="pw" placeholder="비밀번호" type="password"
                    value={pw} onChange={(e) => setPw(e.target.value)} 
                    onKeyDown={handleKeyDown} />
                <button className="login" onClick={handleLogin}>로그인</button>
            </div>
        </div>
    </div>
  );
};

export default Admin;