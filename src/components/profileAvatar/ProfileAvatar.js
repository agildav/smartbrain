import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import profile from "../profile/profile.svg";

class ProfileAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <div className="pa4 tc">
        <Dropdown
          direction="left"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src={profile}
              className="br-100 ba h3 w3 dib"
              style={{ border: "none" }}
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu
            right
            className="b--transparent shadow-5 mt-5 mr-2"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          >
            <DropdownItem onClick={this.props.toggleModal}>
              View profile
            </DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange("signout")}>
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileAvatar;
