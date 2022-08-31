import React, { Component, useState } from "react";
import "./profile.css";

import ProfileDetail from "./profileDetail";
import ProfileEditForm from "./ProfileEditForm";

class profile extends React.Component {
  //profile component shows user profile info
  //user may also edit his profile here
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
    };
  }
  backToProfile = () => {
    this.setState({ editProfile: false });
  };
  render() {
    if (!this.state.editProfile)
      return (
        <div>
          <div className='profile_title'>
            <a>Your Profile</a>
          </div>
          <div className='profile_detail'>
            <ProfileDetail
              na={this.props.user.name}
              gen={this.props.user.gender}
              pic={this.props.user.picture}
              des={this.props.user.description}
              fac={this.props.user.faculty}
              u={this.props.user.university}
              yrs={this.props.user.year}
              sts={this.props.user.status}
              int={this.props.user.interest}
            />
          </div>
          <div className='ProfileRegisterForm_row'>
            <button className='button_frame' onClick={() => this.setState({ editProfile: true })}>
              Edit
            </button>
          </div>
        </div>
      );
    else return <ProfileEditForm user={this.props.user} backToProfile={this.backToProfile} />; //this direct user to profile edit form
  }
}

export default profile;
