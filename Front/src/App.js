import React, { useState } from "react";

function App() {
  /* 상태함수 정의 */
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    /* 프론트엔드에서 입력하는 정보를 userDate로 정의 */
    const userData = {
      name,
      age,
      gender,
      phone,
    };

    /* userData를 fetch를 통해 localhost:8000(백엔드)로 전송 */
    try {

      const response = await fetch('http://52.78.181.78/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      /* 응답이 성공적이면 알리고 상태를 초기화 */
      if (response.ok) {
        const message = "등록이 완료되었습니다.";
        alert(message);
        console.log(message);
        setName('');
        setAge('');
        setGender('');
        setPhone('');

        /* GET 요청 */
        const getResponse = await fetch('http://52.78.181.78/');
        if (getResponse.ok) {
          const data = await getResponse.json();
          console.log(data);
        } else {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }
      } else {
        throw new Error('등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error',error);
      alert('등록 중 오류가 발생했습니다.');
    }    
  };



  /* setter는 setName, setAge, setGender, setPhone과
     같은 상태 업데이트 함수를 가리키는 매개변수이다 */
  const handleInput = (setter) => (e) => {
    setter(e.target.value);
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>정보 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이름:  
            <input type="text" value={name} onChange={handleInput(setName)} />
          </label>
        </div>
        <div>
          <label>
            나이:
            <input type="number" value={age} onChange={handleInput(setAge)} />
          </label>
        </div>
        <div>
          <label>
            성별:
            <select value={gender} onChange={handleInput(setGender)} required>
              <option value="">선택하세요!</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            전화번호:
            <input type="tel" value={phone} onChange={handleInput(setPhone)} required />
          </label>
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );

}

export default App;