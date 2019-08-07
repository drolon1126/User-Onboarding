import React from 'react';

class UserList extends React.Component {
  render(){
    return(
      <>
      {this.props.list.map(user=>{
        return(
          <div>
            <h3>{user.name}</h3>
            <h4>{user.email}</h4>
            <h5>{user.role}</h5>
          </div>
        );
      })}
      </>
    );
  }
}

export default UserList;