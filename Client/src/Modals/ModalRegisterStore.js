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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [tagName, setTagName] = useState('');

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
    const available = event.target.checked;
    setIsParking(available);
    console.log(available);
  };
  const handleReservation = (event) => {
    const available = event.target.checked;
    setReservation(available);
    console.log(available);
  };
  const handleLatitude = (event) => {
    const location = event.target.value;
    setLatitude(location);
  };
  const handleLongitude = (event) => {
    const location = event.target.value;
    setLongitude(location);
  };
  const handTagName = (event) => {
    const location = event.target.value;
    setTagName(location);
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
        tagName: tagName,
        description: description,
        latitude: latitude,
        longitude: longitude,
        parking: isParking,
        booking: reservation,
        fileName: '4Vh5X2LT.png'
      },
      withCredentials: true
    }).then((res) => {
      console.log(res);
      alert('?????? ????????? ?????????????????????.');
      setaddStoreMarkerClicked(false);
    }).catch((err) => {
      console.log(err);
      alert('?????? ????????? ??? ?????????????????? ?????????.');
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
        <div className="modify-info">?????? ?????? ??????</div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>????????? ??????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" onChange={ handleRegistrationNumber }
                size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>?????? ??????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" onChange={ handleStoreName }
                size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>??????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" onChange={ handleStoreAddress }
                size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>????????????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" onChange={ handleCallNum }
                size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>??? ??? ??????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" name="text-nmae" onChange={ handleDescription }
                size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>?????????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handTagName } name="text-nmae" size="30"
                type="text" placeholder="??????  ??????  ??????  ??????  ??????  etc"
              ></input>
            </div>
          </div>
        </div>
        <div>
          <a href="https://tablog.neocities.org/keywordposition.html" target="_blank" rel="noreferrer">????????? ????????? ???????????????</a>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>??????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleLatitude } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-box">
          <div className="modal-input-box">
            <div>??????</div>
          </div>
          <div className="modal-input-area">
            <div>
              <input
                className="modal-input-syle-wow" onChange={ handleLongitude } name="text-nmae" size="30"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className="modify-design-jaeyoung">
          <div className="modify-box">
            <div className="modal-input-box">
              <div>?????? ??????</div>
            </div>
            <div className="modal-input-area">
              <div>
                <input
                  className="modal-input-syle-wow" name="text-nmae" onClick={ handleIsParking }
                  size="30"
                  type="checkbox"
                ></input>
              </div>
            </div>
          </div>
          <div className="modify-box">
            <div className="modal-input-box">
              <div>?????? ??????</div>
            </div>
            <div className="modal-input-area">
              <div>
                <input
                  className="modal-input-syle-wow" name="text-nmae" onClick={ handleReservation }
                  size="30"
                  type="checkbox"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-confirm-bt">
          <button className="confirm-bt" onClick={ () => { sendInformation(); } }>?????? ??????</button>
        </div>
      </div>
    </div>
  );
}
export default RegisterStore;
