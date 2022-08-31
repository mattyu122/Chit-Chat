import React, { Component } from "react";
import $ from "jquery";

import "../../ProfileRegistrationForm/ProfileRegisterForm.css";

class ProfileEditForm extends React.Component {
  // this is a profile edit form so user may change all his information here, including password
  //original user information will also be shown when user gets in the form
  setProfile = (e) => {
    let picture = "picture",
      userName = $("#ProfileName").val(),
      nickName = $("#ProfileName").val(),
      year = $("#Year").val(),
      gender = $("input[name='gender']:checked").val(),
      desc = $("#Description").val(),
      faculty = $("#Faculty").val(),
      university = $("#University").val(),
      status = $("input[name='status']:checked").val(),
      contact = $("#ProfileIG").val(),
      PW = $("#Profile_reset_password").val();
    let interest = [];
    $("input[class='interest']:checked").each(function (i) {
      interest[i] = $(this).val();
    });
    let objectID = window.location.pathname.split("/")[2];
    //objectID is undefined this time
    //profile first registration and profile editing shares the same directory/route as they are similar, both setting user info
    $.post("http://localhost:5000/registration/" + objectID, { userName, picture, nickName, year, gender, desc, faculty, university, status, interest, contact, PW });
    window.alert("Success. Your update would be valid starting from your next Login!");
  };
  render() {
    var user = this.props.user;
    var facalties = ["Engineering", "Medicine", "Law", "Social Science", "Science", "Busness Administration", "Art", "Education"];
    var genders = ["Male", "Female"];
    var universities = ["CUHK", "HKU", "LingU", "CityU", "HKUST", "PolyU", "BU", "EduU", "OU", "HSU"];
    var years = ["1", "2", "3", "4", "5", "6"];
    var Status = ["Available", "Occupied"];
    var interests1 = ["Dancing", "Pop music", "Classic music", "Track and field", "Ball game", "Water sport", "Extreme sport", "Movie", "Reading"];
    var interests2 = ["Drinking", "Singing", "Yoga", "Meditation", "Mobile game", "Video game", "Programming ", "Travel", "Eating"];

    return (
      <div className='ProfileRegisterForm_Container'>
        <form
          onSubmit={(event) => {
            this.setProfile(event);
            this.props.backToProfile();
          }}
        >
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Name:
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <input className='ProfileRegisterForm_input' id='ProfileName' name='ProfileName' defaultValue={user.name} disabled></input>
              <br></br>
            </div>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Year:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <select className='ProfileRegisterForm_input' id='Year' name='Year' required>
                <option value=''></option>
                {years.map(function (year) {
                  return (
                    <option value={year} selected={year == user.year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Gender:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' style={{ padding: "0" }} type='ProfileRegisterForm_colm'>
              {genders.map(function (gender) {
                return (
                  <a className='ProfileRegisterForm_colm30' type='ProfileRegisterForm_colm' id='Gender'>
                    <input type='radio' id={gender} name='gender' value={gender} defaultChecked={gender == user.gender} required></input>
                    <a> {gender}</a>
                  </a>
                );
              })}
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Description:{" "}
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <textarea className='ProfileRegisterForm_input' style={{ height: "100px" }} id='Description' name='Description' defaultValue={user.description} required></textarea>
            </div>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Faculty:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <select className='ProfileRegisterForm_input' id='Faculty' name='Faculty' required>
                <option value=''></option>
                {facalties.map(function (facalty) {
                  return (
                    <option value={facalty} selected={facalty == user.faculty}>
                      {facalty}
                    </option>
                  );
                })}
              </select>
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              University:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <select className='ProfileRegisterForm_input' id='University' name='University' required>
                <option value=''></option>
                {universities.map(function (university) {
                  return (
                    <option value={university} selected={university == user.university}>
                      {university}
                    </option>
                  );
                })}
              </select>
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Status:{" "}
            </label>
            <a className='ProfileRegisterForm_colm75' style={{ padding: "0" }} type='ProfileRegisterForm_colm'>
              {Status.map(function (status) {
                return (
                  <a className='ProfileRegisterForm_colm30' type='ProfileRegisterForm_colm' id='status'>
                    <input type='radio' id={status} value={status} name='status' defaultChecked={status == user.status} required></input>
                    <a> {status}</a>
                  </a>
                );
              })}
            </a>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              IG Account
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <input className='ProfileRegisterForm_input' id='ProfileIG' name='ProfileIG' defaultValue={user.ig} required></input>
              <br></br>
            </div>
          </div>
          <div className='ProfileRegisterForm_row required'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Interests:{" "}
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <div className='ProfileRegisterForm_colm30'>
                {interests1.map(function (interest) {
                  return (
                    <div style={{ padding: "10px" }} type='ProfileRegisterForm_colm' id='Interest'>
                      <input type='checkbox' className='interest' id={interest} name={interest} value={interest} defaultChecked={user.interest.includes(interest)}></input>
                      <a> {interest}</a>
                    </div>
                  );
                })}
              </div>
              <div className='ProfileRegisterForm_colm30'>
                {interests2.map(function (interest) {
                  return (
                    <div style={{ padding: "10px" }} type='ProfileRegisterForm_colm' id='Interest'>
                      <input type='checkbox' className='interest' id={interest} name={interest} value={interest} defaultChecked={user.interest.includes(interest)}></input>
                      <a> {interest}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='ProfileRegisterForm_row'>
            <label className='ProfileRegisterForm_colm25' type='ProfileRegisterForm_colm'>
              Reset Password:
            </label>
            <div className='ProfileRegisterForm_colm75' type='ProfileRegisterForm_colm'>
              <input className='ProfileRegisterForm_input' id='Profile_reset_password' name='Profile_reset_password' placeholder='Fill in if you want to reset your password'></input>
              <br></br>
            </div>
          </div>
          <div className='ProfileRegisterForm_row'>
            <button
              type='submit'
              value='Submit'
              id='Submit'
              className='ProfileRegisterForm_button'
              onClick={(event) => {
                let interest = $("input[class='interest']:checked").val();
                if (interest == null) {
                  window.alert("Please choose at least one interest.");
                  event.preventDefault();
                }
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileEditForm;
