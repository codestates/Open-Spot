import React, { useState } from 'react';
import axios from 'axios';
import './../Styles/Modal.css';

function RegisterStore ({ setaddStoreMarkerClicked }) {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [callNum, setCallNum] = useState('');
  const [description, setDescription] = useState('');
  const [isParking, setIsParking] = useState(0);
  const [reservation, setReservation] = useState(0);

  const handleDescription = (event) => {
    const desc = event.target.value;
    setDescription(desc);
  };
  const handleRegistrationNumber = (event) => {
    const name = event.target.value;
    setRegistrationNumber(name);
  };
  const handleStoreName = (event) => {
    const name = event.target.value;
    setStoreName(name);
  };
  const handleStoreAddress = (event) => {
    const address = event.target.value;
    setStoreAddress(address);
  };
  const handleCallNum = (event) => {
    const callNum = event.target.value;
    setCallNum(callNum);
  };
  const handleIsParking = (event) => {
    // if (event.target.checked) {
    //   setIsParking(1);
    // } else {
    //   setIsParking(0);
    // }
    const available = event.target.checked;
    setIsParking(available);
    console.log(available);
  };
  const handleReservation = (event) => {
    // if (event.target.checked) {
    //   setReservation(1);
    // } else {
    //   setReservation(0);
    // }
    const available = event.target.checked;
    setReservation(available);
    console.log(available);
  };
  const sendInformation = async () => {
    axios({
      url: 'https://api.open-spot.tk/markers',
      method: 'post',
      data: {
        companyNumber: registrationNumber,
        storeName: storeName,
        address: storeAddress,
        callNum: callNum,
        tagName: '중식집',
        description: description,
        latitude: '37.567849416994065',
        longitude: '126.96984561951388',
        parking: isParking,
        booking: reservation,
        fileName: '4Vh5X2LT.png'
      },
      withCredentials: true
    }).then((res) => {
      console.log(res);
      alert('가게 등록이 완료되었습니다.');
      setaddStoreMarkerClicked(false);
    }).catch((err) => {
      console.log(err);
      alert('모든 정보를 다 입력해주셔야 합니다.');
    });
  };

  // const logoImginput = useRef(null);
  // const logoImgInputBtn = (event) => {
  //   event.preventDefault;
  //   logoImginput.current.click();
  // };
  // const imgChange = async (event) => {
  //   const formData = new FormData();
  //   formData.append('file', event.target.files[0]);
  //   const response = await axios({
  //     url: 'https://api.open-spot.tk/image',
  //     method: 'post',
  //     data: {
  //       formData
  //     }
  //   });
  // };
  return (
    <div className="modal-background">
      <div className="register-box-container">
        <div className="modify-info">가게 등록 하기</div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>사업자 번호</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleRegistrationNumber } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>가게 이름</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleStoreName } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>주소</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleStoreAddress } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>전화번호</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleCallNum } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>한 줄 설명</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleDescription } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>주차 여부</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onClick={ handleIsParking } name="text-nmae" size="30"
                type="checkbox"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>예약 여부</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onClick={ handleReservation } name="text-nmae" size="30"
                type="checkbox"
              ></input>
            </div>
          </div>
        </div>
        <div className="modal-confirm-bt">
          <button className="confirm-bt" onClick={ () => { sendInformation(); } }>등록 완료</button>
        </div>
      </div>
    </div>
  );
}
export default RegisterStore;
